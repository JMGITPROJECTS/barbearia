import bcrypt from "bcryptjs";
import type { Usuario, Resultado } from "../types";


const CHAVE_STORAGE = "usuarios";

export function getUsuarios(): Usuario[] {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  const usuarios: Usuario[] = dados ? JSON.parse(dados) : [];
  return usuarios;
}

export function registerUser(nome: string, email: string, senha: string) : Resultado {
  const usuarios = getUsuarios();
  const usuarioEncontrado = usuarios.find(
    (itemArray) => itemArray.email === email,
  );

  if (usuarioEncontrado)
    return { sucesso: false, mensagem: "E-mail já cadastrado" };

  const senhaHash = bcrypt.hashSync(senha, 10);
  const novoUsuario = { nome, email, senha: senhaHash };
  usuarios.push(novoUsuario);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(usuarios));

  return { sucesso: true, mensagem: "Usuário cadastrado com sucesso!" };
}

export function loginUser(email: string, senha: string) : Resultado{
  const usuarios = getUsuarios();
  const usuarioEncontrado = usuarios.find(
    (itemArray) => itemArray.email === email,
  );

  if (!usuarioEncontrado)
    return { sucesso: false, mensagem: "E-mail não cadastrado" };

  const senhaCorreta = bcrypt.compareSync(senha, usuarioEncontrado.senha);

  if (!senhaCorreta) {
    return { sucesso: false, mensagem: "Senha incorreta" };
  }

  const nomeExibicao = usuarioEncontrado.nome.split(" ").slice(0, 2).join(" ");
  localStorage.setItem("usuarioLogado", nomeExibicao);

  localStorage.setItem("emailLogado", email);
  return { sucesso: true, mensagem: "Logado com sucesso" };
}

export function changePassword(
  email: string,
  senhaAtual: string,
  senhaNova: string,
) : Resultado {
  
  const usuarios = getUsuarios();
  const usuarioEncontrado = usuarios.find(
    (itemArray) => itemArray.email === email,
  );

  if (!usuarioEncontrado)
    return { sucesso: false, mensagem: "Usuário não encontrado" };

  const senhaCorreta = bcrypt.compareSync(senhaAtual, usuarioEncontrado.senha);

  if (!senhaCorreta)
    return { sucesso: false, mensagem: "Senha atual incorreta" };

  const senhaHash = bcrypt.hashSync(senhaNova, 10);

  const index = usuarios.findIndex((itemArray) => itemArray.email === email);
  usuarios[index] = { ...usuarioEncontrado, senha: senhaHash };
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(usuarios));

  return { sucesso: true, mensagem: "Senha redefinida com sucesso!" };
}
