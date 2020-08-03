import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
height: 280px;
width: 280px;
background: #64ccb4;
padding: 10px;
margin: 8px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-radius: 3px;
box-shadow: 0 2px 4px grey;
color: white;
outline: none;
`;

const Title = styled.h4`
  color: white;
  text-decoration: none;
  font-size: xx-large;

`;

const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <Thumbnail id='Thumbnail'>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
