import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
height: 280px;
width: 280px;
background: white;
padding: 10px;
margin: 14px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: #71e995;
outline: none;
box-shadow: 0px 16px 0px #71e995;
border: 2px solid #71e995;
border-radius: 50px 50px 50px 50px;
&:hover{
  background: rgba(0,0,0,0.05);
}
`;

const Title = styled.h4`
  color: #71e995;
  text-decoration: none;
  font-size: xx-large;

`;

const BoardThumbnail = ({ title }) => {
  // console.log(title);
  return (
    <Thumbnail id='Thumbnail'>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
