import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth/';
import { SignInContext } from '../../context/auth';
import { _getAllQuestions, _deleteQuestion, _updateQuestion, _searchQuestions, _getAllQuestionsByTag, _bookmark, _getAllBookmarked, _getProfile } from '../../store/community-reducer';


function Profile(props) {
    const featchData = ()=>{
        props.getprofile();
    }
    useEffect(() => {
        featchData(props.match.params.id)
    }, [])
    // console.log('profile', props)
    return (
        <>{
            props.questions.profile
                ?
                <>
                <img alt={props.questions.profile.username} src={props.profile.imgUrl}/>
                <h2>{props.profile.username}</h2>

                </>
        :
                null
        }
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
    tagsSearch: (tag) =>  dispatch(_getAllQuestionsByTag(tag)) ,
    bookmark: (body) => dispatch(_bookmark(body)),
    getMarked: () => dispatch(_getAllBookmarked()),
    getprofile: () => dispatch(_getProfile())

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);