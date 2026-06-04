import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import styles from './HabilidadeForm.module.css';

const tipoOptions = [
  { value: 'Passiva', label: 'Passiva' },
  { value: 'Ativa', label: 'Ativa' },
  { value: 'Reação', label: 'Reação' },
  { value: 'Especial', label: 'Especial' }
];

const HabilidadeForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', tipo: 'Ativa', custo: 0, nivelMinimo: 1, ativo: true });

  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Habilidade" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Tipo" name="tipo" options={tipoOptions} value={formData.tipo} onChange={handleChange} />
      </div>
      <div className={styles.row}>
        <TextBox label="Custo (Recurso)" name="custo" type="number" value={formData.custo} onChange={handleChange} />
        <TextBox label="Nível Mínimo" name="nivelMinimo" type="number" value={formData.nivelMinimo} onChange={handleChange} />
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
export default HabilidadeForm;
