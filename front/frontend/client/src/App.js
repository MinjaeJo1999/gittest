import React , { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import styled from "styled-components";
import Enter from './Enter'; 
import Room from './Room'; 
import ObjDetection from './ObjDetection';
import Header from './routes/Header';
import Footer from './routes/Footer'; 
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import Test from './pages/Test';


//BrowserRouter : URL, UI 동기화 / history API 사용 시 새로고침 없이 주소 변경
//Switch : Route로 생성된 자식 컴포넌트 중 매칭되는 첫번째 Route 렌더링
//URL에 따라 변경하고 싶은 컴포넌트 Switch 태그로 감싸고 Switch 외부는 모든 페이지에서 공통으로 보여짐
//Link : 페이지 새로 불러와서 기존 컴포넌트가 가지고 있던 상태값이 날아감


const Wrapper = styled.div`
  display: flex; 
  min-height: 100vh; 
  flex-direction: column;
`;


const App = () =>{

  const [isLogin, setIsLogin] = useState();
  useEffect(()=>{
      if(sessionStorage.getItem('user')){
          setIsLogin(true);
      }
  },[]);


  return (
        <BrowserRouter>
        <Wrapper>
        <Header />
          <Switch>
            {isLogin ? (
                <Route path="/" exact component={Enter} />
              ):(
                <Route path="/" exact component={LoginPage} />
              )} 
              <Route path = "/" component={Enter} exact={true}/>
              {/*<Route path="/login" component={LoginPage} />  */}      
              <Route path="/profile" component={Profile}/>
              <Route path="/objDetect" component={ObjDetection} />
              <Route path="/room/:roomID" component={Room} exact={true} />
              <Route path="/test" component={Test} exact={true} />
          </Switch>
         </Wrapper>
          <Footer />
        </BrowserRouter>
  )
}
export default App;
