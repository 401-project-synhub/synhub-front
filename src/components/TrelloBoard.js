import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link, NavLink} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';


import Show from './show/'
import { SignInContext } from '../context/auth';

import './style.scss'
const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;


class TrelloBoard extends PureComponent {
  static contextType = SignInContext;
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;

    return (
      <>
        <div className='navheader'>
          <nav >
            <ul>
              <NavLink className='link' to='/'>Home</NavLink>

              <NavLink className='link' to='/community'>Community</NavLink>
              <Show condition={this.context.signedIn}>
                <a className='link' onClick={this.context.changeOpen} style={{ cursor: 'pointer' }} href>Code Together</a>
              </Show>

              <NavLink className='link' to='/todo'>Task Manager</NavLink>
            </ul>
          </nav>
        </div>
        <div id='board'>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Link to="/todo" id='yourBoards-link'></Link>
            <div id='list-title'>
              <DashboardIcon fontSize="large" />
              <h2 id='title'>{board.title}</h2>
            </div>


            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <ListsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listOrder.map((listID, index) => {
                    const list = lists[listID];
                    if (list) {
                      const listCards = list.cards.map(cardID => cards[cardID]);

                      return (
                        <TrelloList id='list'
                          listID={list.id}
                          key={list.id}
                          title={list.title}
                          cards={listCards}
                          index={index}
                        />
                      );
                    }
                  })}
                  {provided.placeholder}
                  <TrelloCreate list />
                </ListsContainer>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(TrelloBoard);
