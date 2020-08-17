import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { _addQuestion } from '../../store/community-reducer';
import { SignInContext } from '../../context/auth.js';

import './add-question.scss';

function AddQuestion(props) {
    const [input, setInput] = useState({})
    const context = useContext(SignInContext)
    const AddQuestionEvent = (e) => {
        e.preventDefault();
        props.add(input);
        e.target.reset();
    }
    const handleInputChange = (e) => {
        if (e.target.name === 'tags') {
            let theTags = e.target.value.toLowerCase().split(' ');

            setInput({ ...input, [e.target.name]: theTags });

        } else {

            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className='bgBlack'>
            <div className='sign-popup2'>
                <span id='close' onClick={context.changeOpen2}>X</span>
                <form id='qform' onSubmit={AddQuestionEvent} >
                    <label>
                        Title
            <input type='text' name='title' onChange={handleInputChange} />

                    </label><br />
                    <label>
                        Tags
            <input type='text' name='tags' multiple onChange={handleInputChange} />
                    </label><br />
            <textarea placeholder='Add description' name='description' onChange={handleInputChange}></textarea>
                    <br />
                    <button>Add</button>
                </form>
            </div>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        question: state.communityReducer,
    }
}
const mapDispatchToProps = (dispatch) => ({
    add: (body) => dispatch(_addQuestion(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);