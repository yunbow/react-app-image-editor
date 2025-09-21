import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Brightness: Story = {
  args: {
    id: 'brightness',
    label: '明るさ',
    min: -100,
    max: 100,
    value: 0,
    onChange: (value: number) => console.log('brightness:', value),
  },
};

export const Contrast: Story = {
  args: {
    id: 'contrast',
    label: 'コントラスト',
    min: -100,
    max: 100,
    value: 25,
    onChange: (value: number) => console.log('contrast:', value),
  },
};

export const Saturation: Story = {
  args: {
    id: 'saturation',
    label: '彩度',
    min: -100,
    max: 100,
    value: -50,
    onChange: (value: number) => console.log('saturation:', value),
  },
};