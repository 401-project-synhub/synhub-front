import React, { useState } from 'react';
import {connect} from 'react-redux';
import {_addQuestion} from '../../store/community-reducer';


function AddQuestion(props) {
    const [input, setInput] = useState({})

    const AddQuestionEvent = (e) => {
        e.preventDefault();
        props.add(input);
        e.target.reset();
    }
    const handleInputChange = (e) => {
        if(e.target.name === 'tags'){
           let theTags = e.target.value.toLowerCase().split(' ');
           
            setInput({ ...input, [e.target.name]: theTags });

        }else{

            setInput({ ...input, [e.target.name]: e.target.value });
        }
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
            {/* <label>
                Image
            {userInfo.userInfo ?
                    <input type='hidden' name='userimage' onChange={handleInputChange} defaultValue={userInfo.userInfo.imgUrl} /> 
                    : null}
            </label> */}
            {/* <label>
                Name
                {userInfo.userInfo ?
                    < input type='hidden' name='author' defaultValue={userInfo.userInfo.username} onChange={handleInputChange} />
                    : null}
            </label> */}



            <button>Submit</button>
        </form>
    )
}
const mapStateToProps = (state) =>{
    // console.log('communityReducer',state.communityReducer)
    return {
        question: state.communityReducer,
    }
}
const mapDispatchToProps = (dispatch) =>({
    add: (body)=> dispatch(_addQuestion(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);