import { memo } from 'react';
import * as styles from './styles';

type LoginProps = { children: React.ReactNode };

export default memo(
  function Login({ children }: LoginProps): JSX.Element {
    return (
      <div className="login-form" css={styles.loginForm}>
        {children}
      </div>
    );
  },
);

export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
