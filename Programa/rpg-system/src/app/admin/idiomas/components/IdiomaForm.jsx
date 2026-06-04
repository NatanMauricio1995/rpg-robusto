import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button 
} from '../../../../components';
import styles from './IdiomaForm.module.css';

const raridadeOptions = [
  { value: 'Comum', label: 'Comum' },
  { value: 'Incomum', label: 'Incomum' },
  { value: 'Rara', label: 'Rara' },
  { value: 'Exótica', label: 'Exótica' }
];

const IdiomaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    escrita: '',
    raridade: 'Comum',
    ativo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        escrita: initialData.escrita || '',
        raridade: initialData.raridade || 'Comum',
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
    // Clear error when field changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (e) => {
    setFormData(prev => ({ ...prev, raridade: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
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
          label="Nome do Idioma"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
          placeholder="Ex: Comum, Élfico, Anão..."
        />
      </div>

      <div className={styles.row}>
        <TextBox
          label="Escrita"
          name="escrita"
          value={formData.escrita}
          onChange={handleChange}
          placeholder="Ex: Alfabeto Latino, Runas Anãs..."
        />
        <Select
          label="Raridade"
          name="raridade"
          options={raridadeOptions}
          value={formData.raridade}
          onChange={handleSelectChange}
        />
      </div>

      <div className={styles.row}>
        <TextArea
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva a origem e uso deste idioma..."
        />
      </div>

      <div className={styles.row}>
        <Checkbox
          label="Ativo"
          name="ativo"
          checked={formData.ativo}
          onChange={handleChange}
          description="Idiomas inativos não aparecem na criação de personagens."
        />
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" loading={loading}>
          {initialData ? 'Salvar Alterações' : 'Criar Idioma'}
        </Button>
      </div>
    </form>
  );
};

export default IdiomaForm;
