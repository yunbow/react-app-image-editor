import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '../components/atoms/FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Atoms/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFileSelect: (file: File) => console.log('Selected file:', file.name),
  },
};