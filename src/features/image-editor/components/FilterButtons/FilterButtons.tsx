import { FilterType, FilterOption } from '../../types';
import { Button } from '../../../../components/Button';
import styles from './FilterButtons.module.css';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterOptions: FilterOption[] = [
  { value: 'none', label: 'オリジナル' },
  { value: 'grayscale', label: 'モノクロ' },
  { value: 'sepia', label: 'セピア' },
  { value: 'invert', label: '反転' },
  { value: 'blur', label: 'ぼかし' },
];

export const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className={styles.filters}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={activeFilter === option.value ? styles.active : ''}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};