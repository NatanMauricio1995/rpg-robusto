"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { World } from "@/types/world";
import styles from "./WorldForm.module.css";

const worldSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  system: z.string().min(2, "Informe o sistema de jogo"),
  description: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Rascunho"]),
  imageUrl: z.string().url("Informe uma URL válida para a imagem").optional().or(z.literal("")),
});

export type WorldFormData = z.infer<typeof worldSchema>;

interface WorldFormProps {
  initialData?: Partial<World>;
  onSubmit: (data: WorldFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function WorldForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading 
}: WorldFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorldFormData>({
    resolver: zodResolver(worldSchema),
    defaultValues: {
      name: initialData?.name || "",
      system: initialData?.system || "",
      description: initialData?.description || "",
      status: initialData?.status || "Ativo",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nome do Mundo</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={styles.input}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="system" className={styles.label}>Sistema de Jogo</label>
        <input
          id="system"
          type="text"
          {...register("system")}
          className={styles.input}
          placeholder="Ex: D&D 5e, Pathfinder 2e..."
          aria-invalid={!!errors.system}
        />
        {errors.system && <span className={styles.error}>{errors.system.message}</span>}
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
        <label htmlFor="imageUrl" className={styles.label}>URL da Imagem de Capa</label>
        <input
          id="imageUrl"
          type="text"
          {...register("imageUrl")}
          className={styles.input}
          placeholder="https://exemplo.com/imagem.jpg"
          aria-invalid={!!errors.imageUrl}
        />
        {errors.imageUrl && <span className={styles.error}>{errors.imageUrl.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Descrição / Visão Geral</label>
        <textarea
          id="description"
          {...register("description")}
          className={styles.textarea}
          placeholder="Descreva brevemente o seu mundo..."
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Mundo"}
        </button>
      </div>
    </form>
  );
}
