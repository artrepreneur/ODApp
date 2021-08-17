import styled from "styled-components";
import { Button, Anchor, Header, Heading, Text } from "grommet";
//import bkgnd from "../cool-background.png";
import defiBefore from "../img/home-discover-before.svg";

export const themefont = {
  global: {
    font: {
      family: "Tahoma",
    }
  }
};

export const themefontNav = {
  global: {
    font: {
      family: "Poppins",
    }
  }
};

export const StyledButton = styled(Button)`
  font-size: 29px;
  line-height: 35px;
  background-color: #FBA300;
  font-weight:300;
  font-family: "Tahoma";
  border:0;
  color:#fff;
  padding-top: 17px;
  padding-bottom: 17px;
  border-radius: 50px;
  `;

export const StyledButton2 = styled(Button)`
  border: none;
  padding: 2vh;
  font-size: 24px;
  line-height: 36px;
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
    //background: #56cde0;
    background-image: url('https://odapp.io/prple.jpg');
    background-repeat: repeat;
    //background-image: url('https://odapp.io/teal.jpg');
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
    background: linear-gradient(70.77deg, #7d4cdb -9.18%, #16144e 120.09%);
    color: white;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    justify-content: none;
    min-height: calc(100vh - 70px);
  `;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Image2 = styled.img`
  height: 5vmin;
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

export const DiscoverBefore = styled.div`
  background-color: #222323;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    background-image: url(${defiBefore});
    width: 100%;
    height: 30vw;
    top: -29vw;
    z-index: 1;
  }
`;

export const HeadingDark = styled(Heading)`
  color: #222323;
  max-width: 100%;
  font-weight: bold;
  font-size: 64px;
  line-height: 77px;
`;  

export const HeadingLight = styled(Heading)`
  color: #fff;
  max-width: 100%;
  font-weight: bold;
  font-size: 64px;
  line-height: 77px;
`;  

export const IdentifierTitle = styled(Text)`
font-weight: 900;
font-size: 36px;
line-height: 52px;
color: #707070;
font-family: "Poppins";
`;

export const StyledTextDark = styled(Text)`
font-size: 28px;
line-height: 34px;
color: #707070;
font-family: "Tahoma";
`;

export const IdentifierSubTitle = styled(Text)`
font-weight: bold;
font-size: 28px;
line-height: 34px;
color: #707070;
font-family: "Tahoma";
text-align: center;
`;

export const IdentifierText = styled(Text)`
font-size: 28px;
line-height: 34px;
font-family: "Tahoma";
text-align: center;
padding: 10px 0;
`;

export const ButtonCTA = styled(Button)`
font-size: 24px;
line-height: 36px;
border-radius: 50px;
font-family: "Tahoma";
color: #fff;
border: 0;
background: #FBA300;
font-weight: 500;
padding: 12px 50px;
margin-right: 20px;
  `;

export const ButtonFooter = styled(Button)`
  font-size: 24px;
  line-height: 36px;
  border-radius: 50px;
  font-family: "Tahoma";
  color: #fff;
  border: 0;
  background: #FBA300;
  font-weight: 500;
  padding: 12px 50px;
  width: 25rem;
  text-align:center;
  `;

export const HeadingDarkSmaller = styled(Heading)`
  color: #222323;
  max-width: 100%;
  font-weight: bold;
  font-size: 54px;
  line-height: 66px;
`;

export const ScrollableText = styled(Text)`
font-size: 26px;
line-height: 32px;
color: #fff;
font-family: "Tahoma";
display: block;
height: 255px;
overflow: auto;
&::-webkit-scrollbar {
  width: 4px;
  background: #fff;
  border-radius: 90px;
}
&::-webkit-scrollbar-track {
  box-shadow: none;
}
&::-webkit-scrollbar-thumb {
  background-color: #FBA300;
  outline: none;
  border-radius: 90px;
}
`;