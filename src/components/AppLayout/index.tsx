import { Button, Dropdown, Modal, Form, Input, message, Progress, App as AntApp } from "antd";
import { UserOutlined, KeyOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePassword } from "../../services/authService";
import { calcularForcaSenha } from "../../utils/passwordStrength";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout(props: AppLayoutProps) {
  const { modal } = AntApp.useApp();
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("usuarioLogado");
  const emailUsuario = localStorage.getItem("emailLogado");
  const [modalSenha, setModalSenha] = useState(false);
  const [form] = Form.useForm();
  const senhaDigitada = Form.useWatch("senhaNova", form);
  const forcaSenha = senhaDigitada ? calcularForcaSenha(senhaDigitada) : null;

  const handleSair = () => {
    modal.confirm({
      title: "Deseja sair do sistema?",
      okText: "Sair",
      cancelText: "Cancelar",
      okType: "danger",
      onOk: () => {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("emailLogado");
        navigate("/");
      },
    });
  };

  const handleChangePassword = (valores: {
    senhaAtual: string;
    senhaNova: string;
  }) => {
    if (!emailUsuario) return;
    const resultado = changePassword(
      emailUsuario,
      valores.senhaAtual,
      valores.senhaNova,
    );
    if (!resultado.sucesso) {
      message.error(resultado.mensagem);
    } else {
      message.success(resultado.mensagem);
      setModalSenha(false);
      form.resetFields();
    }
  };

  const menuItems = [
    {
      key: "header",
      label: (
        <div className={styles.menuHeader}>
          <span className={styles.menuName}>{nomeUsuario}</span>
          <span className={styles.menuEmail}>{emailUsuario}</span>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" as const },
    {
      key: "senha",
      label: "Redefinir senha",
      icon: <KeyOutlined />,
      onClick: () => setModalSenha(true),
    },
    { type: "divider" as const },
    {
      key: "sair",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleSair,
    },
  ];

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.title}>Barbearia</span>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
          <div className={styles.avatar}>
            <UserOutlined />
          </div>
        </Dropdown>
      </div>
      {props.children}

      <Modal
        title="Redefinir senha"
        open={modalSenha}
        onCancel={() => {
          setModalSenha(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleChangePassword} layout="vertical">
          <Form.Item
            label="Senha atual"
            name="senhaAtual"
            rules={[{ required: true, message: "Digite sua senha atual" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nova senha"
            name="senhaNova"
            rules={[
              { required: true, message: "Digite a nova senha" },
              { min: 8, message: "Senha deve ter no mínimo 8 caracteres" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {forcaSenha && (
            <div className={styles.passwordStrength}>
              <Progress
                percent={forcaSenha.percent}
                strokeColor={forcaSenha.cor}
                showInfo={false}
                size="small"
              />
              <span
                className={styles.passwordLabel}
                style={{ color: forcaSenha.cor }}
              >
                Senha {forcaSenha.nivel}
              </span>
            </div>
          )}

          <Form.Item
            label="Confirmar nova senha"
            name="confirmarSenha"
            dependencies={["senhaNova"]}
            rules={[
              { required: true, message: "Confirme a nova senha" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("senhaNova") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não coincidem"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Redefinir senha
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AppLayout;