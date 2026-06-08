"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Proficiency } from "@/types/library";
import styles from "./ProficiencyForm.module.css";

const proficiencySchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  type: z.enum(['Arma', 'Armadura', 'Ferramenta', 'Outro'], {
    errorMap: () => ({ message: "Selecione um tipo válido" })
  }),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
});

export type ProficiencyFormData = z.infer<typeof proficiencySchema>;

interface ProficiencyFormProps {
  initialData?: Partial<Proficiency>;
  onSubmit: (data: ProficiencyFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ProficiencyForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: ProficiencyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProficiencyFormData>({
    resolver: zodResolver(proficiencySchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "Outro",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nome da Proficiência</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={styles.input}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type" className={styles.label}>Tipo</label>
        <select id="type" {...register("type")} className={styles.select}>
          <option value="Arma">Arma</option>
          <option value="Armadura">Armadura</option>
          <option value="Ferramenta">Ferramenta</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.type && (
          <span className={styles.error}>{errors.type.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status" className={styles.label}>Status</label>
        <select id="status" {...register("status")} className={styles.select}>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Rascunho">Rascunho</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Descrição</label>
        <textarea
          id="description"
          {...register("description")}
          className={styles.textarea}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Proficiência"}
        </button>
      </div>
    </form>
  );
}
