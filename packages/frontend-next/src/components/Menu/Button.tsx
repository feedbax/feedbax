import { memo } from 'react';
import Icon, { Icons } from '@/components/Icon';

export default memo(
  function MenuButton() {
    return (
      <>
        <Icon
          icon={Icons.Menu}
          color={{ icon: '--color-primary-text' }}
        />
      </>
    );
  },
);
