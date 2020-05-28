import styled from 'styled-components';

const SVGIconStyled = styled.svg`
  fill: ${props => (props.fill ? props.fill : '#000')};
  cursor: pointer;
  &:hover {
    fill: ${props => (props.fillHover ? props.fillHover : props.fill)};
  }
`;

export default SVGIconStyled;
