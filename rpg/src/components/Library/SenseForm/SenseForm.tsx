"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sense } from "@/types/library";
import styles from "./SenseForm.module.css";

const senseSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
});

export type SenseFormData = z.infer<typeof senseSchema>;

interface SenseFormProps {
  initialData?: Partial<Sense>;
  onSubmit: (data: SenseFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function SenseForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: SenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SenseFormData>({
    resolver: zodResolver(senseSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nome do Sentido</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={styles.input}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.error}>{errors.name.message}</span>
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
          {loading ? "Salvando..." : "Salvar Sentido"}
        </button>
      </div>
    </form>
  );
}
