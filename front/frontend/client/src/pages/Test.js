import React from "react";
import axios from 'axios';

const Test = () => {
     axios
        ({
            method: 'POST',
            url: 'https://10.200.148.182:8000/test',
            data: {
                email: 'dfdsfs',
                username: 'abc'
              },
            headers: {
               'Content-Type': 'applicaction/json'
            }
          })
          .then((res) => {
              console.log(res.data)
          })
          .catch((err) => console.log(err)); 
          /*fetch ('https://192.168.0.28:8000/test', {
            method: 'POST',
            body: JSON.stringify({
                email: 'dfdsfs',
                username: 'abc'
              }),
            headers: {
               'Content-Type': 'applicaction/json'
            }
          })
          .then((res) => {
              console.log(res.data)
          })
          .catch((err) => console.log(err)); */

    
  return(
      <button>Test</button>  )
}
export default Test; 