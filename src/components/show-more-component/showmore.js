import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
// import cookie from 'react-cookies';
import Auth from '../auth/';
// import Show from '../show/';

import { Link } from 'react-router-dom'
import { ButtonGroup, Button, CardHeader, Avatar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { connect } from 'react-redux';
import Show from '../show/index';
import { SignInContext } from '../../context/auth.js';
import { _addAnswer, _getQuestionDetails, _getAllQuestionsByTag, _bookmark, _getAllBookmarked, _deleteQuestion, _updateQuestion, _deleteAns } from '../../store/community-reducer';

import { useHistory } from 'react-router-dom'


import './sm.scss';

// const API = 'https://synhub.herokuapp.com';
const API = 'https://synhub-project.herokuapp.com';

// let token;

// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWIwNWJhYTIyYjgxMDAxNzgzMGFjNSIsInVzZXJuYW1lIjoiSm9obiBEb2UiLCJjYXBhYmlsaXRpZXMiOm51bGwsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5NTYwNjQ1OX0.G1TJfW7kKCFzyXWbo2MKWI87azAxK_g1Gvhgfam4AM0'

function ShowMore(props) {
    const [input, setInput] = useState({})
    const [details, setDetails] = useState({});
    const context = useContext(SignInContext);
    let [bol, setBol] = useState(false);
    const history = useHistory()
    // const [data, setData] = useState({});
    useEffect(() => {
        getQuestionDetails();
        props.getMarked();

    }, [])
    useEffect(() => {
        getQuestionDetails();
    }, [details.answers])
    const getQuestionDetails = () => {
        superagent.get(`${API}/api/v1/questions/${props.match.params.id}`)
            .accept('application/json')
            .then(data => {
                setDetails(data.body.records[0])
            }).catch(console.error);
    }
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         maxWidth: 345,
    //         padding: 15,
    //         border: '#88E766 2px solid',
    //         backgroundColor: '#F8FFF1',
    //     },
    //     avatar: {
    //         backgroundColor: 'black',
    //     },
    //     cardHeader: {
    //         // borderBottom: '#C7FDB4 2px solid',
    //     },
    //     formControl: {
    //         margin: theme.spacing(1),
    //         minWidth: 120,
    //     },
    //     selectEmpty: {
    //         marginTop: theme.spacing(2),
    //     },
    //     root2: {
    //         padding: '2px 4px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         width: 400,
    //         maxHeight: 60,
    //     },
    //     input: {
    //         marginLeft: theme.spacing(1),
    //         flex: 1,
    //     },
    //     iconButton: {
    //         padding: 10,
    //     },
    //     divider: {
    //         height: 28,
    //         margin: 4,
    //     },
    //     paragraph: {
    //         borderBottom: '#C7FDB4 2px solid',
    //     }
    // }));
    // const classes = useStyles();

    // console.log('props.details', props.details);

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        props.add(input, details.title);
        e.target.reset();
        // window.location.reload();
    }
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className='bgBlack'>
                <div className='sign-popup'>
                    <Link to='/community'>
                        <span id='close'>X</span>
                    </Link>
                    <div id='smDiv'>
                        {details ?
                            <>
                                <IconButton onClick={() => { props.bookmark(details); setBol(!bol) }}>
                                    <BookmarkBorderIcon className={`bookmark_${!!(props.bookmarked.filter(val => val.bookmarked._id === details._id).length)}`} />
                                </IconButton>
                                <div id='question'>
                                    <h3>{details.title}</h3>
                                    <h4>{details.date}</h4>
                                    <img className='avatarImg' src={details.imgUrl ? details.imgUrl : '/static/images/avatar/3.jpg'} alt={details.author}></img>

                                    {/* <CardHeader
                                avatar={


                                    <Avatar alt={details.author} src={details.imgUrl ? details.imgUrl : '/static/images/avatar/3.jpg'} title={details.author} />
                                }
                                title={details.title}
                                subheader={details.date}
                                
                            /> */}
                                    <Show condition={context.signedIn && context.user.capabilities ? context.user.username === details.author || context.user.capabilities.role === 'admin' : null}>
                                        <Auth capability='delete' >
                                            {context.user.capabilities ? context.user.username === details.author || context.user.capabilities.role === 'admin' ? <button className="show-more" onClick={() => { props.delete(details._id); setBol(!bol); history.goBack() }}><img className='dlt-btn' src='/assets/showmore/trash.png'></img></button> : null : null}
                                        </Auth>

                                    </Show>

                                    <p>Description: {details.description}</p>

                                    {/* <ButtonGroup size="small" aria-label="small outlined button group"> */}
                                    {/* {details.tags ? details.tags.map(tag => (
                                    <Link to={`/tags/${tag}`} >
                                        <button onClick={() => props.tagsSearch(tag)} key={tag}>{tag}</button>
                                    </Link>

                                )) : null} */}
                                    {/* </ButtonGroup> */}
                                </div>
                            </>
                            : null
                        }
                        <div className='answers'>
                            {details.answers ? details.answers.sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            }).map(oneAns => (

                                <div className='one' key={oneAns._id}>
                                    <h3>{oneAns.title}</h3>
                                    <h4>{oneAns.date}</h4>
                                    <img className='avatarImg' src={oneAns.imgUrl ? oneAns.imgUrl : '/static/images/avatar/3.jpg'} alt={oneAns.author}></img>

                                    {/* <CardHeader
                                    avatar={
                                        <Avatar alt={oneAns.author} src={oneAns.imgUrl ? oneAns.imgUrl : '/static/images/avatar/3.jpg'} title={oneAns.author} />
                                    }
                                    title={oneAns.title}
                                    subheader={oneAns.date} */}

                                    {/* /> */}
                                    {/* <h3> Answer Title: {oneAns.title}</h3>
                        <h4> Answer Author: {oneAns.author}</h4> */}
                                    <p >
                                        Answer Description :
                            {oneAns.description}
                                    </p>
                                    <Auth capability='delete' >
                                        {context.user.capabilities ? context.user.username === oneAns.author || context.user.capabilities.role === 'admin' ? <button className="show-more" onClick={() => props.deleteAns(oneAns._id)}><img className='dlt-btn' src='/assets/showmore/trash.png'></img></button> : null : null}
                                    </Auth>
                                </div>

                            )) : ''}


                        </div>
                        <Show condition={context.signedIn}>
                            <form id='form' onSubmit={handleSubmitAnswer}>
                                <div id='formHeader'>
                                    <label>
                                            <input onChange={handleInputChange} type="text" name="title" placeholder='answer title' />
                                    </label>
                                </div>

                                <div id='formFooter'>
                                <textarea onChange={handleInputChange} name="description" placeholder="answer description.."></textarea>
                                <button id="post-ans">+</button>
                                </div>
                            </form>
                        </Show>
                    </div>
                </div>
            </div>
        </>

    )
}
const mapStateToProps = (state) => {
    return {
        details: state.communityReducer.qDetails,
        bookmarked: state.communityReducer.bookmarked
    }
}
const mapDispatchToProps = (dispatch) => ({
    add: (answer, qTitle) => dispatch(_addAnswer(answer, qTitle)),
    deleteAns: (id) => dispatch(_deleteAns(id)),
    get: (id) => dispatch(_getQuestionDetails(id)),
    delete: (_id) => dispatch(_deleteQuestion(_id)),
    update: (body, _id) => dispatch(_updateQuestion(body, _id)),
    tagsSearch: (tag) => { dispatch(_getAllQuestionsByTag(tag)) },
    bookmark: (body) => dispatch(_bookmark(body)),
    getMarked: () => dispatch(_getAllBookmarked())
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);