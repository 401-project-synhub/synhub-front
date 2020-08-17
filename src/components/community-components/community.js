import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth/';
import Show from '../show/'
import { SignInContext } from '../../context/auth';
import { _getAllQuestions, _deleteQuestion, _updateQuestion, _searchQuestions, _getAllQuestionsByTag, _bookmark, _getAllBookmarked } from '../../store/community-reducer';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AddQuestion from '../add-question/add-question';

import RoomsForm from '../code-together/rooms-from/rooms-from';

import Header from '../header/header.js';
import './community.scss';

function Community(props) {
    const [input, setInput] = useState({})
    let [underUpdating, setUnderUpdating] = useState(false);
    let [questionID, setQuestionID] = useState('');
    let [choice, setChoice] = useState('date');
    let [searchInp, setSearchInp] = useState('');
    let [bol, setBol] = useState(false);
    let [addShow, setAddShow] = useState(false);

    const onButtonClick = () => {

        setAddShow(!addShow);

    }

    const updateQuestionEvent = (e) => {
        e.preventDefault();
        props.update(input, e.target.id);
        setUnderUpdating(!underUpdating);
    }
    const handleInputChange = (e) => {
        if (e.target.name === 'tags') {
            let theTags = e.target.value.split(',');
            setInput({ ...input, [e.target.name]: theTags });

        } else {

            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };

    const handleSearchChange = (e) => {
        setSearchInp(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInp !== '') {
            props.search(searchInp);
        }
        e.target.reset();
        console.log('searchInp', searchInp);
    }
    const context = useContext(SignInContext);
    const fetchData = (choice) => {
        props.get(choice);
    };
    useEffect(() => {
        props.get(choice);
    }, [choice])

    useEffect(() => {
        fetchData('date');
        props.getMarked();
    }, [])


    const toggle = (e) => {
        console.log('hola');
        setUnderUpdating(!underUpdating);
        setQuestionID(e.target.id);
        console.log('joho', e.target)
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
            borderBottom: '#C7FDB4 2px solid',
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
    }));
    const classes = useStyles();
    const handleChoiceChange = (e) => {
        const name = e.target.value;
        setChoice(name);
    };

    return (
        <>
            <Header />
            <Show condition={context.open}>
                <RoomsForm />
            </Show>
            <div id='control'>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        className='selectEmpty'
                        value={choice}
                        name="date"
                        onChange={handleChoiceChange}
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="" >
                            Sort By
                        </option>
                        <option value={'date'}>Date</option>
                        <option value={'title'}>Title</option>
                    </NativeSelect>
                </FormControl>
                <Paper onSubmit={handleSearchSubmit} component="form" className={classes.root2}>
                    <InputBase
                        onChange={handleSearchChange}
                        className={classes.input}
                        placeholder="Search Questions"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <Link to={`/search/${searchInp}`}>
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Link>
                </Paper>
                <Auth capability='read' >
                    {/* <button className="show-more" onClick={onButtonClick}><img src='/assets/community/add.png' alt='add question'></img>Add Question</button>
                        <Show condition={addShow}>
                            <AddQuestion />
                        </Show> */}
                    <button className="show-more" onClick={context.changeOpen2}><img src='/assets/community/add.png' alt='add question'></img>Add Question</button>
                    <Show condition={context.open2}>
                        <AddQuestion />
                    </Show>

                </Auth>
            </div>
            <div id='cards'>
                {props.questions.questions.map(oneQuestion => (
                    <>
                        <div id='card'>
                            <div id='cloud'>
                                <Auth capability='delete' >
                                    <IconButton id='bookmark' onClick={() => { props.bookmark(oneQuestion); setBol(!bol) }}>
                                        <BookmarkBorderIcon className={`bookmark_${!!(props.questions.bookmarked.filter(val => val.bookmarked._id === oneQuestion._id).length)}`} />
                                    </IconButton>
                                </Auth>
                                <Auth capability='delete' >
                                    {context.user.capabilities ? context.user.username === oneQuestion.author || context.user.capabilities.role === 'admin' ?
                                        <IconButton id='delete' onClick={() => { props.delete(oneQuestion._id) }}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                        : null : null}
                                </Auth>
                                <Auth capability='update' >
                                    {context.user.capabilities ? context.user.username === oneQuestion.author ?
                                        <IconButton id={'edit'} onClick={toggle} >
                                            <EditIcon />
                                        </IconButton>
                                        : null : null}
                                </Auth>
                            </div>
                            <div id='card-header'>
                                <div id='card-header-avatar'>
                                    <img alt='avatar' src={oneQuestion.imgUrl}></img>
                                </div>
                                <div id='card-header-text'>
                                    <h3>{oneQuestion.title}</h3>
                                    <h4>{oneQuestion.date}</h4>
                                </div >
                            </div>
                            <div id='card-body'>

                                {underUpdating && context.user.username === oneQuestion.author && questionID === oneQuestion._id
                                    ?
                                    <form onSubmit={updateQuestionEvent} id={oneQuestion._id}>
                                        <input type='text' defaultValue={oneQuestion.title} name='title' onChange={handleInputChange} />
                                        <input type='text' defaultValue={oneQuestion.description} name='description' onChange={handleInputChange} />
                                        <input type='text' defaultValue={oneQuestion.tags} name='tags' onChange={handleInputChange} />
                                        <button className="show-more"> Save</button>
                                    </form>
                                    :
                                    <>
                                        <div id='card-body-description'>
                                            <p>{oneQuestion.description.slice(0, 100)}...</p>
                                        </div>
                                        <div id='card-body-clickables' >
                                            <div id='card-body-clickables-tags'>
                                                {oneQuestion.tags.map(tag => (
                                                    <Link to={`/tags/${tag}`} >
                                                        <button className='tag-btn' onClick={() => props.tagsSearch(tag)} key={tag}>{tag}</button>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div id='card-body-clickables-button' key={oneQuestion.title}>
                                                <Link to={`/community/${oneQuestion._id}`}>
                                                    <button className='show-btn'>Show More</button>

                                                </Link>
                                            </div>

                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                ))}

            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        questions: state.communityReducer
    }
}
const mapDispatchToProps = (dispatch) => ({
    get: (choice) => dispatch(_getAllQuestions(choice)),
    delete: (_id) => dispatch(_deleteQuestion(_id)),
    update: (body, _id) => dispatch(_updateQuestion(body, _id)),
    search: (input) => dispatch(_searchQuestions(input)),
    tagsSearch: (tag) => { dispatch(_getAllQuestionsByTag(tag)) },
    bookmark: (body) => dispatch(_bookmark(body)),
    getMarked: () => dispatch(_getAllBookmarked())
});
export default connect(mapStateToProps, mapDispatchToProps)(Community);