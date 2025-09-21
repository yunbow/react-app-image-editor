import { ImageDimensions } from '../../types';
import { NumberInput } from '../../../../components/NumberInput';
import { Checkbox } from '../../../../components/Checkbox';
import { Button } from '../../../../components/Button';
import styles from './ResizeControls.module.css';

interface ResizeControlsProps {
  dimensions: ImageDimensions;
  keepAspectRatio: boolean;
  onDimensionsChange: (dimensions: ImageDimensions) => void;
  onKeepAspectRatioChange: (keep: boolean) => void;
  onApplyResize: () => void;
}

export const ResizeControls = ({
  dimensions,
  keepAspectRatio,
  onDimensionsChange,
  onKeepAspectRatioChange,
  onApplyResize
}: ResizeControlsProps) => {
  const handleWidthChange = (width: number) => {
    onDimensionsChange({ ...dimensions, width });
  };

  const handleHeightChange = (height: number) => {
    onDimensionsChange({ ...dimensions, height });
  };

  return (
    <div className={styles.resizeControls}>
      <NumberInput
        id="width"
        label="幅"
        value={dimensions.width}
        onChange={handleWidthChange}
        unit="px"
      />
      <NumberInput
        id="height"
        label="高さ"
        value={dimensions.height}
        onChange={handleHeightChange}
        unit="px"
      />
      <Checkbox
        id="keepAspectRatio"
        label="縦横比を維持"
        checked={keepAspectRatio}
        onChange={onKeepAspectRatioChange}
      />
      <Button onClick={onApplyResize} className={styles.applyButton}>
        サイズ変更
      </Button>
    </div>
  );
};