import Link from 'next/link';

import styles from './styles.module.css';

export default function About() {
  return (
    <main className={styles.main}>
      <section>
        <div>
          <header>
            <Link href="/">
              <a>Testar o app</a>
            </Link>
          </header>
          <h1>Fui Multado?</h1>
          <h2>Nosso objetivo</h2>
          <p>
            Bem vindo ao <strong>fuimultado.app</strong>, nosso principal
            objetivo é deixar claro para você como funciona os regulamentos
            aplicados em infrações/multas por radar(es) eletrônicos.
          </p>
          <p>
            Já passou por algum radar que marcou sua velocidade um pouquinho
            acima da velocidade máxima permitida na via, e{' '}
            <strong>ficou naquela dúvida se ia ou não ser multado ?</strong>{' '}
            Pois então, no nosso site vamos deixar claro para você como funciona
            o sistema de tolerância utilizado para multas em radares.
          </p>
          <p>
            Aqui calculamos de forma <strong>automática</strong> a velocidade
            considerada pelo radar e te informamos se você foi ou não multado
            baseado na velocidade que foi marcada no radar.
          </p>
          <p>
            Primeiro precisamos entender que os radares possuem uma tolerância,
            pois eles não tem uma precisão de 100% ao medir a velocidade do seu
            veículo.
          </p>
          <h2>Qual é a tolerância do radar ?</h2>
          <p>
            A regra que utilizamos para saber se você foi ou não multado é
            baseado no cálculo da <strong>velocidade considerada</strong> ao
            passar pelo radar, para encontrar essa velocidade considerada
            utilizamos a seguinte regra:
          </p>
          <ul>
            <li>
              - Até 100km/h a velocidade considerada é igual á{' '}
              <strong>(VELOCIDADE MARCADA PELO RADAR) - 7km/h</strong>
            </li>
            <li>
              - Para velocidades acima de 100km/h, a velocidade considerada é
              igual a <strong>(VELOCIDADE MARCADA PELO RADAR) - 7%</strong>
            </li>
          </ul>
          <h2>Outras fontes</h2>
          <p>
            Você pode encontrar mais informações sobre infrações e regras de
            trânsitos nos seguintes sites:
          </p>
          <ul>
            <li>
              <a href="https://doutormultas.com.br/tolerancia-do-radar/">
                Doutor Multas
              </a>
            </li>
            <li>
              <a href="https://www.portaldotransito.com.br/noticias/radar-existe-tolerancia-para-quem-passa-acima-da-velocidade-permitida/">
                Portal do Trânsito
              </a>
            </li>
          </ul>
          <h2>Sobre nós</h2>
          <p>
            Esse site foi desenvolvido como um projeto de código aberto, e está
            livre para contribuições de qualquer pessoa que queira ajudar
          </p>
          <p>
            Você consegue contribuir acessando nosso projeto no{' '}
            <a href="https://github.com/RaphaelOliveiraMoura/fui-multado">
              github
            </a>{' '}
            e deixando sugestões de melhorias ou correções para o site.
          </p>
          <p>Obrigado pelo apoio !!</p>
        </div>
      </section>
    </main>
  );
}
