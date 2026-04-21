import { Form, Input, Button } from 'antd';
import type { FormInstance } from 'antd';
import { formatarCPF, formatarTelefone, validarCPF } from '../../utils/masks';
interface ClienteFormProps{
    form: FormInstance;
    onFinish: (valores:{nome: string; cpf: string; telefone:string; email: string}) => void;
    editando: boolean;
}

function ClienteForm(props: ClienteFormProps) {
    return (
        <Form form={props.form} onFinish={props.onFinish}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Digite o seu nome" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[
              { required: true, message: "Digite o seu CPF" },
              { min: 14, message: "CPF Incompleto" },
              () => ({
                validator(_, value) {
                  if (!value || validarCPF(value)){
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("CPF inválido"))
                }
              })

            ]}
          >
            <Input
              maxLength={14}
              onChange={(e) =>
                props.form.setFieldValue("cpf", formatarCPF(e.target.value))
              }
            />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[{ required: true, message: "Digite o seu telefone" }]}
          >
            <Input
              maxLength={15}
              onChange={(e) =>
                props.form.setFieldValue("telefone", formatarTelefone(e.target.value))
              }
            />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Digite o seu E-mail" },
              { type: "email", message: "E-mail inválido" },
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {props.editando ? "Atualizar Dados" : "Cadastrar"}
          </Button>
        </Form>
    )
}

export default ClienteForm; 