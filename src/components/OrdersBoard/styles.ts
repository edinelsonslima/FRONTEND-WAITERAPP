import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  padding: 16px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 16px;

  > header {
    padding: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;

  button {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    height: 128px;
    border-radius: 8px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    strong{
      font-weight: 500;
    }

    span{
      font-size: 16px;
      color: #666;
    }

    & + button {
      margin-top: 24px;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;

    gap: 24px;

    button {
       min-width: 128px;
       max-width: 128px;

       & + button {
        margin-top: 0px;
        margin-bottom: 24px;
      }
    }
  }
`;
