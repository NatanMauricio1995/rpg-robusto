import React, { useState, useEffect } from 'react';
import { TextBox, TextArea, Select, Checkbox, Button } from '../../../../components';
import ClasseService from '../../classes/services/ClasseService';
import styles from './SubclasseForm.module.css';

const SubclasseForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', classeId: '', nivelDesbloqueio: 3, ativo: true });
  const [classeOptions, setClasseOptions] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      const classes = await ClasseService.getAll();
      setClasseOptions(classes.map(c => ({ value: c.id, label: c.nome })));
    };
    loadClasses();
  }, []);

  useEffect(() => { if (initialData) setFormData({ ...initialData }); }, [initialData]);

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Subclasse" name="nome" value={formData.nome} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} required />
        <Select label="Classe Pai" name="classeId" options={classeOptions} value={formData.classeId} onChange={(e) => setFormData(p => ({ ...p, classeId: e.target.value }))} required placeholder="Selecione..." />
      </div>
      <div className={styles.row}>
        <TextBox label="Nível de Desbloqueio" name="nivelDesbloqueio" type="number" value={formData.nivelDesbloqueio} onChange={(e) => setFormData(p => ({ ...p, nivelDesbloqueio: e.target.value }))} />
        <Checkbox label="Ativo" name="ativo" checked={formData.ativo} onChange={(e) => setFormData(p => ({ ...p, ativo: e.target.checked }))} />
      </div>
      <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={(e) => setFormData(p => ({ ...p, descricao: e.target.value }))} />
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button variant="primary" type="submit" loading={loading}>Salvar</Button>
      </div>
    </form>
  );
};
export default SubclasseForm;
