import { Form, Input, Button, message } from "antd";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (valores: { email: string; senha: string }) => {
    const resultado = loginUser(valores.email, valores.senha);
    if (!resultado.sucesso) {
      message.error(resultado.mensagem);
    } else {
      message.success(resultado.mensagem);
      navigate("/clientes");
    }
  };

  return (
    <AuthLayout
      linkLabel="Não tem conta?"
      linkText="Cadastre-se"
      linkAction={() => navigate("/cadastro")}
    >
      <Form onFinish={handleSubmit}>
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

        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form>
    </AuthLayout>
  );
}

export default Login;
