import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  linkText: string;
  linkLabel: string;
  linkAction: () => void;
  subtitle?: string;
  bg?: 'login' | 'register';
}

function AuthLayout(props: AuthLayoutProps) {
  const bgClass = props.bg === 'register' ? styles.bgRegister : styles.bgLogin;

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h1 className={styles.title}>Barbearia</h1>
        {props.subtitle && (
          <p className={styles.subtitle}>{props.subtitle}</p>
        )}
        {props.children}
        <p className={styles.linkWrapper}>
          {props.linkLabel}{' '}
          <span onClick={props.linkAction} className={styles.link}>
            {props.linkText}
          </span>
        </p>
      </div>
      <div className={`${styles.imageSection} ${bgClass}`} />
    </div>
  );
}

export default AuthLayout;