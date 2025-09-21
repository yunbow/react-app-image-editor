export interface EditState {
  brightness: number;
  contrast: number;
  saturation: number;
  filter: FilterType;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
}

export type FilterType = 'none' | 'grayscale' | 'sepia' | 'invert' | 'blur';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface FilterOption {
  value: FilterType;
  label: string;
}

export interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}