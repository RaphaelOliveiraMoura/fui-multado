import { useState } from 'react';

import Link from 'next/link';

import FreepikImage from '../../components/FreepikImage';
import VelocityInput from '../../components/VelocityInput';
import FinedMessage from '../../components/FinedMessage/FinedMessage';
import NotFinedMessage from '../../components/FinedMessage/NotFinedMessage';

import isFined from '../../utils/isFined';

import styles from './styles.module.css';

const HOME_STATE = {
  start: '__START__',
  fined: '__FINED__',
  not_fined: '__NOT_FINED__',
};

export default function Home() {
  const [homeState, setHomeState] = useState(HOME_STATE.start);

  const [radarVelocity, setRadarVelocity] = useState('');
  const [limitVelocity, setLimitVelocity] = useState(60);

  const [errors, setErrors] = useState({});

  function smoothScroll({ top = false }) {
    setTimeout(
      () =>
        window.scrollTo({
          behavior: 'smooth',
          top: top ? 0 : document.body.scrollHeight,
        }),
      300
    );
  }

  function checkErrors() {
    const isPositive = (number) => Number(number) > 0;

    const errors = {
      radarVelocity:
        !isPositive(radarVelocity) &&
        'Verifique se digitou uma velocidade válida',
      limitVelocity:
        !isPositive(limitVelocity) &&
        'Verifique se digitou uma velocidade válida',
    };

    setErrors(errors);

    return Object.values(errors).filter((error) => !!error).length === 0;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (!checkErrors()) return;

    if (homeState !== HOME_STATE.start) {
      setHomeState(HOME_STATE.start);
      return smoothScroll({ top: true });
    }

    const wasFined = isFined({ radarVelocity, limitVelocity });
    setHomeState(wasFined ? HOME_STATE.fined : HOME_STATE.not_fined);
    smoothScroll({ top: false });
  }

  return (
    <main className={`${styles.main} ${styles[homeState]}`}>
      <div>
        <section className={styles['form-section']}>
          <div className={styles['help-icon']}>
            <div>
              <Link href="/sobre">
                <img src="/images/help-icon.svg" alt="Ícone de ajuda" />
              </Link>
              <span>
                Saiba mais, sobre como nossos cálculos são realizados ?
              </span>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <header>
              <div className={styles['image-container']}>
                <FreepikImage
                  src="/images/traffic_ilustration.svg"
                  author="rawpixel.com"
                  width="100%"
                  height="100%"
                  alt="Imagem de pessoas segurando placas de trânsito"
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
                disabled={homeState !== HOME_STATE.start}
                error={errors.radarVelocity}
              />
              <VelocityInput
                name="limit-velocity"
                label="Velocidade máxima da via"
                value={limitVelocity}
                onChange={(e) => setLimitVelocity(e.target.value)}
                disabled={homeState !== HOME_STATE.start}
                error={errors.limitVelocity}
              />
            </div>
            <button type="submit">
              {homeState === HOME_STATE.start
                ? 'Verificar'
                : 'Verificar novamente'}
            </button>
          </form>
        </section>
        <FinedMessage
          radarVelocity={radarVelocity}
          limitVelocity={limitVelocity}
          visible={homeState === HOME_STATE.fined}
        />
        <NotFinedMessage
          radarVelocity={radarVelocity}
          limitVelocity={limitVelocity}
          visible={homeState === HOME_STATE.not_fined}
        />
      </div>
    </main>
  );
}
