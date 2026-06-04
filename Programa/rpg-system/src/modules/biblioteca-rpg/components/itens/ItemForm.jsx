import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button, MultiSelect } from '../../../../components';
import EncantamentoService from '../../../../services/EncantamentoService';
import styles from './ItemForm.module.css';

const raridadeOptions = [{ value: 'Comum', label: 'Comum' }, { value: 'Incomum', label: 'Incomum' }, { value: 'Rara', label: 'Rara' }, { value: 'Muito Rara', label: 'Muito Rara' }, { value: 'Lendária', label: 'Lendária' }];

const ItemForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', peso: 0, valor: 0, encantamentos: [], raridade: 'Comum', ativo: true });
  const [encOptions, setEncOptions] = useState([]);

  useEffect(() => {
    EncantamentoService.getAll().then(list => setEncOptions(list.map(e => ({ value: e.id, label: e.nome }))));
  }, []);

  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome do Item" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Raridade" name="raridade" options={raridadeOptions} value={formData.raridade} onChange={handleChange} />
      </div>
      <div className={styles.row}>
        <TextBox label="Peso (kg)" name="peso" type="number" value={formData.peso} onChange={handleChange} />
        <TextBox label="Valor (po)" name="valor" type="number" value={formData.valor} onChange={handleChange} />
      </div>
      <MultiSelect label="Encantamentos" options={encOptions} value={formData.encantamentos} onChange={(val) => setFormData(p => ({ ...p, encantamentos: val }))} />
      <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} />
      <Checkbox label="Ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};
export default ItemForm;
