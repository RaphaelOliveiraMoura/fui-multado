import styles from './styles.module.css';

export default function VelocityInput({ name, label, error, ...props }) {
  const hasError = Boolean(error);

  return (
    <div
      className={styles['input-container']}
      aria-invalid={hasError.toString()}
    >
      <div>
        <input id={name} name={name} type="number" {...props} />
        <span>Km/h</span>
      </div>
      <p aria-hidden={!hasError.toString()}>{error}</p>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
