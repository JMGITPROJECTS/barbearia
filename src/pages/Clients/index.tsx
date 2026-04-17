import { Table, Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import {
  getClientes,
  addCliente,
  deleteCliente,
  updateCliente,
} from "../../services/clientService";
import type { Cliente } from "../../types";
import { formatarCPF, formatarTelefone } from "../../utils/masks";
import { useWindowSize } from "../../utils/useWindowSize";

function Clientes() {
  const [listaClientes, setListaClientes] = useState<Cliente[]>(getClientes());
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);
  const [form] = Form.useForm(); // o Ant Deisgn Form tem prop de initialValues que faz os valores já vim  quando for na edição mas pra funcionar com dados que mudam preciso usar o form do Ant Design
  const larguraTela = useWindowSize();
  const isMobile = larguraTela < 768;

  const handleSubmit = (valores: {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
  }) => {
    if (editandoCliente) {
      const resultado = updateCliente({ ...valores, id: editandoCliente.id });
      if (!resultado.sucesso) {
        message.error(resultado.mensagem);
      } else {
        message.success(resultado.mensagem);
        setListaClientes(getClientes());
        setModalAberto(false);
        setEditandoCliente(null);
      }
    } else {
      const resultado = addCliente(
        valores.nome,
        valores.cpf,
        valores.telefone,
        valores.email,
      );
      if (!resultado.sucesso) {
        message.error(resultado.mensagem);
      } else {
        message.success(resultado.mensagem);
        setListaClientes(getClientes());
        setModalAberto(false);
      }
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir?",
      content: "Essa ação não pode ser desfeita.",
      cancelText: "Cancelar",
      okText: "Excluir",
      okType: "danger",
      onOk: () => {
        deleteCliente(id);
        setListaClientes(getClientes());
        message.success("Cliente removido com sucesso");
      },
    });
  };

  const handleEditar = (cliente: Cliente) => {
    setEditandoCliente(cliente);
    form.setFieldsValue(cliente);
    setModalAberto(true);
  };

  const colunas = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "CPF", dataIndex: "cpf", key: "cpf" },
    { title: "Telefone", dataIndex: "telefone", key: "telefone" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    {
      title: "Ações",
      key: "acoes",
      render: (cliente: Cliente) => (
        <div>
          <Button type="link" onClick={() => handleEditar(cliente)}>
            Editar
          </Button>
          <Button type="link" danger onClick={() => handleDelete(cliente.id)}>
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => {
          setEditandoCliente(null);
          form.resetFields();
          setModalAberto(true);
        }}
      >
        Novo Cliente
      </Button>

      {isMobile ? (
        <div>
          {listaClientes.map((cliente) => (
            <div
              key={cliente.id}
              style={{
                border: "1px solid #303030",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <p>
                <strong>Nome:</strong> {cliente.nome}
              </p>
              <p>
                <strong>CPF:</strong> {cliente.cpf}
              </p>
              <p>
                <strong>Telefone:</strong> {cliente.telefone}
              </p>
              <p>
                <strong>E-mail:</strong> {cliente.email}
              </p>
              <div>
                <Button type="link" onClick={() => handleEditar(cliente)}>
                  Editar
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(cliente.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table dataSource={listaClientes} columns={colunas} rowKey="id" />
      )}

      <Modal
        title={editandoCliente ? "Editar Cliente" : "Cadastrar Cliente"}
        open={modalAberto}
        onCancel={() => {
          setModalAberto(false);
          setEditandoCliente(null); // se não tiver isso aki, depois de editar, ao clicar em "Novo Cliente" o modal vai pensar que ainda estou editando o Cliente
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
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
            rules={[{ required: true, message: "Digite o seu CPF" }]}
          >
            <Input
              maxLength={14}
              onChange={(e) =>
                form.setFieldValue("cpf", formatarCPF(e.target.value))
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
                form.setFieldValue("telefone", formatarTelefone(e.target.value))
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
            {editandoCliente ? "Atualizar Dados" : "Cadastrar"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Clientes;
