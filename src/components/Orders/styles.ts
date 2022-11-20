import styled from 'styled-components';

export const Container= styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  display: flex;
  gap: 32px;
  padding: 16px;


  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;



