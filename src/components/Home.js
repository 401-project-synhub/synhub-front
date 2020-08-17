import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
import PersonIcon from '@material-ui/icons/Person';
import NavHeader  from './header/navbar/navbar'
import { SignInContext } from '../context/auth';

import './home/home.scss';

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  outline: none;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height:100%
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: #172b4d;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  
  padding: 10px;
  box-sizing: border-box;
  height: 230px;
  width: 230px;
  background: rgba(9,30,66,.04);
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px grey;
  color: #172b4d;
  border: none;
  align-self: center;
  outline: none;
  font-size: large;
  text-align: center;
  padding: 0px;
  opacity: 60%;

`;

const Home = ({ boards, boardOrder, dispatch }) => {
  const context = useContext(SignInContext)
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = e => {
    setNewBoardTitle(e.target.value);

  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    return boardOrder ? boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/todo/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    }) : null;
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <CreateInput id='createInput'
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your new board's title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <>
      <NavHeader />
      <div id='trello-home'>
        <div id='trello-header'>
          <PersonIcon fontSize="large" />
          <h1 id='trello-title'>Your Boards</h1>
        </div>
        <HomeContainer>
          <Thumbnails>{renderBoards()}</Thumbnails>
          {renderCreateBoard()}
        </HomeContainer>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);
