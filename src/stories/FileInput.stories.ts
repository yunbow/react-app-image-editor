import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '../components/FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
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