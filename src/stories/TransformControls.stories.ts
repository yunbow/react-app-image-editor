import type { Meta, StoryObj } from '@storybook/react';
import { TransformControls } from '../components/molecules/TransformControls';

const meta: Meta<typeof TransformControls> = {
  title: 'Molecules/TransformControls',
  component: TransformControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRotateLeft: () => console.log('Rotate left'),
    onRotateRight: () => console.log('Rotate right'),
    onFlipHorizontal: () => console.log('Flip horizontal'),
    onFlipVertical: () => console.log('Flip vertical'),
  },
};