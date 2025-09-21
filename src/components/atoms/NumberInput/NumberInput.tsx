import styles from './NumberInput.module.css';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export const NumberInput = ({
  id,
  label,
  value,
  min = 1,
  onChange,
  unit
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.controlItem}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type="number"
        id={id}
        value={value}
        min={min}
        onChange={handleChange}
        className={styles.numberInput}
      />
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
  );
};