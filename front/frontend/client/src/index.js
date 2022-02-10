import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
//import { persistStore } from 'redux-persist';
//import { persistReducer } from 'redux-persist';
//import storageSession from 'redux-persist/lib/storage/session';  //세션 스토리지
//import { PersistGate } from 'redux-persist/integration/react';

/*
const persistConfig = {
  // 새로운 persist config를 선언해준다.
  key: 'root',
  // reducer 객체의 어느 지점에서 부터 데이터를 저장할 것인지 설정해주는것이 key이다.
  // root부터 시작한다고 지정해준다.
  storage: storageSession,
  // 위에 import 한 성격의 storage를 지정해준다. 이 예제의 경우에는 localstorage
  whitelist: ["user"],
  // 유지 및 보존하고 싶은 데이터를 배열안에 지정해준다. 
  // string 형태이고 아래 combineReducers에 지정된 값들을 사용해주면 된다. 
}; */

/* store */
let store = createStore(()=>{return {id_redux : sessionStorage.getItem('user') } });
//const persistor = persistStore(store);
//<PersistGate persistor={persistor}>

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
