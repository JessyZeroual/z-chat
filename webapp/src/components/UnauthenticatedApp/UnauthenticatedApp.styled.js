import styled from 'styled-components';
import {
  primaryBackgroundColor,
  primaryColor,
} from '../../constants/style-constants';

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
  padding: 0px 20px;
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
  width: 190px;
  height: 40px;
  background-color: #fff;
  color: grey;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 5px;
  margin: 5px 0px;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  height: 40px;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  padding: 6px 8px;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid ${primaryColor};
  margin: 5px 0px;
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${primaryColor};
    color: ${primaryBackgroundColor};
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
