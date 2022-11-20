import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  height: 198px;

  display: flex;
  justify-content: center;
  align-items: center;
  `;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    > h1 {
      color: #FFF;
      font-size: 32px;
    }

    > h2 {
      color: #FFF;
      font-weight: 400;
      font-size: 16px;
      opacity: .9;
      margin-top: 6px;
    }
  }
`;
