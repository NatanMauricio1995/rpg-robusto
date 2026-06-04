"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import styles from './ConfirmDialog.module.css';

/**
 * ConfirmDialog component for critical actions
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Ação',
  message = 'Você tem certeza que deseja realizar esta ação?',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={32} className={styles.icon} />
          </div>
          <p className={styles.message}>{message}</p>
        </div>
        
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
