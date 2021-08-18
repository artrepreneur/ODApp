import React, { useContext } from "react";
import { Card, CardBody, CardHeader, Anchor, Box, Text, Grid, ResponsiveContext, Image, Grommet, Heading } from "grommet";
import banner_bg from "../img/main-page/top-banner.png";
import mm_logo from "../img/metamask-illustration.svg";
import iw_logo from "../img/introducing-WPKT-logo.png";
import bridge_bg from "../img/introducing-WPKT.jpg";
import od_logo from "../img/whats_odapp.png";
import icon_bridging from "../img/home_services/icon_bridging.svg";
import icon_trading from "../img/home_services/icon_trading.svg";
import icon_defi from "../img/home_services/icon_defi.svg";
import icon_arbitrage from "../img/home_services/icon_arbitrage.svg";
import defi from "../img/defi-illustration.svg";
import logo_01 from "../img/support/pktpal.svg";
import logo_02 from "../img/support/binance.svg";
import logo_03 from "../img/support/pancake-swap.svg";
import logo_04 from "../img/support/anode.svg";
import join_bg from "../img/join_bg.svg";
import icon_01 from "../img/icons/icon-pkt.svg";
import icon_02 from "../img/icons/icon-twitter.svg";
import icon_03 from "../img/icons/icon-telegram.svg";
import icon_04 from "../img/icons/icon-funny.svg";
import { themefont, DiscoverBefore, ScrollableText } from ".";
import {HeadingDark , HeadingLight, ButtonRegularAlt, ButtonRegular, HeadingDarkSmaller, IdentifierTitle, IdentifierSubTitle, IdentifierText} from ".";

/*import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import addresses from "./abi/addresses";
import abis from "./abi/abis";
import Web3 from "web3";*/

/*var provider;
var signer;
var WPKT; 
var supply = 0;


async function getSupply() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  WPKT = new Contract(addresses.WPKT, abis.WPKT, signer); 
  var supply = await WPKT._currentSupply();
  var supplyNoWei = Web3.utils.fromWei(supply.toString());
  console.log('supply:', parseFloat(supplyNoWei).toFixed(2));
  supply = Math.round(supplyNoWei*1000000000)/1000000000;
  var dv = document.getElementById("spply");
  dv.style.display= 'block';
  dv.innerHTML = "Total WPKT Supply To Date: "+Math.round(supplyNoWei*1000000000)/1000000000+" Minted";
  return supply;
} */

var bannerStyle = {
  backgroundImage: 'url(' + banner_bg + ')',
  backgroundColor: '#222323',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundAttachment: 'fixed'
};

var wpktStyle = {
  backgroundImage: 'url(' + bridge_bg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundAttachment: 'fixed'
};

var joinStyle = {
  backgroundImage: 'url(' + join_bg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundSize: 'cover'
};

var defiColumnStyle = {
  backgroundImage: 'url(' + defi + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: 'cover'
};


function Home( {btn} ) {
  //getSupply();

  const size = useContext(ResponsiveContext);
  //const cards = ['Bridge PKTC Cash onto Ethereum','Trade PKTC Cash on Uniswap. Yield Farm, stake and more.'];

  const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="medium" align="center" {...rest}>
      {children}
      <Box>
        <IdentifierTitle size={size} weight="bold" alignSelf="center">{title}</IdentifierTitle>
        <IdentifierSubTitle size={size} alignSelf="center">{subTitle}</IdentifierSubTitle>
      </Box>
    </Box>
  );

  const data = [
    {
      color: '#F9F9F9',
      icon: icon_bridging,
      title: 'Bridging',
      subTitle: 'Convert PKT Cash on Binance Smart Chain',
      message: 'When you swap PKT for WPKT you gain access to the world of BEP20.'
    },
    {
      color: '#F9F9F9',
      icon: icon_trading,
      title: 'Trading',
      subTitle: 'Trade PKT Cash on Pancake Swap with WPKT',
      message: 'With WPKT you can swap PKT to BNB or any other pair on Pancake Swap.'
    },
    {
      color: '#F9F9F9',
      icon: icon_defi,
      title: 'DeFi',
      subTitle: 'WPKT provides access to decentralized finance (DeFi) and more',
      message: 'Participate in yield farming, staking, liquidity pools or whatever flavor of DeFi you desire.'
    },
    {
      color: '#F9F9F9',
      icon: icon_arbitrage,
      title: 'Arbitrage',
      subTitle: 'Arbitrage WPKT against PKT',
      message: 'Take advantage of price inefficiencies between decentralized and centralized exchanges.'
    }
  ];
  
  const theme = {
    global: {
      font: {
        family: "Tahoma",
      },
      colors: {
        blue: '#00C8FF',
        green: '#17EBA0',
        teal: '#82FFF2',
        purple: '#F740FF',
        red: '#FC6161',
        orange: '#FFBC44',
        yellow: '#FFEB59',
      },
    },
    card: {
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
        background: '#FFFFFF27',
      },
    },
  };

 

  return (

    <Grommet theme={themefont}> 
		{/*Top banner*/}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'small') ? (
        <Box direction="row" justify="center" align="center" height="100vh" pad="0" round="none" style={bannerStyle}>
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="48px" weight="bold" level="1">The PKT<br />Cash Bridge<br />To WPKT</Heading>
            <p align="center" style={{ }}>{btn}</p>
          </Box>   
        </Box>
      ) : (responsive === 'medium') ? (
        <Box direction="row" justify="center" align="center" height="100vh" pad="0" round="none" style={bannerStyle}>
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="4.7vw" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <p align="center" style={{ position: "absolute", top: "40vw", left: "0", right: "0" }}>{btn}</p>
          </Box>   
        </Box>
      ) : (
        <Box direction="row" justify="center" align="center" height="90vh" pad="0" round="none" style={bannerStyle}>
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="4.7vw" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <p align="center" style={{ position: "absolute", top: "37vw", left: "0", right: "0" }}>{btn}</p>
          </Box>   
        </Box>
      )}
    </ResponsiveContext.Consumer>
		
		{/* 4 services */}
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box justify="center" pad={{ top: '100px' }} direction="row">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin={{ horizontal: "10px" }} className="ButtonRegularAlt" />
          <ButtonRegular href="/PKTToWPKT" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" />
        </Box>
        <Box justify="center" width="100%" pad="none">
          <Box justify="center" width="100%" pad="none">
            <Grid columns={['1/2', '1/2']} gap="40px" width="100%" pad="7rem 8rem">
                {data.map(value => (
                    <Card background={value.color} key={value.message} round="small" pad="60px 90px 65px">
                      <CardBody pad="none">
                        <Identifier
                          pad="none"
                          title={value.title}
                          subTitle={value.subTitle}
                          size="small"
                          align="center"
                        >
                          <img src={value.icon} alt={value.title} height="72" />
                        </Identifier>
                        <IdentifierText weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
	  
	  {/*What's ODApp?*/}
       
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" className="dark">
                  <CardBody> 
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['1/2', 'flex']}
                    alignContent={['center']}
                    justifyContent={['center']}
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="right" height="100vh" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={od_logo} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What's ODApp?</HeadingLight>
                        <Text align="left" size="26px" color="#ffffff" margin="0 0 1rem 0">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                        <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PKTToWPKT" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

	  
	  {/*Connect Your Metamask Wallet*/}
      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

              <Box pad="medium" size="large">
              <Card pad="none" justify="center">
              <CardHeader background="#F0B90C" pad="none" responsive="true" justify="center" height="30%">
                <h4 align="center">Connect Your Metamask Wallet</h4> 
              </CardHeader>  
              <CardBody background="#ffffff" pad="medium">
              <Text align="left" size={size}> 
              To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge. 
              Then select whether you are swapping from PKT to WPKT or WPKT to PKT. 
              </Text>
              <p align="center"><ButtonRegular align="center" label="Get Metamask" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p>
              </CardBody>
              </Card>
              </Box>

          ) : (   
            <Box>
            <Card width="full" round="none" background="light-1" pad="none" size="large">
              <CardBody> 
                <Grid
                fill
                areas={[
                  { name: 'left', start: [0, 0], end: [0, 0] },
                  { name: 'right', start: [1, 0], end: [1, 0] },
                ]}
                columns={['1/2', 'flex']}
                alignContent={['center']}
                justifyContent={['center']}
                rows={['flex']}
                gap="none"
                background="#fff"
                >
                <Box gridArea="left" background="#fff" height="large" justify="bottom" pad="0"><Image alignSelf="center" height="500" width="560" src={mm_logo} fit="contain" /></Box>
                <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0 10rem" >
                  <HeadingDark textAlign="center" margin="medium" size="4xl" weight="bold" color="#222323" level="2">Connect Your Metamask Wallet</HeadingDark>
                  <Text textAlign="center" size="26px" color="#707070">To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                    <Box pad="medium"><p align="center"><ButtonRegular align="center" label="Get Metamask" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                    <Text alignSelf="center" size="26px" color="#707070">If you don't have metamask <a href="https://metamask.io/" style={{color:"#F0B90C"}}>install it here</a>.</Text>
                </Box>                    
                </Grid>
              </CardBody>
            </Card>
            </Box>

          )}  

          
      </ResponsiveContext.Consumer>  
	  
	  {/*Introducing WPKT*/}
	  <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

              <Box pad="medium" size="large">
              <Card pad="none" justify="center">
              <CardHeader background="#F0B90C" pad="none" responsive="true" justify="center" height="30%">
                <h4 align="center">Introducing WPKT</h4> 
              </CardHeader>  
              <CardBody background="#ffffff" pad="medium">
              <Text align="left" size={size}>The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
              <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
              Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</Text>
              <p align="center"><ButtonRegular align="center" label="Learn More" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p>
              </CardBody>
              </Card>
              </Box>

          ) : (   
            <Box>
            <Card width="full" round="none" pad={{ vertical: "12rem", horizontal: "8rem" }} style={wpktStyle} className="dark">
              <CardBody> 
              <Grid
              fill
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}
              columns={['1/2', 'flex']}
              alignContent={['center']}
              justifyContent={['center']}
              rows={['flex']}
              gap="none"
              >
              <Box gridArea="right" justify="center" pad="1/2"><Image alignSelf="center" height="195" width="750" src={iw_logo} fit="contain" /></Box>
              <Box gridArea="left" justify="center" alignSelf="center" pad="0 8vw 0 0">
                <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Introducing WPKT</HeadingLight>
                <ScrollableText align="left" size="large" color="#ffffff" margin="0 0 1rem 0" style={{ paddingRight: "65px" }}>The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
                <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
                Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</ScrollableText>
                <Box pad="2rem 0 0"><p align="left"><ButtonRegular align="center" label="Learn More" margin={{ horizontal: "10px" }} className="ButtonRegular" /> </p></Box>
              </Box>                    
              </Grid>
              </CardBody>
            </Card>
            </Box>

          )}  

      </ResponsiveContext.Consumer>

      {/*DeFi*/}
      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

              <Box pad="medium" size="large">
                
              </Box>

          ) : (   
            <Box background="#fff" pad="8rem">
              <Card width="full" round="large" background="#F9F9F9" pad="none" style={{ zIndex: "2" }}>
                  <CardBody> 
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['1/2', 'flex']}
                    alignContent={['center']}
                    justifyContent={['center']}
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="left" height="large" justify="start" pad="0 0 0 5rem" style={defiColumnStyle}></Box>
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10vw 0 0">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Access DeFi</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">WPKT allows for participation in the highly profitable and diverse world of decentralized finance (DeFi). WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap. You can also earn yields by staking into the WPKT / BNB liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it easy to convert back to PKT.</Text>
                        <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PKTToWPKT" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

          )}
      </ResponsiveContext.Consumer>
      
      {/*Discover*/}
      <DiscoverBefore background="#222323" pad="8rem" className="dark">
        <Box justify="center" alignSelf="center" pad="0 10rem 8rem 8rem">
            <HeadingLight textAlign="center" margin="0 0 4rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Discover PKT CASH</HeadingLight>
            <Text textAlign="center" size="26px" color="#ffffff" style={{ padding: "0 19vw" }}>PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
            <Box pad="4rem 0 0"><p align="center"><ButtonRegular align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
        </Box>                    
      </DiscoverBefore>

      {/*Support*/}
      <Box background="#fff" pad="8rem">
          <HeadingDark textAlign="center" margin="0" size="4xl" weight="bold" color="#ffffff" level="2">Our Support</HeadingDark>
          <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "4rem" }}>
            <Box height="64px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_01} /></Box>
            <Box height="60px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_02} /></Box>
            <Box height="60px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_03} /></Box>
            <Box height="58px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_04} /></Box>
          </Box>
      </Box>
      
      {/*Join Community*/}
      <Box pad="8rem" style={joinStyle}>
        <Box height="auto" justify="center" alignSelf="center" pad="none">
            <HeadingDarkSmaller textAlign="center" margin="0 0 3rem 0" size="2xl" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
            <Text textAlign="center" size="26px" color="#707070" style={{ padding: "0 19vw" }}>Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
            <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "3rem" }}>
              <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><Image fit="contain" src={icon_01} /></Box>
              <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><Image fit="contain" src={icon_02} /></Box>
              <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><Image fit="contain" src={icon_03} /></Box>
              <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><Image fit="contain" src={icon_04} /></Box>
            </Box>
        </Box>                    
      </Box>
  </Grommet>
  
      
      
  );
}

export default Home;