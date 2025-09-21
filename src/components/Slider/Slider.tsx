import styles from './Slider.module.css';

export interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider = ({
  id,
  label,
  min,
  max,
  value,
  onChange
}: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className={styles.controlItem}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={styles.slider}
      />
      <span className={styles.valueDisplay}>{value}</span>
    </div>
  );
};