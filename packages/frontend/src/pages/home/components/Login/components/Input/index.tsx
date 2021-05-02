import { memo } from 'react';
import styles from './styles.module.scss';

type InputProps = {
  value: string;
  setValue: (newValue: string) => void;

  placeholder?: string;
};

export default memo(
  function Input(props: InputProps): JSX.Element {
    const { value, setValue } = props;
    const { placeholder } = props;

    return (
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}

        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
);
