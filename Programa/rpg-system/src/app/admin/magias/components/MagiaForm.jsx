import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import EscolaMagiaService from '../../escolasMagia/services/EscolaMagiaService';
import styles from './MagiaForm.module.css';

const MagiaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', escolaId: '', nivel: 0, alcance: 'Pessoal', duracao: 'Instantânea', componentes: '', ativo: true });
  const [escolaOptions, setEscolaOptions] = useState([]);

  useEffect(() => {
    EscolaMagiaService.getAll().then(list => setEscolaOptions(list.map(e => ({ value: e.id, label: e.nome }))));
  }, []);

  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Magia" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Escola" name="escolaId" options={escolaOptions} value={formData.escolaId} onChange={handleChange} required placeholder="Selecione..." />
      </div>
      <div className={styles.row}>
        <TextBox label="Nível" name="nivel" type="number" value={formData.nivel} onChange={handleChange} />
        <TextBox label="Alcance" name="alcance" value={formData.alcance} onChange={handleChange} />
        <TextBox label="Duração" name="duracao" value={formData.duracao} onChange={handleChange} />
      </div>
      <TextBox label="Componentes" name="componentes" value={formData.componentes} onChange={handleChange} placeholder="V, S, M (descrição)" />
      <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} />
      <Checkbox label="Ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};
export default MagiaForm;
