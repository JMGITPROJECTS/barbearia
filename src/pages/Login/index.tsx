import { Form, Input, Button, message } from "antd";
import { loginUser } from "../../services/authService";
import { useNavigate, Navigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import PageTransition from "../../components/PageTransition";
function Login() {
  const navigate = useNavigate();
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (usuarioLogado) {
    return <Navigate to="/clientes" />;
  }
  const handleSubmit = (valores: { email: string; senha: string }) => {
    const resultado = loginUser(valores.email, valores.senha);
    if (!resultado.sucesso) {
      message.error(resultado.mensagem);
    } else {
      const nome = localStorage.getItem("usuarioLogado");
      message.success(`Bem-vindo, ${nome}!`);
      navigate("/clientes");
    }
  };

  return (
    <PageTransition>
      <AuthLayout
        linkLabel="Não tem conta?"
        linkText="Cadastre-se"
        linkAction={() => navigate("/cadastro")}
        subtitle="Acesse o sistema de gestão"
      >
        <Form onFinish={handleSubmit} layout="vertical">
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

          <Button type="primary" htmlType="submit" block>
            Entrar
          </Button>
        </Form>
      </AuthLayout>
    </PageTransition>
  );
}

export default Login;
