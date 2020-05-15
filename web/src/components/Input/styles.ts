import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: rgb(225, 224, 224);
  border-radius: 10px;
  border: 2px solid rgb(53, 51, 51);
  padding: 16px;
  width: 100%;
  color: rgb(53, 51, 51);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: rgb(223, 46, 48);
      border-color: rgb(223, 46, 48);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: rgb(0, 178, 51);
      border-color: rgb(0, 178, 51);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: rgb(0, 178, 51);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: rgb(53, 51, 51);

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
