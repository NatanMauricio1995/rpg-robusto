import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button,
  MultiSelect
} from '../../../../components';
import IdiomaService from '../../idiomas/services/IdiomaService';
import SentidoService from '../../sentidos/services/SentidoService';
import styles from './RacaForm.module.css';

const tamanhoOptions = [
  { value: 'Pequeno', label: 'Pequeno' },
  { value: 'Médio', label: 'Médio' },
  { value: 'Grande', label: 'Grande' }
];

const RacaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    deslocamento: 9,
    tamanho: 'Médio',
    idiomas: [],
    sentidos: [],
    atributos: {
      forca: 0,
      destreza: 0,
      constituicao: 0,
      inteligencia: 0,
      sabedoria: 0,
      carisma: 0
    },
    ativo: true
  });

  const [idiomaOptions, setIdiomaOptions] = useState([]);
  const [sentidoOptions, setSentidoOptions] = useState([]);

  useEffect(() => {
    const loadDependencies = async () => {
      const [idiomas, sentidos] = await Promise.all([
        IdiomaService.getAll(),
        SentidoService.getAll()
      ]);
      setIdiomaOptions(idiomas.map(i => ({ value: i.id, label: i.nome })));
      setSentidoOptions(sentidos.map(s => ({ value: s.id, label: s.nome })));
    };
    loadDependencies();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        atributos: { ...initialData.atributos }
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

  const handleAtributoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [name]: Number(value)
      }
    }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className={styles.row}>
        <TextBox label="Nome da Raça" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>

      <div className={styles.row}>
        <TextBox label="Deslocamento (m)" name="deslocamento" type="number" value={formData.deslocamento} onChange={handleChange} />
        <Select label="Tamanho" name="tamanho" options={tamanhoOptions} value={formData.tamanho} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <MultiSelect 
          label="Idiomas" 
          options={idiomaOptions} 
          value={formData.idiomas} 
          onChange={(val) => setFormData(p => ({ ...p, idiomas: val }))} 
        />
        <MultiSelect 
          label="Sentidos" 
          options={sentidoOptions} 
          value={formData.sentidos} 
          onChange={(val) => setFormData(p => ({ ...p, sentidos: val }))} 
        />
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Bônus de Atributos</h4>
        <div className={styles.gridAtributos}>
          <TextBox label="For" name="forca" type="number" value={formData.atributos.forca} onChange={handleAtributoChange} />
          <TextBox label="Des" name="destreza" type="number" value={formData.atributos.destreza} onChange={handleAtributoChange} />
          <TextBox label="Con" name="constituicao" type="number" value={formData.atributos.constituicao} onChange={handleAtributoChange} />
          <TextBox label="Int" name="inteligencia" type="number" value={formData.atributos.inteligencia} onChange={handleAtributoChange} />
          <TextBox label="Sab" name="sabedoria" type="number" value={formData.atributos.sabedoria} onChange={handleAtributoChange} />
          <TextBox label="Car" name="carisma" type="number" value={formData.atributos.carisma} onChange={handleAtributoChange} />
        </div>
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

export default RacaForm;
