import { useState } from 'react';

import FreepikImage from '../src/components/FreepikImage';
import VelocityInput from '../src/components/VelocityInput';

import isFined from '../src/utils/isFined';

import styles from '../src/styles/index.module.css';

const HOME_STATE = {
  start: '__START__',
  fined: '__FINED__',
  not_fined: '__NOT_FINED__',
};

export default function Home() {
  const [homeState, setHomeState] = useState(HOME_STATE.start);

  const [radarVelocity, setRadarVelocity] = useState(0);
  const [limitVelocity, setLimitVelocity] = useState(60);

  function onSubmit(event) {
    event.preventDefault();

    const wasFined = isFined({ radarVelocity, limitVelocity });

    setHomeState(wasFined ? HOME_STATE.fined : HOME_STATE.not_fined);
  }

  return (
    <main className={`${styles.main} ${styles[homeState]}`}>
      <section>
        <form onSubmit={onSubmit}>
          <header>
            <div className={styles['image-container']}>
              <FreepikImage
                src="/images/traffic_ilustration.svg"
                author="rawpixel.com"
                width="100%"
                height="100%"
                link="free-vector/character-illustration-people-with-traffic-sign-icons_3226081.htm"
              />
            </div>

            <h1>Fui multado ?</h1>
          </header>
          <div>
            <VelocityInput
              name="radar-velocity"
              label="Velocidade capturada pelo radar"
              value={radarVelocity}
              onChange={(e) => setRadarVelocity(e.target.value)}
            />
            <VelocityInput
              name="limit-velocity"
              label="Velocidade máxima da via"
              value={limitVelocity}
              onChange={(e) => setLimitVelocity(e.target.value)}
            />
          </div>
          <button type="submit">
            {homeState === HOME_STATE.start
              ? 'Verificar'
              : 'Verificar novamente'}
          </button>
        </form>
      </section>
    </main>
  );
}
