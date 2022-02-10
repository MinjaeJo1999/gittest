import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'; //export default 아닌 모듈은 {} 중괄호 필수
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import '../style/Header.css';

const MenuSide = styled.div`
  display:  ${props => props.state ? 'flex' : 'none'}; 
  position: fixed; 
  flex-direction: column;
  top: 0; 
  left: 0;
  transition: 350ms;
  background-color: #ffffff;
  width: 40vw;
  height:100vh;
  border-right:1px solid #a7a7a7;
  @media screen and (max-width: 450px){
    width: 60vw;
  }
 
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin-top: 10%;
`

//로그인 화면, 캠스터디는 적용 제외
const Header = () => { 
    const user = useSelector(state => {
        console.log( state);  // 출력 내용을 확인해 보세요.
        console.log( state.id_redux);
            return state.id_redux;
          });

    console.log('store의 user:',user);
    const [isOpen, setMenu] = useState(false);
    const menus = [
        { title: "참여 중인 스터디" , path: "/studies/:userId"},  // 실제 주소 'api/' 제외
        { title: "스터디 목록", path: "/studies"}, 
        { title: "로그아웃" , path: "/"}
        ]
    
    const toggleMenu = () => {
	    setMenu(isOpen => !isOpen); 
	}

    // window.location.pathname.includes('room')
    //  window.location.pathname === '/room/*' 
    //window.location.href.indexOf('room') > -1
    //var url = window.location.href; (url.match('room'))
    if (window.location.pathname === '/login' || 
        window.location.pathname === '/test' || 
        (window.location.href.indexOf('room') > -1) ) 
        return null; 
    
     return ( 
        <div className="headerStyle">
            <FontAwesomeIcon icon={faAlignJustify} onClick={()=> toggleMenu()}/>
                <MenuSide state = {isOpen}>
                    <FiX className ='xButton' onClick={()=> toggleMenu()}/>
                    <p className='userID'>{user}님</p>
                    <List> 
                        {menus.map((menu, index) => {
                            return (
                                <NavLink className="listStyle" exact style={{color: "black", textDecoration: "none"}}
                                 to={menu.path}
                                 key={index}
                                 >
                                <p>{menu.title}</p>
                                </NavLink>
                            )
                        })}
                    </List>
                </MenuSide>
            <div style={{paddingLeft : '70px'}}>  
                STUDYDO
            </div>
        </div>
     )
    }

export default Header;