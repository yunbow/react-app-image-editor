import { Button } from '../../../../components/Button';
import styles from './TransformControls.module.css';

interface TransformControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
}

export const TransformControls = ({
  onRotateLeft,
  onRotateRight,
  onFlipHorizontal,
  onFlipVertical
}: TransformControlsProps) => {
  return (
    <div className={styles.transformControls}>
      <Button onClick={onRotateLeft}>左に回転</Button>
      <Button onClick={onRotateRight}>右に回転</Button>
      <Button onClick={onFlipHorizontal}>水平反転</Button>
      <Button onClick={onFlipVertical}>垂直反転</Button>
    </div>
  );
};