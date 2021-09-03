import styled from "styled-components";
import { Button, Anchor, Header } from "grommet";
//import bkgnd from "../cool-background.png";


export const StyledButton = styled(Button)`
  font-weight: bold;
  background-color: #F0B90C;
  `;

export const StyledButton2 = styled(Button)`
  font-weight: bold;
  border: none;
  padding: 2vh;
  `;  

export const StyledAnchor = styled(Anchor)`
  font-weight: bold;
  &:hover {
    color: #6c5dd3;
    text-decoration: none;
  }
  `;

export const StyledHeader = styled(Header)`
  background: linear-gradient(102.77deg, #7A48D9 -9.18%, #ffffff 200.09%);
  height: 30%;
  display: flex;
  flex-direction: row;

`;


export const Body = styled.body`
  align-items: left;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;

export const BodyCentered = styled.body`
  padding-top: 0px;
  align-items: center;
  background: linear-gradient(70.77deg, #56cde0 -9.18%, #f0ba30 120.09%);
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;


export const BodyCenteredAlt = styled.body`
    padding-top: 0vh;
    padding-bottom: 0vh;
    align-items: center;
    //background: #B9D9EB;
    background-image: url('https://odapp.io/top-banner.f59e4373.png');
    //background-image: url('https://odapp.io/prple.jpg');
    background-repeat: repeat;
    //background: linear-gradient(70.77deg, #c2f4ad -9.18%, #56e59c 120.09%); 
    //background: linear-gradient(70.77deg, #56cde0 -9.18%, #ffffff 80.09%);
    background-size: cover;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    justify-content: center;
    min-height: calc(100vh - 70px);
  `;

export const BodyCenteredAlt2 = styled.body`
    padding-top: 0vh;
    padding-bottom: 0vh;
    align-items: center;
    //background: linear-gradient(70.77deg, #7d4cdb -9.18%, #16144e 120.09%);
    background-image: url('https://odapp.io/top-banner.f59e4373.png');
    background-size: cover;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    justify-content: center;
    min-height: calc(100vh - 70px);
  `;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Image2 = styled.img`
  height: 6vmin;
  margin-bottom: 0px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const darkCard = styled.body`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  margin: 0px;
  @media all and (max-width: 1240px) {
    flex-direction: column;
  }
`;




