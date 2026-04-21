import { Navigate} from 'react-router-dom';

interface RotaProtegidaProps {
  children: React.ReactNode;
}

function RotaProtegida(props: RotaProtegidaProps) {
    const dado = localStorage.getItem('usuarioLogado');
    if(!dado) return <Navigate to="/" />
   
    return props.children
}

export default RotaProtegida;