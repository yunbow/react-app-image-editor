import { Slider } from '../../../../components/Slider';
import styles from './ColorAdjustments.module.css';

interface ColorAdjustmentsProps {
  brightness: number;
  contrast: number;
  saturation: number;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
}

export const ColorAdjustments = ({
  brightness,
  contrast,
  saturation,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange
}: ColorAdjustmentsProps) => {
  return (
    <div className={styles.colorAdjustments}>
      <Slider
        id="brightness"
        label="明るさ"
        min={-100}
        max={100}
        value={brightness}
        onChange={onBrightnessChange}
      />
      <Slider
        id="contrast"
        label="コントラスト"
        min={-100}
        max={100}
        value={contrast}
        onChange={onContrastChange}
      />
      <Slider
        id="saturation"
        label="彩度"
        min={-100}
        max={100}
        value={saturation}
        onChange={onSaturationChange}
      />
    </div>
  );
};