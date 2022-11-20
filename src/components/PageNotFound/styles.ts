import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #FAFAFA;

  height: 100vh;
  max-width: 1980px;
  margin: 0 auto;


  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;

    > img {
      max-width: 100%;
    }

    > div {
      max-width: 100%;

    }
  }
`;

export const Image = styled.img`
  flex: 1;
  max-width: 50%;
  height: 100%;

  object-fit: contain;
  background: #D73035;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, .6);
`;


export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 16px;

  flex: 1;
  height: 100%;
  max-width: 50%;

  padding: 32px;
`;


export const Title = styled.h1`
  font-size: clamp(1rem, 5vw, 2.5rem);
  text-align: center;
`;
