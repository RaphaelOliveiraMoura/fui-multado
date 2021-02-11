import FreepikImage from '../FreepikImage';

import styles from './styles.module.css';

import { getConsideredVelocity } from '../../utils/isFined';

export default function FinedMessage({ radarVelocity }) {
  const consideredVelocity = getConsideredVelocity({ radarVelocity });

  return (
    <section className={styles.container}>
      <FreepikImage
        src="/images/happy_person.svg"
        author="jcomp"
        width="100%"
        height="100%"
        alt="Imagem de uma pessoa feliz"
        link="free-vector/successful-business-men-hold-flag-jump-up_12397491.htm"
      />
      <div>
        <h2>
          MUITO PROVAVELMENTE VOCÊ <strong>NÃO</strong> FOI MULTADO
        </h2>
        <p>
          Sua <strong>velocidade considerada</strong> foi de{' '}
          {consideredVelocity}km/h, então muito provavelmente você não recebeu
          nenhuma multa
        </p>
        <p>
          O equipamento de radar móvel nem sempre atua com uma precisão de 100%.
          De acordo com o Código de Trânsito Brasileiro existe uma{' '}
          <strong>tolerância</strong> que é usada para definir a{' '}
          <strong>velocidade considerada</strong> do condutor.
        </p>
      </div>
    </section>
  );
}
