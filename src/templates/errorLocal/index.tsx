import styles from "./index.module.css";

export const ErrorLocal = ({ error }: { error: string }) => {
  return (
    <div className={styles.error_local}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error}</i>
      </p>
    </div>
  );
}
