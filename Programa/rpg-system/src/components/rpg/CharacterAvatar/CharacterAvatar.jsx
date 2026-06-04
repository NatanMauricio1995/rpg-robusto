import React from 'react';
import clsx from 'clsx';
import { User } from 'lucide-react';
import styles from './CharacterAvatar.module.css';

/**
 * CharacterAvatar component for RPG characters
 */
const CharacterAvatar = ({ src, name, size = 'md', className, status }) => {
  return (
    <div className={clsx(styles.container, styles[size], className)}>
      <div className={styles.avatarWrapper}>
        {src ? (
          <img src={src} alt={name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <User size={size === 'sm' ? 16 : size === 'lg' ? 32 : 24} />
          </div>
        )}
      </div>
      {status && <div className={clsx(styles.statusIndicator, styles[status])} />}
    </div>
  );
};

export default CharacterAvatar;
