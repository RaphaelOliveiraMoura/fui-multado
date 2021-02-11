import styles from './styles.module.css';

export default function VelocityInput({ name, label, error, ...props }) {
  return (
    <div className={styles['input-container']}>
      <div>
        <input id={name} name={name} type="number" {...props} />
        <span>Km/h</span>
      </div>
      <p aria-hidden={Boolean(!error).toString()}>{error}</p>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
