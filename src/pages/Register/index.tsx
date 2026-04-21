import { Form, Input, Button, message } from "antd";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import PageTransition from "../../components/PageTransition";
function Register() {
  const navigate = useNavigate();

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
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Digite seu nome" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Digite o e-mail" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Digite a senha" }]}
          >
            <Input.Password />
          </Form.Item>

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
