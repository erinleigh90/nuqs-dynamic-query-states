import {
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
  UseQueryStatesKeysMap,
} from 'nuqs';
import { FilterOption } from '../types';

export default function Filters({
  filterOptions,
}: {
  filterOptions: FilterOption[];
}) {
  const setDefaultStates = () => {
    const defaultParams: UseQueryStatesKeysMap = {};
    filterOptions.forEach((filter) => {
      defaultParams[filter.label] = parseAsArrayOf(parseAsString);
    });

    return defaultParams;
  };

  const [queryStates, setQueryStates] = useQueryStates(setDefaultStates());

  const isValueSelected = (filterLabel: string, value: string): boolean => {
    const currentValues = queryStates[filterLabel] || [];
    return currentValues.includes(value);
  };

  const handleFilterChange = (
    filterLabel: string,
    value: string,
    checked: boolean
  ) => {
    console.log('filter change', {
      filterOptions,
      queryStates,
    });
    const currentValues = (queryStates[filterLabel] as string[]) || [];
    if (checked) {
      setQueryStates({ [filterLabel]: [...currentValues, value] });
    } else {
      const newValues = currentValues.filter((v) => v !== value);
      setQueryStates({
        [filterLabel]: newValues.length > 0 ? newValues : null,
      });
    }
  };

  return (
    <div>
      {filterOptions.map((filter) => (
        <div key={filter.label}>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-md font-medium capitalize">{filter.label}</h3>
            </div>
            <div className="space-y-2">
              {filter.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isValueSelected(filter.label, option)}
                    onChange={(e) =>
                      handleFilterChange(filter.label, option, e.target.checked)
                    }
                    className="mr-2 rounded border-gray-300"
                  />
                  <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
