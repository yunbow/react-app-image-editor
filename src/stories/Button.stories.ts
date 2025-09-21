import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ダウンロード',
    onClick: () => console.log('clicked'),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'リセット',
    onClick: () => console.log('clicked'),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'ダウンロード',
    disabled: true,
    onClick: () => console.log('clicked'),
  },
};