import React, { useState, useEffect, useContext } from 'react';
import {connect} from 'react-redux';
import {_addQuestion} from '../../store/community-reducer';
import useAjax from '../../hooks/community-hook';

//context 
import { SignInContext } from '../../context/auth';


function AddQuestion(props) {
    const context = useContext(SignInContext);
    const [input, setInput] = useState({})
    const [questions, userInfo, _getAllQuestions, _postQuestion, _getTheUser] = useAjax();
    useEffect(() => {
        _getTheUser(context.user.id)
        // console.log('userInfo', userInfo.userInfo);
    }, [])
    const AddQuestionEvent = (e) => {
        e.preventDefault();
        // console.log('username', userInfo.userInfo.username)

        setInput({ ...input, author: userInfo.userInfo.username,  imgUrl:userInfo.userInfo.imgUrl })
        // setInput({...input,  imgUrl:userInfo.userInfo.imgUrl})

        // console.log('newQuestion', props.question.newQuestion)
        // setInput({ ...input, author: e.target.author.value })
        console.log('input2', input)

        props.add(input);
    }
    const handleInputChange = (e) => {
        if(e.target.name === 'tags'){
           let theTags = e.target.value.split(' ');
            setInput({ ...input, [e.target.name]: theTags });

        }else{

            setInput({ ...input, [e.target.name]: e.target.value });
        }
        // console.log(input)
    };

    return (
        <form onSubmit={AddQuestionEvent}>
            <label>
                Title
            <input type='text' name='title' onChange={handleInputChange} />

            </label><br />
            <label>
                Tags
            <input type='text' name='tags' multiple onChange={handleInputChange} />
            </label><br />
            <label>
                Question Description
            <textarea placeholder='Add description' name='description' onChange={handleInputChange}></textarea>
            </label><br />
            <label>
                Image
            {userInfo.userInfo ?
                    <input type='hidden' name='userimage' onChange={handleInputChange} defaultValue={userInfo.userInfo.imgUrl} /> 
                    : null}
            </label>
            <label>
                Name
                {userInfo.userInfo ?
                    < input type='hidden' name='author' defaultValue={userInfo.userInfo.username} onChange={handleInputChange} />
                    : null}

            </label>



            <button>Submit</button>
        </form>
    )
}
const mapStateToProps = (state) =>{
    console.log('communityReducer',state.communityReducer)
    return {
        question: state.communityReducer,
    }
}
const mapDispatchToProps = (dispatch) =>({
    add: (body)=> dispatch(_addQuestion(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);