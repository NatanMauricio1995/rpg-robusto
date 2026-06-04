import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button 
} from '../../../../components';
import styles from './SentidoForm.module.css';

const tipoOptions = [
  { value: 'Visual', label: 'Visual' },
  { value: 'Auditivo', label: 'Auditivo' },
  { value: 'Olfativo', label: 'Olfativo' },
  { value: 'Tátil', label: 'Tátil' },
  { value: 'Especial', label: 'Especial' }
];

const SentidoForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    alcance: 0,
    tipo: 'Visual',
    ativo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        alcance: initialData.alcance || 0,
        tipo: initialData.tipo || 'Visual',
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

  const handleSelectChange = (e) => {
    setFormData(prev => ({ ...prev, tipo: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      setErrors({ nome: 'O nome é obrigatório' });
      return;
    }
    if (formData.alcance < 0) {
      setErrors({ alcance: 'O alcance não pode ser negativo' });
      return;
    }
    onSave(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <TextBox
          label="Nome do Sentido"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
        />
      </div>

      <div className={styles.row}>
        <TextBox
          label="Alcance (metros)"
          name="alcance"
          type="number"
          value={formData.alcance}
          onChange={handleChange}
          error={errors.alcance}
        />
        <Select
          label="Tipo"
          name="tipo"
          options={tipoOptions}
          value={formData.tipo}
          onChange={handleSelectChange}
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

      <div className={styles.row}>
        <Checkbox
          label="Ativo"
          name="ativo"
          checked={formData.ativo}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" loading={loading}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default SentidoForm;
