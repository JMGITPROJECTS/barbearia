import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  linkText: string;
  linkLabel: string;
  linkAction: () => void;
  subtitle?: string;
}

function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.overlay} />
      <div className={styles.formWrapper}>
        <div className={styles.card}>
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
      </div>
    </div>
  );
}

export default AuthLayout;