import type { Meta, StoryObj } from '@storybook/react';
import { ColorAdjustments } from '../../features/image-editor/components/ColorAdjustments';

const meta: Meta<typeof ColorAdjustments> = {
  title: 'Features/ImageEditor/Components/ColorAdjustments',
  component: ColorAdjustments,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    onBrightnessChange: (value) => console.log('Brightness:', value),
    onContrastChange: (value) => console.log('Contrast:', value),
    onSaturationChange: (value) => console.log('Saturation:', value),
  },
};

export const WithValues: Story = {
  args: {
    brightness: 25,
    contrast: -15,
    saturation: 50,
    onBrightnessChange: (value) => console.log('Brightness:', value),
    onContrastChange: (value) => console.log('Contrast:', value),
    onSaturationChange: (value) => console.log('Saturation:', value),
  },
};