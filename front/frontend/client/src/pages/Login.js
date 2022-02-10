import React, { useEffect,useState} from 'react';
import styled from "styled-components";
import axios from 'axios';
import useForm from './useForm_login';

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #ff8c00;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

const Login = (props) => {
  
  function join(){
		props.history.push(`/join`);
	}

  axios.defaults.withCredentials = true; //+
  axios.defaults.headers['post'] = {'Content-Type': 'application/json'}; //+
  const URL = 'https://10.200.148.182:8000/api/users/login'; //https://192.168.0.28:8000

  const {inputs,submitting,handleChange,handleSubmit} = useForm({
    initialValues: {id: "",password: ""},
    onSubmit: (inputs) => {

      alert(JSON.stringify(inputs,null,2));
      console.log(JSON.stringify(inputs)); //undefined 확인

      const fetchData = async()=>{
        try{
          const response = await axios.post(URL,JSON.stringify(inputs));
          console.log(response.data.data);
          if(response.data.data === "login success"){
            console.log(inputs.id);
            sessionStorage.setItem('user',inputs.id);
            window.location.replace('/');
          }
        }
        catch(e){
          console.log(e);
        }
      }

      fetchData();
    }
  });

    
  return (
    <>
    <Container>
      <form onSubmit={handleSubmit}>        
        <Input  
          name="id" 
          value = {inputs.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요" 
        />
        <Input
          name="password"
          value = {inputs.password}
          onChange={handleChange}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button type ="submit" disabled={submitting}>로그인</button>        
      </form>
      <div>
        <button type='button' onClick={join}>회원가입</button>	
      </div>
    </Container>
    </>
  );
};

export default Login;

//아이디 이메일 비밀번호