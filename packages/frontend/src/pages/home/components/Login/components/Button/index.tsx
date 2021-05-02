import { memo } from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  children: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default memo(
  function Button(props: ButtonProps): JSX.Element {
    const { children, onClick, disabled } = props;

    return (
      <button
        type="submit"
        className={styles.button}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);
