import { ReactNode } from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import ContentContainer from "../ContentContainer/ContentContainer";

import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.body}>
        <Sidebar />

        <ContentContainer>
          {children}
        </ContentContainer>
      </div>

      <Footer />
    </div>
  );
}