import type { Meta, StoryObj } from '@storybook/react';
import { FilterButtons } from '../../features/image-editor/components/FilterButtons';

const meta: Meta<typeof FilterButtons> = {
  title: 'Features/ImageEditor/Components/FilterButtons',
  component: FilterButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeFilter: 'none',
    onFilterChange: (filter) => console.log('Filter changed:', filter),
  },
};

export const GrayscaleActive: Story = {
  args: {
    activeFilter: 'grayscale',
    onFilterChange: (filter) => console.log('Filter changed:', filter),
  },
};

export const SepiaActive: Story = {
  args: {
    activeFilter: 'sepia',
    onFilterChange: (filter) => console.log('Filter changed:', filter),
  },
};