import { memo } from 'react';
import Icon, { Icons } from '@/components/Icon';

export default memo(
  function IconButton() {
    return (
      <button type="button">
        <Icon icon={Icons.Menu} />
      </button>
    );
  },
);
