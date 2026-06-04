import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button,
  MultiSelect
} from '../../../../components';
import PericiaService from '../../../../services/PericiaService';
import ProficienciaService from '../../../../services/ProficienciaService';
import styles from './ClasseForm.module.css';

const dadoOptions = [
  { value: '4', label: 'D4' },
  { value: '6', label: 'D6' },
  { value: '8', label: 'D8' },
  { value: '10', label: 'D10' },
  { value: '12', label: 'D12' },
  { value: '20', label: 'D20' }
];

const ClasseForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    dadoVida: '8',
    periciasDisponiveis: [],
    quantidadePericias: 2,
    proficiencias: [],
    ativo: true
  });

  const [periciaOptions, setPericiaOptions] = useState([]);
  const [profOptions, setProfOptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [pers, profs] = await Promise.all([
        PericiaService.getAll(),
        ProficienciaService.getAll()
      ]);
      setPericiaOptions(pers.map(p => ({ value: p.id, label: p.nome })));
      setProfOptions(profs.map(p => ({ value: p.id, label: p.nome })));
    };
    loadData();
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
        <TextBox label="Nome da Classe" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Dado de Vida" name="dadoVida" options={dadoOptions} value={formData.dadoVida} onChange={handleChange} required />
      </div>

      <div className={styles.row}>
        <MultiSelect label="Perícias Disponíveis" options={periciaOptions} value={formData.periciasDisponiveis} onChange={(val) => setFormData(p => ({ ...p, periciasDisponiveis: val }))} />
        <TextBox label="Qtd Escolhas" name="quantidadePericias" type="number" value={formData.quantidadePericias} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <MultiSelect label="Proficiências Iniciais" options={profOptions} value={formData.proficiencias} onChange={(val) => setFormData(p => ({ ...p, proficiencias: val }))} />
      </div>

      <div className={styles.row}>
        <TextArea label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} />
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

export default ClasseForm;
