import { Table, Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import {
  getClientes,
  addCliente,
  deleteCliente,
  updateCliente,
} from "../../services/clientService";
import styles from "./Clients.module.css";
import type { Cliente } from "../../types";
import { useWindowSize } from "../../utils/useWindowSize";
import ClienteCard from "../../components/ClienteCard";
import ClienteForm from "../../components/ClienteForm";
import AppLayout from "../../components/AppLayout";
import PageTransition from "../../components/PageTransition";

function Clientes() {
  const [listaClientes, setListaClientes] = useState<Cliente[]>(getClientes());
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);
  const [form] = Form.useForm();
  const [busca, setBusca] = useState("");
  const clientesFiltrados = listaClientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.cpf.includes(busca) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()),
  );
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
    <PageTransition>
      <AppLayout>
        <div className={styles.page}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Clientes</h1>
            <Button
              type="primary"
              onClick={() => {
                setEditandoCliente(null);
                form.resetFields();
                setModalAberto(true);
              }}
            >
              + Novo Cliente
            </Button>
          </div>

          <Input
            placeholder="Buscar por nome, CPF ou e-mail..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            allowClear
            className={styles.searchInput}
          />
          <p className={styles.counter}>
            {clientesFiltrados.length}{" "}
            {clientesFiltrados.length === 1
              ? "cliente encontrado"
              : "clientes encontrados"}
          </p>

          {isMobile ? (
            <div>
              {clientesFiltrados.map((cliente) => (
                <ClienteCard
                  key={cliente.id}
                  cliente={cliente}
                  onEditar={() => handleEditar(cliente)}
                  onExcluir={() => handleDelete(cliente.id)}
                />
              ))}
            </div>
          ) : (
            <Table
              dataSource={clientesFiltrados}
              columns={colunas}
              rowKey="id"
              locale={{ emptyText: "Nenhum cliente cadastrado ainda" }}
            />
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
            <ClienteForm
              form={form}
              onFinish={handleSubmit}
              editando={!!editandoCliente}
            />
          </Modal>
        </div>
      </AppLayout>
    </PageTransition>
  );
}

export default Clientes;
