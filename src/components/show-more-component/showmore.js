import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
// import cookie from 'react-cookies';
import { connect } from 'react-redux';
import Show from '../show/index';
import { SignInContext } from '../../context/auth';
import { _addAnswer, _getQuestionDetails } from '../../store/community-reducer';




// const API = 'https://synhub.herokuapp.com';
const API = 'https://synhub-project.herokuapp.com';

// let token;

// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'

function ShowMore(props) {
    const context = useContext(SignInContext);
    // const [data, setData] = useState({});
    useEffect(() => {
        // fetchData(props.match.params.id)
        // setData(props.details)
        getQuestionDetails();
        // const cookieToken = cookie.load('auth');
        // token = cookieToken || null;
    }, [])
    // const fetchData = (id) => {
    //     props.get(id)
    // }
    const [details, setDetails] = useState({});
    const getQuestionDetails = () => {
        superagent.get(`${API}/api/v1/questions/${props.match.params.id}`)
            .accept('application/json')
            .then(data => {
                setDetails(data.body.records[0])
            }).catch(console.error);
    }
    console.log('data',props.match);
    // console.log('datadata',data);

    // console.log('props.details', props.details);
    const [input, setInput] = useState({})

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        props.add(input, props.details.title);
        e.target.reset();
    }
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    return (
        <>
        {details ?
            <>
                <h2>Question Title :{details.title}</h2>
                <h3>Question Author :{details.author}</h3>
                <p>Description: {details.description}</p>
            </>
            : null
            }
            <div className='answers'>
                {details.answers ? details.answers.map(oneAns => (
                    <div className='one' key={oneAns._id}>
                        <h3> Answer Title: {oneAns.title}</h3>
                        <h4> Answer Author: {oneAns.author}</h4>
                        <p>
                            Answer Description
                            {oneAns.description}
                        </p>
                    </div>


                )) : ''}

                <ul><li>
                    Tags
                </li>
                    {details.tags ? details.tags.map(oneTag => (
                        <li key={oneTag}>
                            {oneTag}
                        </li>
                    )) : ''}
                </ul>

            </div>
            <Show condition={context.signedIn}>
                <form onSubmit={handleSubmitAnswer}>
                    <legend>add your answer</legend>
                    <label>
                        Title
                    <input onChange={handleInputChange} type="text" name="title" />
                    </label>
                    <textarea onChange={handleInputChange} name="description" placeholder="answer description.."></textarea>
                    <button id="post-ans">Post Answer</button>
                </form>
            </Show>
            </>

    )
}
const mapStateToProps = (state) => {
    return { details: state.communityReducer.qDetails }
}
const mapDispatchToProps = (dispatch) => ({
    add: (answer, qTitle) => dispatch(_addAnswer(answer, qTitle)),
    get: (id) => dispatch(_getQuestionDetails(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);
