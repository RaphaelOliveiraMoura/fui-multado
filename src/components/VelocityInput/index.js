import styles from './styles.module.css';

export default function VelocityInput({ name, label }) {
  return (
    <div className={styles['input-container']}>
      <div>
        <input id={name} name={name} type="number" />
        <span>Km/h</span>
      </div>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
