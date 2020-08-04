import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth/';
import { SignInContext } from '../../context/auth';
import { _getAllQuestions, _deleteQuestion, _updateQuestion, _searchQuestions, _getAllQuestionsByTag, _bookmark, _getAllBookmarked, _getProfile } from '../../store/community-reducer';


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './profile.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function Profile(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const featchData = () => {
        props.getprofile();
    }
    useEffect(() => {
        featchData(props.match.params.id)
    }, [])
    console.log('profile', props)
    return (
        <>
            <div className='user-info'>
                <div className='img-container'>
                    <img className='profile-img' alt={props.questions.profile.username} src={props.profile.imgUrl ? props.profile.imgUrl : props.profile.gender === 'male' ? 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' : 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407__340.png'} />
                </div>
                <div className='name'>
                    <h2>User Name : {props.profile.username}</h2>
                    <h3>Rank : {props.profile.answers.length < 10 ? 'not Pro' : 'Pro'}</h3>
                </div>
            </div>
            <div className={classes.root}>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Bookmarked Questions</Typography>
                        <Typography className={classes.secondaryHeading}> Number Of marked Questions :{props.profile.bookmarks.length}</Typography>
                    </AccordionSummary>
                    {props.profile.bookmarks.map(book =>
                        // <div>
                            <Link to={`/community/details/${book.bookmarked.id}`}  key={book.id}>
                                <AccordionDetails>
                                    <Typography>Question Title : {book.bookmarked.title}</Typography>
                                </AccordionDetails>
                            </Link>
                        // </div>
                    )}
                </Accordion>

                <Accordion expanded={expanded === 'myQuestions'} onChange={handleChange('myQuestions')} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>My Questions</Typography>
                        <Typography className={classes.secondaryHeading}> Number Of My Questions :{props.profile.questions.length}</Typography>
                    </AccordionSummary>
                    {/* <span>
                        My Questions {props.profile.questions.length}
                    </span> */}
                    {props.profile.questions.map(oneQ =>
                        <div key={oneQ.id}>
                            <Link to={`/community/details/${oneQ.id}`}>
                                <AccordionDetails>
                                    <Typography>Question Title : {oneQ.title}</Typography>
                                </AccordionDetails>
                            </Link>

                        </div>
                    )}
                </Accordion>


                <Accordion expanded={expanded === 'myAnswers'} onChange={handleChange('myAnswers')} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>My Answers</Typography>
                        <Typography className={classes.secondaryHeading}> Number Of My Answers :{props.profile.answers.length}</Typography>
                    </AccordionSummary>

                    {props.profile.answers.map(oneA =>
                        <div key={oneA.id}>
                            <Link to={`/community/details/${props.questions.questions.filter(val => oneA.questionTitle === val.title)[0]._id}`}>
                                <AccordionDetails>
                                    <Typography>Question Title : {oneA.questionTitle}</Typography>
                                </AccordionDetails>
                            </Link>
                        </div>
                    )}
                </Accordion>

            </div>


        </>
    )
}
const mapStateToProps = (state) => {
    return {
        questions: state.communityReducer,
        profile: state.communityReducer.profile
    }
}
const mapDispatchToProps = (dispatch) => ({
    get: (choice) => dispatch(_getAllQuestions(choice)),
    delete: (_id) => dispatch(_deleteQuestion(_id)),
    update: (body, _id) => dispatch(_updateQuestion(body, _id)),
    search: (input) => dispatch(_searchQuestions(input)),
    tagsSearch: (tag) => dispatch(_getAllQuestionsByTag(tag)),
    bookmark: (body) => dispatch(_bookmark(body)),
    getMarked: () => dispatch(_getAllBookmarked()),
    getprofile: () => dispatch(_getProfile())

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);