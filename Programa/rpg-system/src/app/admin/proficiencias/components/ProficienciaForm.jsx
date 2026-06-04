import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button 
} from '../../../../components';
import styles from './ProficienciaForm.module.css';

const categoriaOptions = [
  { value: 'Armas', label: 'Armas' },
  { value: 'Armaduras', label: 'Armaduras' },
  { value: 'Ferramentas', label: 'Ferramentas' },
  { value: 'Instrumentos', label: 'Instrumentos' },
  { value: 'Veículos', label: 'Veículos' },
  { value: 'Outros', label: 'Outros' }
];

const ProficienciaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: 'Armas',
    ativo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        categoria: initialData.categoria || 'Armas',
        ativo: initialData.ativo !== undefined ? initialData.ativo : true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      setErrors({ nome: 'O nome é obrigatório' });
      return;
    }
    onSave(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <TextBox
          label="Nome da Proficiência"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
        />
      </div>

      <div className={styles.row}>
        <Select
          label="Categoria"
          name="categoria"
          options={categoriaOptions}
          value={formData.categoria}
          onChange={handleChange}
        />
        <Checkbox
          label="Ativo"
          name="ativo"
          checked={formData.ativo}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <TextArea
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};

export default ProficienciaForm;
