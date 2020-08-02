import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
// import cookie from 'react-cookies';
import { Link } from 'react-router-dom'
import { ButtonGroup, Button, CardHeader, Avatar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { connect } from 'react-redux';
import Show from '../show/index';
import { SignInContext } from '../../context/auth';
import { _addAnswer, _getQuestionDetails, _getAllQuestionsByTag } from '../../store/community-reducer';




// const API = 'https://synhub.herokuapp.com';
const API = 'https://synhub-project.herokuapp.com';

// let token;

// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'

function ShowMore(props) {
    const [input, setInput] = useState({})
    const [details, setDetails] = useState({});
    const context = useContext(SignInContext);
    // const [data, setData] = useState({});
    useEffect(() => {
        getQuestionDetails();
    }, [])

    const getQuestionDetails = () => {
        superagent.get(`${API}/api/v1/questions/${props.match.params.id}`)
            .accept('application/json')
            .then(data => {
                setDetails(data.body.records[0])
            }).catch(console.error);
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            padding: 15,
            border: '#88E766 2px solid',
            backgroundColor: '#F8FFF1',
        },
        avatar: {
            backgroundColor: 'black',
        },
        cardHeader: {
            // borderBottom: '#C7FDB4 2px solid',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        root2: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            maxHeight: 60,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        paragraph:{
            borderBottom: '#C7FDB4 2px solid',
        }
    }));
    const classes = useStyles();

    // console.log('props.details', props.details);

    const handleSubmitAnswer = (e) => {
        // e.preventDefault();
        props.add(input, details.title);
        e.target.reset();
    }
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    return (
        <>
            {details ?
                <>
                    <IconButton >
                        <BookmarkBorderIcon />
                    </IconButton>

                    <CardHeader
                        avatar={


                            <Avatar alt={details.author} src={details.imgUrl ? details.imgUrl : '/static/images/avatar/3.jpg'} title={details.author} />
                        }
                        title={details.title}
                        subheader={details.date}
                        className={classes.cardHeader}
                    />
                    <p>Description: {details.description}</p>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        {details.tags ? details.tags.map(tag => (
                            <Link to={`/tags/${tag}`} >
                                <Button onClick={() => props.tagsSearch(tag)} key={tag}>{tag}</Button>
                            </Link>

                        )) : null}
                    </ButtonGroup>
                </>
                : null
            }
            <div className='answers'>
                {details.answers ? details.answers.map(oneAns => (

                    <div className='one' key={oneAns._id}>
                        <CardHeader
                            avatar={
                                <Avatar alt={oneAns.author} src={oneAns.imgUrl ? oneAns.imgUrl : '/static/images/avatar/3.jpg'} title={oneAns.author} />
                            }
                            title={oneAns.title}
                            subheader={oneAns.date}
                            className={classes.cardHeader}
                        />
                        {/* <h3> Answer Title: {oneAns.title}</h3>
                        <h4> Answer Author: {oneAns.author}</h4> */}
                        <p className={classes.paragraph}>
                            Answer Description :
                            {oneAns.description}
                        </p>
                    </div>


                )) : ''}


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
    tagsSearch: (tag) => { dispatch(_getAllQuestionsByTag(tag)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);
