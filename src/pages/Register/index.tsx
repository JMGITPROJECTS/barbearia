import { Form, Input, Button, message} from 'antd';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function Register(){
    const handleSubmit = (valores: {nome: string; email: string; senha: string;}) => {
        const resultado = registerUser(valores.nome, valores.email, valores.senha);
        if (!resultado.sucesso){
            message.error(resultado.mensagem)
        }else{
            message.success(resultado.mensagem) 
            navigate('/')
        } 
    }
    const navigate = useNavigate();
    return (
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 400 }}>
        <Form onFinish={handleSubmit}>
            <Form.Item
            label="Nome"
            name="nome"
            rules={[{required: true, message: 'Digite seu nome'}]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
            label="E-mail"
            name="email"
            rules={[{required: true, message: 'Digite o e-mail'}]}
            > 
                <Input />   
            </Form.Item>

            <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Digite a senha'}]}
            >
            <Input.Password />
            </Form.Item>

        <Button type='primary' htmlType='submit'>Cadastrar</Button>
      <p>
            Já tem conta?{' '}
            <span onClick={() => navigate('/')} style={{ color: '#1677ff', cursor: 'pointer' }}>
                Faça login
            </span>
          </p>
        </Form>
      </div>
    </div>   
    );
}
export default Register;