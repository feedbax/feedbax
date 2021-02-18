import { memo } from 'react';
import * as styles from './styles';

type ButtonProps = {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default memo(
  function Button(props: ButtonProps): JSX.Element {
    const { children, onClick } = props;

    return (
      <button
        type="submit"
        css={styles.loginButton}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);
