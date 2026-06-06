import { ReactNode } from "react";
import styles from "./ContentContainer.module.css";

type ContentContainerProps = {
  children: ReactNode;
};

export default function ContentContainer({
  children,
}: ContentContainerProps) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}