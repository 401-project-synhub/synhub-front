import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth/';
import { SignInContext } from '../../context/auth';
import { _getAllQuestions, _deleteQuestion, _updateQuestion, _searchQuestions } from '../../store/community-reducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './community.scss';

function Community(props) {
    const [input, setInput] = useState({})
    let [underUpdating, setUnderUpdating] = useState(false);
    let [questionID, setQuestionID] = useState('');
    let [choice, setChoice] = useState('date');
    let [searchInp, setSearchInp] = useState('');

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
        props.search(searchInp);
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
    }, [])
    const toggle = (e) => {
        setUnderUpdating(!underUpdating);
        setQuestionID(e.target.id);
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
            <div className="container">
                <Link to='/addquestion'>
                    <button className="show-more">Add Question</button>
                </Link>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        className={classes.selectEmpty}
                        value={choice}
                        name="date"
                        onChange={handleChoiceChange}
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="" disabled>
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
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                {props.questions.questions.map(oneQuestion => (
                    
                    <Card className={classes.root} key={oneQuestion._id}>

                        <Link to={`/details/${oneQuestion._id}`}>
                            <CardHeader
                                avatar={
                                    <Avatar alt={oneQuestion.author} src={oneQuestion.imgUrl ? oneQuestion.imgUrl : '/static/images/avatar/3.jpg'} title={oneQuestion.author} />
                                }
                                title={oneQuestion.title}
                                subheader={oneQuestion.date}
                                className={classes.cardHeader}
                            />
                            </Link>

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
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {oneQuestion.description}
                                        </Typography>
                                    </CardContent>

                                    {/* <button className="show-more">Show More</button> */}
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        {oneQuestion.tags.map(tag => (
                                            <Button key={tag}>{tag}</Button>

                                        ))}
                                    </ButtonGroup>
                                </>
                            }
                            <Auth capability='delete' >
                                {context.user.capabilities ? context.user.username === oneQuestion.author || context.user.capabilities.role === 'admin' ? <button className="show-more" onClick={() => props.delete(oneQuestion._id)}>Delete Question</button> : null : null}
                            </Auth>
                            <Auth capability='update' >
                                {context.user.capabilities ? context.user.username === oneQuestion.author ? <button className="show-more" onClick={toggle} id={oneQuestion._id}>Edit</button> : null : null}
                            </Auth>
                        </Card>

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
    search: (input) => dispatch(_searchQuestions(input))
});
export default connect(mapStateToProps, mapDispatchToProps)(Community);