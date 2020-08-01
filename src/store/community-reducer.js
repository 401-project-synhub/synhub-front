import cookie from 'react-cookies';
import superagent from 'superagent';



const initialState = { questions: [], answers:[], qDetails: {} };
// const API = 'https://synhub.herokuapp.com';
const API = 'https://synhub-project.herokuapp.com';



export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'showQuestions':
            return { questions: payload.questions };
        case 'addQuestion':
            return { questions: [payload, ...state.questions] }
        case 'deleteQuestion':
            return { questions: state.questions.filter(val => val._id !== payload) }
        case 'updateQuestion':
            return { questions: [...state.questions.map(val => val.id === payload._id ? payload.record : val)] }
        case 'searchQuestions':
            let searchResult=[];

            let inputArr= payload.input.replace(/\W\s|\W/g,' ').split(' ');
            
            payload.questions.forEach(val=>{
                let descriptionArr= val.description.replace(/\W\s|\W/g,' ').split(' ');
                // console.log('descriptionArr',descriptionArr)
                for(let i=0; i<inputArr.length; i++){
                    if(descriptionArr.includes(inputArr[i])){
                        searchResult.push(val);
                        break;
                    }
                }
            })
            console.log('inpu', state.questions)
            console.log('searchResults', searchResult)

            return {questions: searchResult}
        case 'addAnswer':
            return {answers: [...state.answers, payload]}
        case 'detailQuestion':
            console.log(payload)
            return {qDetails: payload}
        case 'tagsSearch':
            console.log('state',state)
            let filteredQuestions = payload.questions.filter(val=>val.tags.includes(payload.tag.toLowerCase()))
            console.log('filtered quedtions', filteredQuestions)
            return {...state,questions:filteredQuestions}    
        default:
            return state;
    }
}
export const _getAllQuestions = (choice) => {

    return (dispatch) => {
        return superagent.get(`${API}/api/v1/questions`)
            .accept('application/json')
            .then(data => {
                let sortedQuestions = data.body.records.sort((a, b) => {
                    if (choice === 'title') {
                            if(a.title.toUpperCase() < b.title.toUpperCase()) { return -1; }
                            if(a.title.toUpperCase() > b.title.toUpperCase()) { return 1; }
                            return 0;
                        
                    } else {
                        return new Date(b.date) - new Date(a.date);
                    }
                });
                dispatch(getQuestionsAction({ questions: sortedQuestions }))
            }).catch(console.error);
    }
}
export const _getQuestionDetails = (id) => {
    console.log('id',id)
    return (dispatch)=>{
        console.log('before Api call')
        return superagent.get(`${API}/api/v1/questions/${id}`)
            .accept('application/json')
            .then(data => {
                console.log('data.body.records[0]',data.body.records[0])
                dispatch(getQuesDetailsAction(data.body.records[0]))
            }).catch(console.error);
    }
}
export const _addQuestion = (body) => {
    const cookieToken = cookie.load('auth');
    let token = cookieToken || null;
    const userPro = cookie.load('user');
    let theUser = userPro || null;
    return (dispatch) => {
        superagent.post(`${API}/api/v1/questions`)
            .send({ ...body, author: theUser.username, imgUrl: theUser.imgUrl ? theUser.imgUrl : theUser.gender === 'male' ? 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' : 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png', date: new Date().toLocaleString() })
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                dispatch(addQuestionsAction(data.body.record))
            }).catch(console.error);
    }
}

export const _deleteQuestion = (_id) => {
    const cookieToken = cookie.load('auth');
    let token = cookieToken || null;
    return (dispatch) => {
        return superagent.delete(`${API}/api/v1/questions/${_id}`)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                dispatch(deleteQuestionAction(_id))
            }).catch(console.error);
    }
}
export const _updateQuestion = (body, _id) => {
    const cookieToken = cookie.load('auth');
    let token = cookieToken || null;
    //
    const userPro = cookie.load('user');
    let theUser = userPro || null;
    return (dispatch) => {
        superagent.put(`${API}/api/v1/questions/${_id}`)
            .send({ ...body, author: theUser.username, imgUrl: theUser.imgUrl ? theUser.imgUrl : theUser.gender === 'male' ? 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' : 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png' })
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                dispatch(updateQuestionsAction({ record: data.body, _id }))
            }).catch(console.error);
    }
}
export const _getAllQuestionsByTag = (tag) => {

    return (dispatch) => {
        return superagent.get(`${API}/api/v1/questions`)
            .accept('application/json')
            .then(data => {
                let sortedQuestions = data.body.records.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                });
                dispatch(searchByTagsAction({ questions: sortedQuestions, tag:tag }))
            }).catch(console.error);
    }
}
export const _searchQuestions = (input) =>{
    return (dispatch)=>{
        return superagent.get(`${API}/api/v1/questions`)
            .accept('application/json')
            .then(data => {
                let sortedQuestions = data.body.records.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                });
                dispatch(searchQuestionsAction({input, questions:sortedQuestions}))
            }).catch(console.error);
    }
}
// ===================ANSWERS=======================
export const _addAnswer = (body, qTitle) => {
    const cookieToken = cookie.load('auth');
    let token = cookieToken || null;
    const userPro = cookie.load('user');
    let theUser = userPro || null;
    return (dispatch) => {
        superagent.post(`${API}/api/v1/answers`)
            .send({ ...body, author: theUser.username, imgUrl: theUser.imgUrl ? theUser.imgUrl : theUser.gender === 'male' ? 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' : 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png', date: new Date().toLocaleString(), questionTitle: qTitle})
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                console.log('data.body', data.body);
                dispatch(addAnswerAction(data.body.record))
            }).catch(console.error);
    }
}
export const getQuestionsAction = (payload) => {
    return {
        type: 'showQuestions',
        payload: payload,
    }
}
export const getQuesDetailsAction = (payload) => {
    return {
        type: 'detailQuestion',
        payload: payload,
    }
}
export const addQuestionsAction = (payload) => {
    return {
        type: 'addQuestion',
        payload: payload,
    }
}

export const deleteQuestionAction = (payload) => {
    return {
        type: 'deleteQuestion',
        payload: payload,
    }
}
export const updateQuestionsAction = (payload) => {
    return {
        type: 'updateQuestion',
        payload: payload,
    }
}
export const searchQuestionsAction = (payload) => {
    return {
        type: 'searchQuestions',
        payload: payload,
    }
}
export const searchByTagsAction = (payload) => {
    return {
        type: 'tagsSearch',
        payload: payload,
    }
}
// ===================ANSWERS=======================
export const addAnswerAction = (payload) => {
    return{
        type: 'addAnswer',
        payload: payload,
    }
}


