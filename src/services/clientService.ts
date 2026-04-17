import type { Cliente } from "../types";

export function getClientes() {
  const dados = localStorage.getItem("clientes");
  const clientes: Cliente[] = dados ? JSON.parse(dados) : [];
  return clientes;
}

export function addCliente(
  nome: string,
  cpf: string,
  telefone: string,
  email: string,
) {
  const clientes = getClientes();
  const cpfExistente = clientes.find((itemArray) => itemArray.cpf === cpf);
  if (cpfExistente) return { sucesso: false, mensagem: "CPF já cadastrado!" };

  const emailExistente = clientes.find(
    (itemArray) => itemArray.email === email,
  );
  if (emailExistente)
    return { sucesso: false, mensagem: "E-mail já cadastrado!" };

  const novoCliente: Cliente = {
    id: Date.now(),
    nome,
    cpf,
    telefone,
    email,
  };

  clientes.push(novoCliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  return { sucesso: true, mensagem: "Cliente adicionado com sucesso" };
}

export function updateCliente(clienteAtualizado: Cliente) {
  const clientes = getClientes();
  const cpfExistente = clientes.find(
    (itemArray) => itemArray.cpf === clienteAtualizado.cpf && itemArray.id !== clienteAtualizado.id);
  if (cpfExistente) return { sucesso: false, mensagem: "CPF já cadastrado por outro cliente!" };

  const emailExistente = clientes.find(
    (itemArray) => itemArray.email === clienteAtualizado.email && itemArray.id !== clienteAtualizado.id);
  if (emailExistente) return { sucesso: false, mensagem: "E-mail já cadastrado por outro cliente!" };


  const indexCliente = clientes.findIndex(
    (itemArray) => itemArray.id === clienteAtualizado.id);
  if (indexCliente === -1)
    return { sucesso: false, mensagem: "Cliente não encontrado" };
  clientes[indexCliente] = clienteAtualizado;

  localStorage.setItem("clientes", JSON.stringify(clientes));
  return { sucesso: true, mensagem: "Cliente atualizado com sucesso" };
}

export function deleteCliente(id: number) {
  const clientes = getClientes();
  const clientesAtualizados = clientes.filter(
    (itemArray) => itemArray.id !== id,
  );

  localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
  return { sucesso: true, mensagem: "Cliente removido com sucesso" };
}
