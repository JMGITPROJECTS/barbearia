import { Form, Input, Button, message, Progress } from "antd";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import PageTransition from "../../components/PageTransition";
import { calcularForcaSenha } from "../../utils/passwordStrength";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const senhaDigitada = Form.useWatch("senha", form);
  const forcaSenha = senhaDigitada ? calcularForcaSenha(senhaDigitada) : null;

  const handleSubmit = (valores: {
    nome: string;
    email: string;
    senha: string;
  }) => {
    const resultado = registerUser(valores.nome, valores.email, valores.senha);
    if (!resultado.sucesso) {
      message.error(resultado.mensagem);
    } else {
      message.success(resultado.mensagem);
      navigate("/");
    }
  };

  return (
    <PageTransition>
      <AuthLayout
        linkLabel="Já tem conta?"
        linkText="Faça login"
        linkAction={() => navigate("/")}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              { required: true, message: "Digite seu nome" },
              {
                pattern: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "Nome deve conter apenas letras",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Digite o e-mail" },
              { type: "email", message: "E-mail inválido" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              { required: true, message: "Digite a senha" },
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
            label="Confirmar Senha"
            name="confirmarSenha"
            dependencies={["senha"]}
            rules={[
              { required: true, message: "Confirme sua senha" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("senha") === value) {
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
            Cadastrar
          </Button>
        </Form>
      </AuthLayout>
    </PageTransition>
  );
}

export default Register;