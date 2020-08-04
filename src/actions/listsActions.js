import { CONSTANTS } from "../actions";
import {v4} from "uuid";

export const addList = title => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    const id = v4();
    dispatch({
      type: CONSTANTS.ADD_LIST,
      payload: { title, boardID, id }
    });
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

export const editTitle = (listID, newTitle) => {
  return {
    type: CONSTANTS.EDIT_LIST_TITLE,
    payload: {
      listID,
      newTitle
    }
  };
};

export const deleteList = listID => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    return dispatch({
      type: CONSTANTS.DELETE_LIST,
      payload: {
        listID,
        boardID
      }
    });
  };
};
