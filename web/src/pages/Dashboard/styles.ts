import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-family: 'Open Sans', serif;
      color: rgb(225, 224, 224);
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Repositories = styled.div`
  flex: 1;
  margin-top: 80px;
  background-size: cover;
`;

export const ToolCard = styled.div`
  flex: 1;
  border-radius: 5px;
  margin-top: 16px;
  margin-left: 20px;
  background: rgb(225, 224, 224);
  padding: 24px;
  display: block;
  text-decoration: none;

  display: flex;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(10px);
  }

  div {
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: rgb(53, 53, 51);
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    a {
      color: rgb(0, 178, 51);
    }
  }

  span {
    margin-left: auto;
    color: rgb(53, 53, 51);
  }
`;

export const DeleteButton = styled.button`
  border: 0;
  background-color: rgb(225, 224, 224);
  position: absolute;
  right: 0;
  top: 0px;
  margin-right: 4px;
`;
