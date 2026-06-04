import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';
import styles from './Modal.module.css';

/**
 * Reusable Modal component for RPG Robusto
 */
const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  size = 'md',
  showClose = true,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={clsx(styles.modal, styles[size])} 
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {showClose && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
                <X size={24} />
              </button>
            )}
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
