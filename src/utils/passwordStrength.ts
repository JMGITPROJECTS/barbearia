export function calcularForcaSenha(senha: string) {
  let pontos = 0;

  if (senha.length >= 8) pontos++;
  if (senha.length >= 10) pontos++;
  if (/[a-z]/.test(senha)) pontos++;
  if (/[A-Z]/.test(senha)) pontos++;
  if (/\d/.test(senha)) pontos++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha)) pontos++;

  if (pontos <= 2) return { nivel: "fraca", cor: "#E24B4A", percent: 33 };
  if (pontos <= 4) return { nivel: "média", cor: "#EF9F27", percent: 66 };
  return { nivel: "forte", cor: "#1D9E75", percent: 100 };
}