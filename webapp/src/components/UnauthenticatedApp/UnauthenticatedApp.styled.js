import styled from 'styled-components';
import { primaryBackgroundColor } from '../../constants/style-constants';

export const Container = styled.div`
  height: 100vh;
  background-color: ${primaryBackgroundColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 450px;
  border-radius: 10px;
  padding: 20px;
  color: white;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.error ? 'red' : '#ced4da')};
  margin: 5px 0px;
`;

export const Button = styled.button`
  width: ${props => (props.width ? props.width : '100%')};
  height: 40px;
  background-color: ${props => (props.bgColor ? props.bgColor : '#4caf50')};
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  margin: 5px 0px;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const WrapperSignup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 576px) {
    display: block;
  }
`;
