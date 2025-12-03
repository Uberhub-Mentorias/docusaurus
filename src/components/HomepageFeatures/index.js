import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Guias Rápidos',
    Svg: require('@site/static/img/guias-rapidos.svg').default,
    description: (
      <>
        Comece rapidamente com guias personalizados para Mentorados, Mentores, 
        Administradores e Desenvolvedores.
      </>
    ),
  },
  {
    title: 'Mapa do Conhecimento',
    Svg: require('@site/static/img/mapa-conhecimento.svg').default,
    description: (
      <>
        Navegue pela documentação com um mapa visual estilo "metrô" que conecta 
        todos os conceitos e tópicos.
      </>
    ),
  },
  {
    title: 'Roteiro de Estudos',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Aprenda de forma estruturada com trilhas personalizadas por nível: 
        Iniciante, Intermediário e Avançado.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
