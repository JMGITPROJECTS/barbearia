export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export interface Servico {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number;
  ativo: boolean;
}

export interface Resultado {
  sucesso: boolean;
  mensagem: string;
}
