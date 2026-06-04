import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import styles from './ArmaForm.module.css';

const tipoDanoOptions = [{ value: 'Cortante', label: 'Cortante' }, { value: 'Perfurante', label: 'Perfurante' }, { value: 'Impacto', label: 'Impacto' }, { value: 'Elemental', label: 'Elemental' }, { value: 'Mágico', label: 'Mágico' }];

const ArmaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', dano: '1d4', tipoDano: 'Cortante', alcance: 'Corpo-a-corpo', peso: 0, valor: 0, ativo: true });
  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Arma" name="nome" value={formData.nome} onChange={handleChange} required />
        <TextBox label="Dano" name="dano" value={formData.dano} onChange={handleChange} placeholder="Ex: 1d8 + 2" />
      </div>
      <div className={styles.row}>
        <Select label="Tipo de Dano" name="tipoDano" options={tipoDanoOptions} value={formData.tipoDano} onChange={handleChange} />
        <TextBox label="Alcance" name="alcance" value={formData.alcance} onChange={handleChange} />
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
export default ArmaForm;
