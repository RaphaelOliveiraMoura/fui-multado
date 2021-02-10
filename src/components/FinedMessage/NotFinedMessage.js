import FreepikImage from '../FreepikImage';

import styles from './styles.module.css';

export default function FinedMessage() {
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
