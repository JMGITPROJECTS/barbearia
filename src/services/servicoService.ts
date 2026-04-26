import type { Servico } from "../types";

const CHAVE_STORAGE = "servicos";

export function getServicos(): Servico[] {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  const servicos: Servico[] = dados ? JSON.parse(dados) : [];
  return servicos;
}


export function addServico(
  nome: string,
  preco: number,
  duracao: number,
  descricao?: string,
) {
  const servicos = getServicos();
  const nomeServicoExistente = servicos.find(
    (itemArray) =>
      itemArray.nome.trim().toLocaleLowerCase() ===
      nome.trim().toLocaleLowerCase(),
  );
  if (nomeServicoExistente)
    return { sucesso: false, mensagem: "Nome de Serviço já cadastrado" };

  const novoServico: Servico = {
    id: Date.now(),
    nome,
    descricao,
    preco,
    duracao,
    ativo: true,
  };

  servicos.push(novoServico);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(servicos));
  return { sucesso: true, mensagem: "Serviço adicionado com sucesso!" };
}

export function updateServico(servicoAtualizado: Servico) {
  const servicos = getServicos();
  const nomeServicoExistente = servicos.find(
    (itemArray) =>
      itemArray.nome.trim().toLocaleLowerCase() ===
        servicoAtualizado.nome.trim().toLocaleLowerCase() &&
      itemArray.id !== servicoAtualizado.id,
  );
  if (nomeServicoExistente)
    return { sucesso: false, mensagem: "Nome de Serviço já cadastrado" };

  const indexServico = servicos.findIndex(
    (itemArray) => itemArray.id === servicoAtualizado.id,
  );
  if (indexServico === -1)
    return { sucesso: false, mensagem: "Serviço não encontrado" };
  servicos[indexServico] = servicoAtualizado;

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(servicos));
  return { sucesso: true, mensagem: "Serviço atualizado com sucesso" };
}
