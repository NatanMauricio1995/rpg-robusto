import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button 
} from '../../../../components';
import styles from './PericiaForm.module.css';

const atributoOptions = [
  { value: 'Força', label: 'Força' },
  { value: 'Destreza', label: 'Destreza' },
  { value: 'Constituição', label: 'Constituição' },
  { value: 'Inteligência', label: 'Inteligência' },
  { value: 'Sabedoria', label: 'Sabedoria' },
  { value: 'Carisma', label: 'Carisma' }
];

const PericiaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    atributoBase: 'Força',
    treinada: false,
    ativo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        atributoBase: initialData.atributoBase || 'Força',
        treinada: initialData.treinada || false,
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
          label="Nome da Perícia"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
        />
      </div>

      <div className={styles.row}>
        <Select
          label="Atributo Base"
          name="atributoBase"
          options={atributoOptions}
          value={formData.atributoBase}
          onChange={handleChange}
        />
        <div className={styles.checkboxes}>
          <Checkbox
            label="Requer Treinamento"
            name="treinada"
            checked={formData.treinada}
            onChange={handleChange}
          />
          <Checkbox
            label="Ativo"
            name="ativo"
            checked={formData.ativo}
            onChange={handleChange}
          />
        </div>
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

export default PericiaForm;
