import FreepikImage from '../FreepikImage';

import styles from './styles.module.css';

import getFinedType, { FINED_TYPES } from '../../utils/getFinedType';
import { getConsideredVelocity } from '../../utils/isFined';

export default function FinedMessage({
  radarVelocity,
  limitVelocity,
  visible,
}) {
  const consideredVelocity = getConsideredVelocity({ radarVelocity });

  const finedType = getFinedType({ radarVelocity, limitVelocity });

  const finedTypeMappingText = {
    [FINED_TYPES.medium]: 'média',
    [FINED_TYPES.serious]: 'grave',
    [FINED_TYPES.verySerious]: 'gravíssima',
  };

  const finedTypeRangeMapping = {
    [FINED_TYPES.medium]: 'até 20% do limite da via',
    [FINED_TYPES.serious]: 'mais de 20% até 50% do limite da via',
    [FINED_TYPES.verySerious]: 'acima de 50% do limite da via',
  };

  const finedTypeText = finedTypeMappingText[finedType];
  const finedTypeRange = finedTypeRangeMapping[finedType];

  return (
    <section
      className={styles.container}
      aria-hidden={Boolean(!visible).toString()}
    >
      <FreepikImage
        src="/images/sad_person.svg"
        author="slidesgo"
        width="100%"
        height="100%"
        alt="Imagem de uma pessoa triste"
        link="free-vector/feeling-blue-concept-illustration_7171666.htm"
      />
      <div>
        <h2>MUITO PROVAVELMENTE VOCÊ FOI MULTADO</h2>
        <p>
          Sua <strong>velocidade considerada</strong> foi de{' '}
          {consideredVelocity}km/h, então muito provavelmente você recebeu uma
          multa do tipo <strong>{finedTypeText}</strong> por ter passado{' '}
          <strong>{finedTypeRange}</strong>
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
