import bcrypt from "bcryptjs";
import type { Usuario } from "../types";

export function registerUser(nome: string, email: string, senha: string) {
  const dados = localStorage.getItem("usuarios");
  const usuarios: Usuario[] = dados ? JSON.parse(dados) : [];
  const usuarioEncontrado = usuarios.find(
    (itemArray) => itemArray.email === email,
  );

  if (usuarioEncontrado)
    return { sucesso: false, mensagem: "E-mail já cadastrado" };

  const senhaHash = bcrypt.hashSync(senha, 10);
  const novoUsuario = { nome, email, senha: senhaHash };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  return { sucesso: true, mensagem: "Usuário cadastrado com sucesso!" };
}

export function loginUser(email: string, senha: string) {
  const dados = localStorage.getItem("usuarios");
  const usuarios: Usuario[] = dados ? JSON.parse(dados) : [];
  const usuarioEncontrado = usuarios.find(
    (itemArray) => itemArray.email === email,
  );

  if (!usuarioEncontrado)
    return { sucesso: false, mensagem: "E-mail não cadastrado" };

  const senhaCorreta = bcrypt.compareSync(senha, usuarioEncontrado.senha);

  if (!senhaCorreta) {
    return { sucesso: false, mensagem: "Senha incorreta" };
  }
  
  localStorage.setItem("usuarioLogado", usuarioEncontrado.nome);
  return { sucesso: true, mensagem: "Logado com sucesso" };
}