import { memo } from 'react';
import { useTranslation } from '@/i18n/hooks';

import StyledLink from '@/components/StyledLink';
import styles from './styles.module.scss';

export default memo(
  function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
      <div className={styles.container}>
        <div className={styles.title}>feedb.ax</div>
        <div>{`(c) 2019-${year} feedb.ax by 365STEPS`}</div>

        <StyledLink href="/legal/privacy-policy" className={styles.link}>
          {t('pages', 'privacy-policy', 'title')}
        </StyledLink>
      </div>
    );
  },
);
