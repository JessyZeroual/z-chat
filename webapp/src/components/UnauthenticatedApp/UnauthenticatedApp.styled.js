import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  height: 100vh;
  background-color: #3f0f40;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 450px;
  border-radius: 10px;
  padding: 10px;
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
  width: 100%;
  height: 40px;
  background-color: #4caf50;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  padding: 6px 8px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  margin: 5px 0px;
`;
