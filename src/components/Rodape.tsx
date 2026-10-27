import styles from './Rodape.module.css';
import { SeloHashord } from './SeloHashord';

export function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={`conteudo ${styles.dentro}`}>
        <span className={styles.marca}>
          <span className={styles.rastro} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          fui multado?
        </span>
        <p className={styles.texto}>
          Estimativa com base no Código de Trânsito Brasileiro (art. 218) e na Resolução CONTRAN nº 798/2020. Não substitui a
          notificação oficial do órgão de trânsito. Projeto de código aberto, feito por{' '}
          <a href="https://github.com/RaphaelOliveiraMoura/fui-multado">Raphael</a>.
        </p>
      </div>
      {/* O selo é a última coisa do rodapé, numa linha só dele; a pista abaixo é só a borda decorativa. */}
      <div className={`conteudo ${styles.selo}`}>
        <SeloHashord />
      </div>
      <div className={styles.pista} aria-hidden="true" />
    </footer>
  );
}
