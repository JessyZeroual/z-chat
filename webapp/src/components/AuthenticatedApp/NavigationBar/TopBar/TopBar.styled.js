import styled from 'styled-components';
import { TopBarHeight } from '../../../../constants/style-constants';

export const TopBarStyled = styled.div`
  background-color: white;
  width: 100%;
  height: ${TopBarHeight};
  border-bottom: 1px solid #e2e2e2;
`;

export const BurgerWrapper = styled.div`
  margin-left: auto;
  margin-right: 15px;
`;

export const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 25px;
    height: 3px;
    background: #0d0c1d;
    transition: all 0.3s linear;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
