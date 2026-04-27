import type { Cliente, Resultado } from "../types";

const CHAVE_STORAGE = "clientes";

export function getClientes() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  const clientes: Cliente[] = dados ? JSON.parse(dados) : [];
  return clientes;
}

export function addCliente(dados: Omit<Cliente, "id">): Resultado {
  const clientes = getClientes();
  const cpfExistente = clientes.find(
    (itemArray) => itemArray.cpf === dados.cpf,
  );
  if (cpfExistente) return { sucesso: false, mensagem: "CPF já cadastrado!" };

  const emailExistente = clientes.find(
    (itemArray) =>
      itemArray.email.trim().toLocaleLowerCase() ===
      dados.email.trim().toLocaleLowerCase(),
  );
  if (emailExistente)
    return { sucesso: false, mensagem: "E-mail já cadastrado!" };

  const novoCliente: Cliente = {
    id: Date.now(),
    ...dados,
  };

  clientes.push(novoCliente);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(clientes));

  return { sucesso: true, mensagem: "Cliente adicionado com sucesso!" };
}

export function updateCliente(clienteAtualizado: Cliente): Resultado {
  const clientes = getClientes();
  const cpfExistente = clientes.find(
    (itemArray) =>
      itemArray.cpf === clienteAtualizado.cpf &&
      itemArray.id !== clienteAtualizado.id,
  );
  if (cpfExistente)
    return { sucesso: false, mensagem: "CPF já cadastrado por outro cliente!" };

  const emailExistente = clientes.find(
    (itemArray) =>
      itemArray.email.trim().toLocaleLowerCase() ===
        clienteAtualizado.email.trim().toLocaleLowerCase() &&
      itemArray.id !== clienteAtualizado.id,
  );
  if (emailExistente)
    return {
      sucesso: false,
      mensagem: "E-mail já cadastrado por outro cliente!",
    };

  const indexCliente = clientes.findIndex(
    (itemArray) => itemArray.id === clienteAtualizado.id,
  );
  if (indexCliente === -1)
    return { sucesso: false, mensagem: "Cliente não encontrado" };
  clientes[indexCliente] = clienteAtualizado;

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(clientes));
  return { sucesso: true, mensagem: "Cliente atualizado com sucesso" };
}

export function deleteCliente(id: number): Resultado {
  const clientes = getClientes();
  const clientesAtualizados = clientes.filter(
    (itemArray) => itemArray.id !== id,
  );

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(clientesAtualizados));
  return { sucesso: true, mensagem: "Cliente removido com sucesso" };
}
