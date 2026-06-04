import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import styles from './EncantamentoForm.module.css';

const raridadeOptions = [
  { value: 'Comum', label: 'Comum' },
  { value: 'Incomum', label: 'Incomum' },
  { value: 'Rara', label: 'Rara' },
  { value: 'Muito Rara', label: 'Muito Rara' },
  { value: 'Lendária', label: 'Lendária' }
];

const EncantamentoForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', raridade: 'Comum', ativo: true });
  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Raridade" name="raridade" options={raridadeOptions} value={formData.raridade} onChange={handleChange} />
      </div>
      <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} />
      <Checkbox label="Ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};
export default EncantamentoForm;
