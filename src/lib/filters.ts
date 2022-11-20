import type { RouteQuery } from 'src/graphql-operations';

export type Filters = NonNullable<
	Extract<NonNullable<RouteQuery['route']>['object'], { __typename: 'Category' }>['products']
>['filters'];
export type FilterType = Extract<
	NonNullable<Filters>[number],
	{ __typename: string }
>['__typename'];

// export type ListFilter = Extract<NonNullable<Filters>[number], { __typename: 'ListFilter' }>;
// export type RangeFilter = Extract<
// 	NonNullable<Filters>[number],
// 	{ __typename: 'NumericRangeFilter' }
// >;
// export type BooleanFilter = Extract<NonNullable<Filters>[number], { __typename: 'BooleanFilter' }>;
// export type MultiListFilter = Extract<
// 	NonNullable<Filters>[number],
// 	{ __typename: 'MultiListFilter' }
// >;

type ActiveFilter = {
	type: FilterType;
	id: string;
	name: string;
	value: string;
	text: string;
};

export const getActiveFilters = (url: URL, filters: Filters) => {
	const activeFilters: ActiveFilter[] = [];
	const params = new URLSearchParams(url.search);

	for (const [key, value] of params) {
		const [type, id] = key.split('_');

		switch (type) {
			case 'ListFilter': {
				const filter = filters?.find((f) => f?.id === id) as
					| Extract<NonNullable<Filters>[number], { __typename: typeof type }>
					| undefined;

				if (!filter) continue;

				const filterItem = filter.items.find((v) => v?.value === value);
				if (!filterItem) continue;

				activeFilters.push({
					type: filter.__typename,
					id: filter.id,
					name: filter.name,
					value: value,
					text: filterItem.text
				});
				break;
			}
			case 'NumericRangeFilter': {
				const filter = filters?.find((f) => f?.id === id) as
					| Extract<NonNullable<Filters>[number], { __typename: typeof type }>
					| undefined;
				if (!filter) continue;

				activeFilters.push({
					type: filter.__typename,
					id: filter.id,
					name: filter.name,
					value: value,
					text: `${filter.min} - ${filter.max}`
				});
				break;
			}
			case 'BooleanFilter': {
				const filter = filters?.find((f) => f?.id === id) as
					| Extract<NonNullable<Filters>[number], { __typename: typeof type }>
					| undefined;
				if (!filter) continue;
				activeFilters.push({
					type: filter.__typename,
					id: filter.id,
					name: filter.name,
					value: value,
					text: value === 'true' ? 'Yes' : 'No'
				});
				break;
			}
			case 'MultiListFilter': {
				const [, name, category, option] = key.split('_');
				activeFilters.push({
					type: type,
					id: `${option}:${value}:${name}:${category}`,
					name: option,
					value: value,
					text: value
				});
				break;
			}
			default:
				continue;
		}
	}
	return activeFilters;
};

export const toggleFilterPath = (url: URL, type: string, filterId: string, optionValue: string) => {
	const params = new URLSearchParams(url.search);
	const paramKey = `${type}_${filterId}`;
	// Delete page param if starts filtering
	params.delete('page');
	switch (type) {
		case 'ListFilter': {
			const urlValues = params.getAll(paramKey);

			if (urlValues.includes(optionValue)) {
				// Cannot remove a single value
				// So we need to remove all and add the rest back
				const filteredParams = urlValues.filter((v) => v !== optionValue);
				params.delete(paramKey);
				filteredParams.forEach((value) => params.append(paramKey, value));
			} else {
				params.append(paramKey, optionValue);
			}
			break;
		}
		case 'NumericRangeFilter': {
			const urlValue = params.get(paramKey);
			if (urlValue === optionValue) {
				params.delete(paramKey);
			} else {
				params.set(paramKey, optionValue);
			}
			break;
		}
		case 'BooleanFilter': {
			const booleanValue = params.get(paramKey);
			if (booleanValue) {
				params.delete(paramKey);
			} else {
				params.set(paramKey, optionValue);
			}
			break;
		}
		case 'MultiListFilter': {
			const [level, val, name, category] = filterId.split(':');
			const key = `${type}_${name}_${category}_${level}`;
			const active = params.get(key);

			if (!params.has(key) || active !== optionValue) {
				params.set(key, optionValue);
			}

			// Only manipulate the params for each mutlilist filter if many
			const levels = [...params]
				.map(([k, v]) => {
					if (k.startsWith(`${type}_${name}`)) {
						return { [k]: v };
					}
					return undefined;
				})
				.filter(Boolean);

			const current = levels.findIndex((l) => Object.keys(l!)[0] === key);

			// For all toggles but first level dropdown
			if (current > 0) {
				// Handle toggle of same value
				if (active === optionValue) {
					params.delete(key);
					return `?${params.toString()}`;
				}

				const newLevels = levels.slice(0, current + 1);

				// Remove and re-add from new list
				levels.forEach((param) => params.delete(Object.keys(param!)[0]));
				newLevels.forEach((param) => {
					const [k, v] = Object.entries(param!)[0];
					params.set(k, v);
				});
			} else {
				// Handle toggle of same value
				if (active === optionValue) {
					params.delete(key);
					return `?${params.toString()}`;
				}
				// Toggle first level
				// Remove all and re-add current (first) level
				levels.forEach((param) => params.delete(Object.keys(param!)[0]));
				params.set(key, val);
			}

			break;
		}
		default:
			break;
	}
	return `?${params.toString()}`;
};
