import React, {useContext} from 'react';
import cookie from 'react-cookies';
import superagent from 'superagent';
import { SignInContext } from '../context/auth';
import useAjax from '../hooks/community-hook';


// const [questions, userInfo, _getAllQuestions, _postQuestion, _getTheUser] = useAjax();

const initialState = {questions:[]};
const API = 'https://synhub.herokuapp.com';
let token ;
  const cookieToken = cookie.load('auth');
  token = cookieToken || null;

export default (state = initialState, action) =>{
    const {type, payload} = action;
    console.log('action',action)
    switch (type){
        case 'showQuestions':
            console.log(state,'state.questions')
            return {questions: payload.questions};
        case 'addQuestion':
            return {questions: state.questions }
        default:
            return state;
    }
}
export const _getAllQuestions = () => {
    return (dispatch)=>{
        return superagent.get(`${API}/api/v1/questions`)
        .accept('application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(data => {
            dispatch(getQuestionsAction({questions: data.body.records}))
        }).catch(console.error);
    }
}
export const _addQuestion = (body) =>{
    const context = useContext(SignInContext);

    console.log(body);
    return (dispatch)=>{
        superagent.post(`${API}/api/v1/questions`)
            .send(body)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                dispatch(addQuestionsAction({newQuestion: data.body.record}))
            }).catch(console.error);
    }
}
export const getQuestionsAction = (payload)=>{
    return {
        type: 'showQuestions',
        payload: payload,
    }
}
export const addQuestionsAction = (payload)=>{
    return {
        type: 'addQuestion',
        payload: payload,
    }
}