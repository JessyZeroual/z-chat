import styled from 'styled-components';

export const HeaderListOption = styled.div`
  display: flex;
  padding: 5px 15px;
  border-bottom: 1px solid #dfdfdf;
  height: 50px;
  ${props => props.isSmallScreen && 'inherit'}
`;

export const ButtonListOption = styled.button`
  display: flex;
  background: none;
  width: 100%;
  border: none;
  padding: 5px 15px;
  font: inherit;
  cursor: pointer;
  outline: ${props => props.isSmallScreen && 'inherit'};
  &:hover {
    background: #1164a3;
    color: #fff;
  }
`;

export const ButtonUpload = styled.label`
  outline: ${props => props.focusInputUpload && 'solid #4E8ADA 2px'};
  display: flex;
  align-items: center;
  height: 25px;
  padding: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;
