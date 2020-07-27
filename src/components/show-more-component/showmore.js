import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import cookie from 'react-cookies';



const API = 'https://synhub.herokuapp.com';
let token;

// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'

export default function ShowMore({ match }) {

    useEffect(() => {
        getQuestionDetails();
        const cookieToken = cookie.load('auth');
        token = cookieToken || null;
    }, [])
    const [details, setDetails] = useState({});
    const getQuestionDetails = () => {
        superagent.get(`${API}/api/v1/questions/${match.params.id}`)
            .accept('application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(data => {
                // console.log('data', data.body.records)
                setDetails(data.body.records[0])
            }).catch(console.error);
    }
    return (
        <>
            <h2>{details.title}</h2>
            <h3>{details.author}</h3>
            <p>{details.description}</p>
            <div className='answers'>
                {details.answers ? details.answers.map(oneAns => (
                    <div className='one' key={oneAns._id}>
                        <h3>{oneAns.title}</h3>
                        <h4>{oneAns.author}</h4>
                        <p>
                            {oneAns.description}
                        </p>
                    </div>


                )) : ''}

                <ul>
                    {details.tags ? details.tags.map(oneTag => (
                        <li key={oneTag}>
                            {oneTag}
                        </li>
                    )) : ''}
                </ul>

            </div>
        </>
    )
}