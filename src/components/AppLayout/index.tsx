import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
 children: React.ReactNode;
}

function AppLayout(props: AppLayoutProps) {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("usuarioLogado");

  const handleSair = () => {
    Modal.confirm({
      title: "Deseja sair do sistema?",
      okText: "Sair",
      cancelText: "Cancelar",
      okType: "danger",
      onOk: () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/");
      },
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.title}>Barbearia</span>
        <div className={styles.userArea}>
          <span className={styles.userName}>Olá, {nomeUsuario}</span>
          <Button danger onClick={handleSair}>Sair</Button>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default AppLayout;
