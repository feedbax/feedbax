import { memo } from 'react';
import * as styles from './styles';

type TitleProps = { children: React.ReactNode };

export default memo(
  function Login({ children }: TitleProps): JSX.Element {
    return (
      <div className="login-form" css={styles.loginForm}>
        {children}
      </div>
    );
  },
);

export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
