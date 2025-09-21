import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'secondary',
  disabled = false
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};