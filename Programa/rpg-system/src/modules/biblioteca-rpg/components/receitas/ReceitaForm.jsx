import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button,
  MultiSelect
} from '../../../../components';
import ItemService from '../../../../services/ItemService';
import styles from './ReceitaForm.module.css';

const categoriaOptions = [
  { value: 'Alquimia', label: 'Alquimia' },
  { value: 'Culinária', label: 'Culinária' },
  { value: 'Ferreiro', label: 'Ferreiro' },
  { value: 'Marceneiro', label: 'Marceneiro' },
  { value: 'Geral', label: 'Geral' }
];

const ReceitaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: 'Geral',
    dificuldade: 10,
    tempo: '1 hora',
    ferramentas: '',
    ingredientes: [],
    resultados: [],
    ativo: true
  });

  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const items = await ItemService.getAll();
      setItemOptions(items.map(i => ({ value: i.id, label: i.nome })));
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (initialData) setFormData({ ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Receita" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Categoria" name="categoria" options={categoriaOptions} value={formData.categoria} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <TextBox label="Dificuldade (CD)" name="dificuldade" type="number" value={formData.dificuldade} onChange={handleChange} />
        <TextBox label="Tempo de Produção" name="tempo" value={formData.tempo} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <MultiSelect 
          label="Ingredientes" 
          options={itemOptions} 
          value={formData.ingredientes} 
          onChange={(val) => setFormData(p => ({ ...p, ingredientes: val }))} 
        />
        <MultiSelect 
          label="Resultado(s)" 
          options={itemOptions} 
          value={formData.resultados} 
          onChange={(val) => setFormData(p => ({ ...p, resultados: val }))} 
        />
      </div>

      <div className={styles.row}>
        <TextBox label="Ferramentas Necessárias" name="ferramentas" value={formData.ferramentas} onChange={handleChange} placeholder="Ex: Kit de Alquimia, Bigorna..." />
      </div>

      <div className={styles.row}>
        <TextArea label="Descrição / Instruções" name="descricao" value={formData.descricao} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <Checkbox label="Ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};

export default ReceitaForm;
