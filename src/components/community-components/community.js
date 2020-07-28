import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';



import { _getAllQuestions} from '../../store/community-reducer';
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
    const fetchData = () => {
        props.get();
      };
    useEffect(() => {
        fetchData();
        // _getTheUserId().then(res=>{
        //     console.log(res)
        //     _getTheUserImg(res.id);
        // })
    }, [])
    // console.log('userId',userId);
    // console.log('questions', questions);
    // console.log('props.questions', props.questions);
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
    // console.log('props.questions.questions',props.questions.questions)
    const classes = useStyles();
    return (
        <>
            <Link to ='/addquestion'>
                <button className="show-more">Add Question</button>
            </Link>
            <div className="container">
                {props.questions.questions.map(oneQuestion => (
                    <Card className={classes.root} key={oneQuestion._id}>
                        <CardHeader
                            avatar={
                                <Avatar alt={oneQuestion.author} src={oneQuestion.imgUrl?oneQuestion.imgUrl:'/static/images/avatar/3.jpg'} title={oneQuestion.author} />
                            }
                            title={oneQuestion.title}
                            subheader="September 14, 2016"
                            className={classes.cardHeader}
                        />
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
                    </Card>
                ))}
            </div>
        </>
    );
}
const mapStateToProps = (state) =>{
    // console.log('communityReducer',state.communityReducer)
    return {

        questions: state.communityReducer
    }
}
const mapDispatchToProps = (dispatch) =>({
    get: ()=> dispatch(_getAllQuestions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Community);