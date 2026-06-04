import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Checkbox, 
  Button 
} from '../../../../components';
import styles from './EscolaMagiaForm.module.css';

const EscolaMagiaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cor: '#d4af37',
    ativo: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao: initialData.descricao || '',
        cor: initialData.cor || '#d4af37',
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
          label="Nome da Escola"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
        />
        <div className={styles.colorWrapper}>
          <label className={styles.colorLabel}>Cor Identificadora</label>
          <input 
            type="color" 
            name="cor" 
            value={formData.cor} 
            onChange={handleChange} 
            className={styles.colorInput}
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

      <div className={styles.row}>
        <Checkbox
          label="Ativo"
          name="ativo"
          checked={formData.ativo}
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

export default EscolaMagiaForm;
