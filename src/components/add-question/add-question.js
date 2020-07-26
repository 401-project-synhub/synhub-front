import React, { useState, useEffect, useContext } from 'react';
import useAjax from '../../hooks/community-hook';

//context 
import { SignInContext } from '../../context/auth';


export default function AddQuestion(props) {
    const context = useContext(SignInContext);
    const [input, setInput] = useState({})
    const [questions, userInfo, _getAllQuestions, _postQuestion, _getTheUser] = useAjax();
    useEffect(() => {
        _getTheUser(context.user.id)
        console.log('userInfo', userInfo.userInfo);
    }, [])
    const AddQuestionEvent = (e) => {
        e.preventDefault();
        setInput({ ...input, author: e.target.author })
        // setInput({...input,  imgUrl:userInfo.userInfo.imgUrl})

        console.log('input1', input)
        // setInput({ ...input, author: e.target.author.value })
        // console.log('input2', input)

        _postQuestion(input);
    }
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
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

            {/* <input type='hidden' name='userimage' onChange={handleInputChange} /> */}
            <label>
                Name
                {userInfo.userInfo ?
                    < input type='text' name='author' defaultValue={userInfo.userInfo.username} onChange={handleInputChange} />
                 :null}

            </label>



            <button>Submit</button>
        </form>
    )
}