import bcrypt from "bcryptjs";

export function seedClientes() {
  const clientesExistentes = localStorage.getItem("clientes");
  if (clientesExistentes) return;

  const clientes = [
    { id: 1, nome: "Ana Silva", cpf: "529.982.247-25", telefone: "(62) 99876-5432", email: "ana.silva@email.com" },
    { id: 2, nome: "Bruno Santos", cpf: "418.293.158-70", telefone: "(11) 98765-4321", email: "bruno.santos@email.com" },
    { id: 3, nome: "Carlos Oliveira", cpf: "724.861.359-49", telefone: "(21) 97654-3210", email: "carlos.oliveira@email.com" },
    { id: 4, nome: "Daniela Costa", cpf: "361.478.296-10", telefone: "(31) 96543-2109", email: "daniela.costa@email.com" },
    { id: 5, nome: "Eduardo Lima", cpf: "892.145.367-53", telefone: "(41) 95432-1098", email: "eduardo.lima@email.com" },
    { id: 6, nome: "Fernanda Souza", cpf: "153.679.428-02", telefone: "(51) 94321-0987", email: "fernanda.souza@email.com" },
    { id: 7, nome: "Gabriel Ferreira", cpf: "647.283.519-86", telefone: "(71) 93210-9876", email: "gabriel.ferreira@email.com" },
    { id: 8, nome: "Helena Rocha", cpf: "285.917.643-34", telefone: "(81) 92109-8765", email: "helena.rocha@email.com" },
    { id: 9, nome: "Igor Mendes", cpf: "936.524.871-67", telefone: "(85) 91098-7654", email: "igor.mendes@email.com" },
  ];

  localStorage.setItem("clientes", JSON.stringify(clientes));
}

export function seedAdmin() {
  const usuariosExistentes = localStorage.getItem("usuarios");
  if (usuariosExistentes) return;

  const senhaHash = bcrypt.hashSync("123", 10);
  const usuarios = [
    { nome: "Admin", email: "admin", senha: senhaHash }
  ];

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}