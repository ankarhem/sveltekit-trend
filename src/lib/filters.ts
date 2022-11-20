import type { RouteQuery } from 'src/graphql-operations';

export type Filters = NonNullable<
	Extract<NonNullable<RouteQuery['route']>['object'], { __typename: 'Category' }>['products']
>['filters'];
export type FilterType = Extract<
	NonNullable<Filters>[number],
	{ __typename: string }
>['__typename'];

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
