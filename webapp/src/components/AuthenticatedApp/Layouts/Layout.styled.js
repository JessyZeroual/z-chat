import styled from 'styled-components';
import { TopBarHeight } from '../../../constants/style-constants';

export const LayoutStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContainerChildren = styled.div`
  height: calc(100% - ${TopBarHeight});
`;
