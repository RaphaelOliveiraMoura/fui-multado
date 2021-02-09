import FreepikImage from '../src/components/FreepikImage';
import VelocityInput from '../src/components/VelocityInput';

import styles from '../src/styles/index.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <form>
        <header>
          <FreepikImage
            src="/images/traffic_ilustration.svg"
            author="rawpixel.com"
            width="400"
            height="300"
          />
          <h1>Fui multado ?</h1>
        </header>
        <div>
          <VelocityInput
            name="radar-velocity"
            label="Velocidade capturada pelo radar"
          />
          <VelocityInput
            name="limit-velocity"
            label="Velocidade máxima da via"
          />
        </div>
        <button type="submit">Verificar</button>
      </form>
    </main>
  );
}
