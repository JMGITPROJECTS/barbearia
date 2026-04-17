import { Form, Input, Button, message} from 'antd';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function Login (){
    const handleSubmit = (valores: {email: string; senha: string }) => {
        const resultado = loginUser(valores.email, valores.senha);
        if (!resultado.sucesso){
            message.error(resultado.mensagem)
        }else{
            message.success(resultado.mensagem) 
            navigate('/clientes')
        } 
    }
    const navigate = useNavigate();

    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div style={{ width: 400 }}>  
        <Form onFinish={handleSubmit}>
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

            <Button type='primary' htmlType='submit'>Entrar</Button>
<p>
          Não tem conta?{' '}
         <span onClick={() => navigate('/cadastro')} style={{ color: '#1677ff', cursor: 'pointer' }}>
             Cadastre-se
         </span>
      </p>
          
        </Form>
  </div>
</div>
    );
}
export default Login;