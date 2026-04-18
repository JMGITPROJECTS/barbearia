import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  linkText: string;
  linkLabel: string;
  linkAction: () => void;
}

function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        {props.children}
        <p>
          {props.linkLabel}{' '}
          <span onClick={props.linkAction} className={styles.link}>
            {props.linkText}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;