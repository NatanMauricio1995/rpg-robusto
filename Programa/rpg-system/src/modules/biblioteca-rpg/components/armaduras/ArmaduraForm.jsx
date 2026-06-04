import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import styles from './ArmaduraForm.module.css';

const tipoOptions = [{ value: 'Leve', label: 'Leve' }, { value: 'Média', label: 'Média' }, { value: 'Pesada', label: 'Pesada' }, { value: 'Escudo', label: 'Escudo' }];

const ArmaduraForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', classeArmadura: 10, penalidade: 0, peso: 0, valor: 0, tipo: 'Leve', ativo: true });
  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Armadura" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Tipo" name="tipo" options={tipoOptions} value={formData.tipo} onChange={handleChange} />
      </div>
      <div className={styles.row}>
        <TextBox label="CA" name="classeArmadura" type="number" value={formData.classeArmadura} onChange={handleChange} />
        <TextBox label="Penalidade" name="penalidade" type="number" value={formData.penalidade} onChange={handleChange} />
      </div>
      <div className={styles.row}>
        <TextBox label="Peso (kg)" name="peso" type="number" value={formData.peso} onChange={handleChange} />
        <TextBox label="Valor (po)" name="valor" type="number" value={formData.valor} onChange={handleChange} />
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
export default ArmaduraForm;
