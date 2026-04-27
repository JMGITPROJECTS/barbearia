const formatadorReais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number): string {
  return formatadorReais.format(valor);
}

export function formatarDuracao(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  if (horas === 0) return `${minutosRestantes}min`;
  if (minutosRestantes === 0) return `${horas}h`;
  return `${horas}h ${minutosRestantes}min`;
}
