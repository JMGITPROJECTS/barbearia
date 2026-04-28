import { Form, Input, InputNumber, Button } from "antd";
import type { FormInstance } from "antd";
import type { Servico } from "../../types";

interface ServicoFormProps {
  form: FormInstance;
  onFinish: (valores: Omit<Servico, "id" | "ativo">) => void;
  editando: boolean;
}

function ServicoForm(props: ServicoFormProps) {
  return (
    <Form form={props.form} onFinish={props.onFinish} layout="vertical">
      <Form.Item
        label="Nome do Serviço"
        name="nome"
        rules={[{ required: true, message: "Digite o nome do Serviço" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Descrição (Opcional)" name="descricao">
        <Input.TextArea rows={4} placeholder="Digite algo (opcional)" />
      </Form.Item>

      <Form.Item
        label="Preço (R$)"
        name="preco"
        rules={[{ required: true, message: "Digite o preço do serviço!" }]}
      >
        <InputNumber min={0} step={1} precision={2} prefix="R$" />
      </Form.Item>

      <Form.Item
        label="Duração (em minutos)"
        name="duracao"
        rules={[{ required: true, message: "Digite o tempo em MINUTOS" }]}
      >
        <InputNumber min={1} step={5} suffix=" min" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {props.editando ? "Atualizar Serviço" : "Adicionar Serviço"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ServicoForm;
