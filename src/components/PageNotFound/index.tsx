import notFound from '../../assets/images/not-found.svg';

import { Container, Image, TextContainer, Title } from './styles';

export function PageNotFound() {

  return (
    <Container>
      <Image src={notFound} alt='Pessoas segurando tomadas com numero 404 no fundo'/>
      <TextContainer>
        <Title>Ops! a pagina que você procura não está aqui.</Title>
      </TextContainer>
    </Container>
  );
}
