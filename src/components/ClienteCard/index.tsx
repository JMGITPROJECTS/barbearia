import { Button } from "antd";
import type { Cliente } from "../../types";
import styles from "./ClienteCard.module.css"

interface ClienteCardProps {
  cliente: Cliente;
  onEditar: () => void;
  onExcluir: () => void;
}

function ClienteCard(props: ClienteCardProps) {
  return (
    <div className={styles.card}>
      <p>
        <strong>Nome:</strong> {props.cliente.nome}
      </p>
      <p>
        <strong>CPF:</strong> {props.cliente.cpf}
      </p>
      <p>
        <strong>Telefone:</strong> {props.cliente.telefone}
      </p>
      <p>
        <strong>E-mail:</strong> {props.cliente.email}
      </p>
      <div>
        <Button type="link" onClick={props.onEditar}>
          Editar
        </Button>
        <Button type="link" danger onClick={props.onExcluir}>
          Excluir
        </Button>
      </div>
    </div>
  );
}

export default ClienteCard;