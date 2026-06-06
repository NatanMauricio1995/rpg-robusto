import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ContentContainer({ children }: Props) {
  return (
    <main
      style={{
        flex: 1,
        padding: "24px",
        overflow: "auto",
      }}
    >
      {children}
    </main>
  );
}