import { useState, useEffect } from 'react';
import superagent from 'superagent';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

// const jwt = require('jsonwebtoken'); 
const SECRET = 'batool123';
export default function CommunityHook() {
  let token ;
  useEffect(()=>{
    const cookieToken = cookie.load('auth');
    token = cookieToken || null;
    // this.validateToken(token);

  },[]); 
  
    const API = 'https://synhub.herokuapp.com';
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWE4NmFkZDUxOTlmMDAxN2RjN2E2MyIsInVzZXJuYW1lIjoiWW91c2VmIEFsU2h1biIsImNhcGFiaWxpdGllcyI6bnVsbCwiZXhwaXJlc0luIjo5MDAwMDAsImFsZ29yaXRobSI6IlJTMjU2IiwiaWF0IjoxNTk1NTczOTM0fQ.Gf1qKBo1bBY0kYoPRi_bfEhEtJKBvdtCxBow-AnQt70'
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'
    const [questions, setQuestions] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [newQuestion, setNewQuestion] = useState({});


    const _getAllQuestions = () => {
        superagent.get(`${API}/api/v1/questions`)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                // console.log('data',data.body.records)
                setQuestions(data.body.records)
            }).catch(console.error);
    }

    const _postQuestion = (body) => {
      // console.log('tokentoken',token)
        superagent.post(`${API}/api/v1/questions`)
            .send(body)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                // console.log('data',data.body.record)
                setNewQuestion(data.body.record)
            }).catch(console.error);
    }

    const _getTheUser = async(_id)=>{

            // try {
            //   let tokenObject = await jwt.verify(token, SECRET);
            // //   console.log('tokenObject', tokenObject);
            //   console.log('tokenObject.id', tokenObject.id);
        
            //   if (tokenObject.id) {
            //     return(Promise.resolve(tokenObject));
            //   } else {
            //     return Promise.reject('User is not found!');
            //   }
            // }catch(e){
            //   return Promise.reject(e.message);
            // }
            superagent.get(`${API}/api/v1/users/${_id}`)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                console.log('userInfo',data.body.records[0])
                setUserInfo({userInfo:data.body.records[0]})
            }).catch(console.error);

            

    }
    return [questions, userInfo, _getAllQuestions, _postQuestion, _getTheUser];

}