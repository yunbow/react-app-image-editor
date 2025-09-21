import styles from './Checkbox.module.css';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={styles.checkboxItem}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
    </div>
  );
};