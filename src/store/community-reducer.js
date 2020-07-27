import cookie from 'react-cookies';
import superagent from 'superagent';




const initialState = {questions:[]};
const API = 'https://synhub.herokuapp.com';

  const cookieToken = cookie.load('auth');
  let token = cookieToken || null;
  //
  const userPro = cookie.load('user');
  let theUser = userPro || null;

export default (state = initialState, action) =>{
    const {type, payload} = action;
    switch (type){
        case 'showQuestions':
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
    return (dispatch)=>{
        superagent.post(`${API}/api/v1/questions`)
            .send({...body, author:theUser.username})
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