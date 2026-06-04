import React, { useState, useEffect } from 'react';
import { 
  TextBox, 
  TextArea, 
  Select, 
  Checkbox, 
  Button
} from '../../../../components';
import RacaService from '../../../../services/RacaService';
import styles from './SubRacaForm.module.css';

const SubRacaForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    racaId: '',
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

  const [racaOptions, setRacaOptions] = useState([]);

  useEffect(() => {
    const loadRacas = async () => {
      const racas = await RacaService.getAll();
      setRacaOptions(racas.map(r => ({ value: r.id, label: r.nome })));
    };
    loadRacas();
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
        <TextBox label="Nome da Sub-raça" name="nome" value={formData.nome} onChange={handleChange} required />
        <Select label="Raça Pai" name="racaId" options={racaOptions} value={formData.racaId} onChange={handleChange} required placeholder="Selecione a raça..." />
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Bônus Adicionais de Atributos</h4>
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

export default SubRacaForm;
