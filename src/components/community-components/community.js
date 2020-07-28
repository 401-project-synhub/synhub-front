import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth/';
import { SignInContext } from '../../context/auth';




import { _getAllQuestions, _deleteQuestion, _updateQuestion } from '../../store/community-reducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// import Grid from '@material-ui/core/Grid';




//import sass 
import './community.scss';



function Community(props) {
    const [input, setInput] = useState({})
    let [underUpdating, setUnderUpdating] = useState(false);

    const updateQuestionEvent = (e) => {
        e.preventDefault();
        // console.log(e.target.id)
        props.update(input, e.target.id);
        setUnderUpdating(!underUpdating);
    }
    const handleInputChange = (e) => {
        if(e.target.name === 'tags'){
           let theTags = e.target.value.split(',');
            setInput({ ...input, [e.target.name]: theTags });

        }else{

            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };

    const context = useContext(SignInContext);
    const fetchData = () => {
        props.get();
    };

    useEffect(() => {
        fetchData();

    }, [])
    const toggle = () => {
        setUnderUpdating(!underUpdating);
        // console.log(underUpdating)
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
    }));
    const classes = useStyles();
    return (
        <>
            <Link to='/addquestion'>
                <button className="show-more">Add Question</button>
            </Link>
            <div className="container">
                {props.questions.questions.map(oneQuestion => (

                    <Card className={classes.root} key={oneQuestion._id}>

                        <CardHeader
                            avatar={
                                <Avatar alt={oneQuestion.author} src={oneQuestion.imgUrl ? oneQuestion.imgUrl : '/static/images/avatar/3.jpg'} title={oneQuestion.author} />
                            }
                            title={oneQuestion.title}
                            subheader="September 14, 2016"
                            className={classes.cardHeader}
                        />
                        {underUpdating && context.user.username === oneQuestion.author
                            ?
                            <form onSubmit={updateQuestionEvent} id={oneQuestion._id}>
                                <input type='text' defaultValue={oneQuestion.title} name='title' onChange={handleInputChange}/>
                                <input type='text' defaultValue={oneQuestion.description} name='description' onChange={handleInputChange}/>
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

                                <Link to={`/details/${oneQuestion._id}`}>
                                    <button className="show-more">Show More</button>
                                </Link>
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
                            {context.user.capabilities ? context.user.username === oneQuestion.author ? <button className="show-more" onClick={toggle}>Edit</button> : null : null}
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
    get: () => dispatch(_getAllQuestions()),
    delete: (_id) => dispatch(_deleteQuestion(_id)),
    update: (body, _id) => dispatch(_updateQuestion(body, _id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Community);