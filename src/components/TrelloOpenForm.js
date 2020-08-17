import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';

const TrelloOpenForm = ({ list, children, onClick }) => {
  const buttonTextOpacity = list ? 1 : 0.5;
  const buttonTextColor = list ? "#68746f" : "inherit";
  const buttonTextBackground = list ? "white" : "inherit";

  const OpenFormButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 20px 20px 20px 20px;
    height: 36px;
    margin-left: 8px;
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
    opacity: ${buttonTextOpacity};
    color: ${buttonTextColor};
    background-color: ${buttonTextBackground};
  `;

  return (
    <OpenFormButton onClick={onClick}>
      <AddIcon>add</AddIcon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

export default TrelloOpenForm;
