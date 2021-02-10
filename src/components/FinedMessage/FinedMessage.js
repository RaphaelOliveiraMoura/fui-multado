import FreepikImage from '../FreepikImage';

import styles from './styles.module.css';

export default function FinedMessage() {
  return (
    <section className={styles.container}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          facilisis felis vel nulla volutpat varius. Aliquam erat volutpat. Sed
          fermentum dictum molestie.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          facilisis felis vel nulla volutpat varius. Aliquam erat volutpat. Sed
          fermentum dictum molestie.
        </p>
      </div>
    </section>
  );
}
