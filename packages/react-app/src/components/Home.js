import React from "react";
import { Card, CardBody, Box, Text, Grid, ResponsiveContext, Image, Grommet, Heading, Anchor } from "grommet";
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
import defi_mobile from "../img/defi-illustration-mobile.svg";
import logo_01 from "../img/support/pktpal.png";
import logo_02 from "../img/support/binance.svg";
import logo_03 from "../img/support/pancake-swap.svg";
import logo_04 from "../img/support/anode.svg";
import join_bg from "../img/join_bg.svg";
import icon_01 from "../img/icons/icon-pkt.svg";
import icon_02 from "../img/icons/icon-twitter.svg";
import icon_03 from "../img/icons/icon-telegram.svg";
import icon_04 from "../img/icons/icon-funny.svg";
import { customBreakpoints, DiscoverBefore, ScrollableText } from ".";
import {HeadingDark , HeadingLight, ButtonRegularAlt, ButtonRegular, HeadingDarkSmaller, IdentifierTitle, IdentifierSubTitle, IdentifierText} from ".";
import Fade from 'react-reveal/Fade';

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
};

var wpktStyle = {
  backgroundImage: 'url(' + bridge_bg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  backgroundSize: 'cover',
  position: 'relative',
};

var wpktStyleMobile = {
  backgroundImage: 'url(' + bridge_bg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
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

var defiColumnStyleMed = {
  backgroundImage: 'url(' + defi + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: 'cover'
};


function Home( {btn} ) {
  //getSupply();
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

    <Grommet theme={customBreakpoints}>
		{/*Top banner*/}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box direction="row" justify="center" align="center" height="92vh" pad="0" round="none" style={bannerStyle} className="top_banner_home_small">
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="48px" weight="bold" level="1" margin={{top: "-50px"}}>The PKT<br />Cash Bridge<br />To WPKT</Heading>
            <Text textAlign="center" size="18px" weight="bold" color="#ffffff">WPKT Contract Address</Text>
            <Anchor href="https://pancakeswap.finance/info/token/0x1c25222994531c4ac35e4d94bbf7552c9aa92e32" target="_blank" weight="bold" color="#FBA300" style={{textAlign: "center", paddingBottom: '25px',paddingTop: '10px', fontSize: "3.35vw"}} label="0x1C25222994531C4AC35E4d94bbf7552c9aa92E32" />
            <Fade bottom><p align="center" style={{ position: "absolute", bottom: "70px", left: "0", right: "0" }}>{btn}</p></Fade>
          </Box>   
        </Box>
      ) : (responsive === 'small') ? (
        <Box direction="row" justify="center" align="center" pad="15vw 10vw" round="none" style={bannerStyle} className="top_banner_home_small">
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="38px" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <Text textAlign="center" size="22px" weight="bold" color="#ffffff">WPKT Contract Address</Text>
            <Anchor href="https://pancakeswap.finance/info/token/0x1c25222994531c4ac35e4d94bbf7552c9aa92e32" target="_blank" weight="bold" color="#FBA300" style={{textAlign: "center", paddingBottom: '35px',paddingTop: '10px', fontSize: "16px"}} label="0x1C25222994531C4AC35E4d94bbf7552c9aa92E32" />
            <Fade bottom><p align="center">{btn}</p></Fade>
          </Box>   
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box direction="row" justify="around" align="center" height="65vw" pad="0" round="none" style={bannerStyle} className="top_banner_home_small">
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="48px" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <Text textAlign="center" size="22px" weight="bold" color="#ffffff">WPKT Contract Address</Text>
            <Anchor href="https://pancakeswap.finance/info/token/0x1c25222994531c4ac35e4d94bbf7552c9aa92e32" target="_blank" weight="bold" color="#FBA300" style={{textAlign: "center", paddingBottom: '35px',paddingTop: '10px', fontSize: "18px"}} label="0x1C25222994531C4AC35E4d94bbf7552c9aa92E32" />
            <Fade bottom><p align="center" margin={{ top: "35px" }}>{btn}</p></Fade>
          </Box>   
        </Box>
      ) : (responsive === 'medium') ? (
        <Box direction="row" justify="center" align="center" height="85vh" pad="0" round="none" style={bannerStyle} className="top_banner_home_medium">
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="4vw" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <Text textAlign="center" size="24px" weight="bold" color="#ffffff">WPKT Contract Address</Text>
            <Anchor href="https://pancakeswap.finance/info/token/0x1c25222994531c4ac35e4d94bbf7552c9aa92e32" target="_blank" weight="bold" color="#FBA300" style={{textAlign: "center", paddingBottom: '50px',paddingTop: '10px', fontSize: "22px"}} label="0x1C25222994531C4AC35E4d94bbf7552c9aa92E32" />
            <Fade bottom><p align="center" style={{ margin: "0" }}>{btn}</p></Fade>
          </Box>   
        </Box>
      ) : (
        <Box direction="row" justify="center" align="center" height="90vh" pad="0" round="none" style={bannerStyle}>
          <Box pad="medium" justify="center">
            <Heading color="#ffffff" textAlign="center" size="4.7vw" weight="bold" level="1">The PKT Cash Bridge<br />To WPKT</Heading>
            <Text textAlign="center" size="28px" weight="bold" color="#ffffff">WPKT Contract Address</Text>
            <Anchor href="https://pancakeswap.finance/info/token/0x1c25222994531c4ac35e4d94bbf7552c9aa92e32" target="_blank" weight="bold" color="#FBA300" style={{ textAlign: "center", paddingBottom: '50px',paddingTop: '20px', fontSize: "26px"}} label="0x1C25222994531C4AC35E4d94bbf7552c9aa92E32" />
            <Fade bottom><p align="center" style={{ position: "absolute", top: "37vw", left: "0", right: "0" }}>{btn}</p></Fade>
          </Box>   
        </Box>
      )}
    </ResponsiveContext.Consumer>
		
		{/* 4 services */}
    <ResponsiveContext.Consumer>
    {responsive => (responsive === 'smallmob') ? (
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box pad={{ top: '50px' }} width="full" align="center">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin="none" className="ButtonRegularAlt" />
          <ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ top: "20px" }} className="ButtonRegular" />
        </Box>
        <Box justify="center" pad="none">
          <Box justify="center" pad={{horizontal: "30px", top: "50px", bottom: "75px"}}>
            <Grid columns={['1', '1']} gap="20px" pad="none">
                {data.map(value => (
                    <Card background={value.color} key={value.message} round="small" pad="45px 50px">
                      <CardBody pad="none">
                        <Identifier
                          pad="none"
                          title={value.title}
                          subTitle={value.subTitle}
                          size="small"
                          align="center">
                          <Fade bottom><img src={value.icon} alt={value.title} height="70" /></Fade>
                        </Identifier>
                        <IdentifierText weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
    ) : (responsive === 'small') ? (
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box justify="center" pad={{ top: '50px' }} direction="row">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin={{ horizontal: "10px" }} className="ButtonRegularAlt" />
          <ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" />
        </Box>
        <Box justify="center" pad="none">
          <Box justify="center" pad={{horizontal: "50px", top: "50px", bottom: "75px"}}>
            <Grid columns={['1', '1']} gap="35px" pad="none">
                {data.map(value => (
                    <Card background={value.color} key={value.message} round="small" pad={{vertical: "45px", horizontal: "15vw"}}>
                      <CardBody pad="none">
                        <Identifier
                          pad="none"
                          title={value.title}
                          subTitle={value.subTitle}
                          size="small"
                          align="center">
                          <Fade bottom><img src={value.icon} alt={value.title} height="50" /></Fade>
                        </Identifier>
                        <IdentifierText size="18px" weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
    ) : (responsive === 'tablet') ? (
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box justify="center" pad={{ top: '75px' }} direction="row">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin={{ horizontal: "10px" }} className="ButtonRegularAlt" />
          <ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" />
        </Box>
        <Box justify="center" pad="none">
          <Box justify="center" pad={{horizontal: "30px", top: "50px", bottom: "75px"}}>
            <Grid columns={['1', '1']} gap="20px" pad="none">
                {data.map(value => (
                    <Card background={value.color} key={value.message} round="small" pad="45px 50px">
                      <CardBody pad="none">
                        <Identifier
                          pad="none"
                          title={value.title}
                          subTitle={value.subTitle}
                          size="small"
                          align="center">
                          <Fade bottom><img src={value.icon} alt={value.title} height="70" /></Fade>
                        </Identifier>
                        <IdentifierText weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
    ) : (responsive === 'medium') ? (
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box justify="center" pad={{ top: '75px' }} direction="row">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin={{ horizontal: "10px" }} className="ButtonRegularAlt" />
          <ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" />
        </Box>
        <Box justify="center" pad="none">
          <Box justify="center" pad="none">
            <Grid columns={['1/2', '1/2']} gap="20px" pad="50px 50px 75px">
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
                          <Fade bottom><img src={value.icon} alt={value.title} height="50" /></Fade>
                        </Identifier>
                        <IdentifierText weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
    ) : (
      <Box justify="center" align="center" pad="medium" round="none" width="100%" pad="none">
        <Box justify="center" pad={{ top: '100px' }} direction="row">
          <ButtonRegularAlt href="/WPKTToPKT" label="Get PKT" margin={{ horizontal: "10px" }} className="ButtonRegularAlt" />
          <ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" />
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
                        <Fade bottom><img src={value.icon} alt={value.title} height="72" /></Fade>
                        </Identifier>
                        <IdentifierText weight="normal" color="#707070" alignSelf="center">{value.message}</IdentifierText>
                      </CardBody>
                    </Card>
                  ))}
            </Grid> 
          </Box>
        </Box>   
      </Box>
    )}
    </ResponsiveContext.Consumer>
      
	  {/*What's ODApp?*/}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 30px 70px" className="dark">
              <CardBody> 
                <Box justify="center" alignSelf="center" pad="none">
                    <HeadingLight textAlign="center" margin="0 0 30px 0" size="4xl" weight="bold" color="#ffffff" level="2">What's ODApp?</HeadingLight>
                    <Text align="center" textAlign="center" size="16px" color="#ffffff" margin="0 0 40px 0">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                </Box>
                <Box pad="none"><Image alignSelf="center" height="300" src={od_logo} fit="contain" /></Box>
                <Box pad="2rem 0 0"><p align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin="none" className="ButtonRegular" /></p></Box>                
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 50px 70px" className="dark">
              <CardBody> 
                <Box justify="center" alignSelf="center" pad={{horizontal: "15vw"}}>
                    <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">What's ODApp?</HeadingLight>
                    <Text align="center" textAlign="center" size="18px" color="#ffffff" margin="0 0 35px 0">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                </Box>
                <Box pad="none"><Image width="350" alignSelf="center" src={od_logo} fit="contain" /></Box>
                <Box pad="35px 0 0"><p align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin="none" className="ButtonRegular" /></p></Box>                
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 35px 70px" className="dark">
              <CardBody> 
                <Box justify="center" alignSelf="center" pad={{horizontal: "15vw"}}>
                    <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">What's ODApp?</HeadingLight>
                    <Text align="center" textAlign="center" size="20px" color="#ffffff" margin="0 0 35px 0">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                </Box>
                <Box pad="none"><Image alignSelf="center" src={od_logo} fit="contain" width="500" /></Box>
                <Box pad="35px 0 0"><p align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin="none" className="ButtonRegular" /></p></Box>                
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'medium') ? (
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
                  <Fade right><Box gridArea="right" justify="center" pad="none"><Image alignSelf="center" width="500" src={od_logo} fit="contain" /></Box></Fade>
                  <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 75px 0 50px">
                    <HeadingLight textAlign="left" margin="0 0 2rem 0" weight="bold" color="#ffffff" level="2">What's ODApp?</HeadingLight>
                    <Text align="left" size="22px" color="#ffffff" margin="none">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                    <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                  </Box>                    
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (
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
                      <Fade right><Box gridArea="right" height="100vh" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={od_logo} fit="contain" /></Box></Fade>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What's ODApp?</HeadingLight>
                        <Text align="left" size="26px" color="#ffffff" margin="0 0 1rem 0">ODApp is a decentralized application that allows you to "bridge" between the world of PKT Cash (symbol: PKT) and Binance Smart Chain. Though entirely different blockchains, PKT cash and Binance Smart Chain are connected via ODApp which allow seamless value transfer between the two chains.</Text>
                        <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>
      )}
    </ResponsiveContext.Consumer>
            

	  {/*Connect Your Metamask Wallet*/}
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
          <Box>
            <Card width="full" round="none" background="light-1" pad="none">
              <CardBody> 
                <Box background="#fff" justify="center" alignSelf="center" pad="65px 25px 80px" >
                  <HeadingDark textAlign="center" margin="none" weight="bold" color="#222323" level="2">Connect Your Metamask Wallet</HeadingDark>
                  <Text textAlign="center" size="16px" color="#707070" margin={{vertical: "35px"}}>To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                    <Box pad="none" align="center"><ButtonRegular href="https://metamask.io" target="_blank" align="center" label="Get Metamask" margin={{ bottom: "35px" }} className="ButtonRegular" /></Box>
                    <Text alignSelf="center" size="16px" color="#707070">If you don't have metamask <a href="https://metamask.io/" style={{color:"#F0B90C"}}>install it here</a>.</Text>
                </Box>                    
              </CardBody>
            </Card>
          </Box>
        ) : (responsive === 'small') ? (
          <Box>
            <Card width="full" round="none" background="#fff" pad="none">
              <CardBody pad="0 15vw"> 
                <Box background="#fff" justify="center" alignSelf="center" pad="50px 35px 70px" >
                  <HeadingDark textAlign="center" margin="none" weight="bold" color="#222323" level="2">Connect Your<br />Metamask Wallet</HeadingDark>
                  <Text textAlign="center" size="18px" color="#707070" margin={{vertical: "35px"}}>To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                    <Box pad="none" align="center"><ButtonRegular href="https://metamask.io" target="_blank" align="center" label="Get Metamask" margin={{ bottom: "35px" }} className="ButtonRegular" /></Box>
                    <Text alignSelf="center" size="18px" color="#707070">If you don't have metamask <a href="https://metamask.io/" style={{color:"#F0B90C"}}>install it here</a>.</Text>
                </Box>                    
              </CardBody>
            </Card>
          </Box>
        ) : (responsive === 'tablet') ? (
          <Box>
            <Card width="full" round="none" background="#fff" pad="none">
              <CardBody pad="0 15vw"> 
                <Box background="#fff" justify="center" alignSelf="center" pad="50px 35px 70px" >
                  <HeadingDark textAlign="center" margin="none" weight="bold" color="#222323" level="2">Connect Your<br />Metamask Wallet</HeadingDark>
                  <Text textAlign="center" size="20px" color="#707070" margin={{vertical: "35px"}}>To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                    <Box pad="none" align="center"><ButtonRegular href="https://metamask.io" target="_blank" align="center" label="Get Metamask" margin={{ bottom: "35px" }} className="ButtonRegular" /></Box>
                    <Text alignSelf="center" size="20px" color="#707070">If you don't have metamask <a href="https://metamask.io/" style={{color:"#F0B90C"}}>install it here</a>.</Text>
                </Box>                    
              </CardBody>
            </Card>
          </Box>
        ) : (responsive === 'medium') ? (
          <Box>
          <Card width="full" round="none" background="#fff" pad="none" size="large">
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
              <Fade left><Box gridArea="left" background="#fff" height="large" justify="bottom" pad="0"><Image alignSelf="center" height="400" width="450" src={mm_logo} fit="contain" /></Box></Fade>
              <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0 50px" >
                <HeadingDark textAlign="center" margin="medium" weight="bold" color="#222323" level="2">Connect Your Metamask Wallet</HeadingDark>
                <Text textAlign="center" size="22px" color="#707070" margin={{vertical: "1vw"}}>To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                  <Box pad="medium"><p align="center"><ButtonRegular href="https://metamask.io" target="_blank" align="center" label="Get Metamask" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                  <Text alignSelf="center" size="22px" color="#707070">If you don't have metamask <a href="https://metamask.io/" style={{color:"#F0B90C"}}>install it here</a>.</Text>
              </Box>                    
              </Grid>
            </CardBody>
          </Card>
          </Box>
        ) : (
          <Box>
            <Card width="full" round="none" background="#fff" pad="none" size="large">
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
                <Fade left><Box gridArea="left" background="#fff" height="large" justify="bottom" pad="0"><Image alignSelf="center" height="500" width="560" src={mm_logo} fit="contain" /></Box></Fade>
                <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0 10rem" >
                  <HeadingDark textAlign="center" margin="medium" size="4xl" weight="bold" color="#222323" level="2">Connect Your Metamask Wallet</HeadingDark>
                  <Text textAlign="center" size="26px" color="#707070" margin={{vertical: "1vw"}}>To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge.<br />Then select whether you are swapping from PKT to WPKT or WPKT to PKT.</Text>
                    <Box pad="medium"><p align="center"><ButtonRegular href="https://metamask.io" target="_blank" align="center" label="Get Metamask" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
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
        {responsive => (responsive === 'smallmob') ? (
          <Box>
          <Card width="full" round="none" pad={{ top: "45px", bottom: "80px", horizontal: "30px" }} style={wpktStyleMobile} className="dark">
            <CardBody> 
            <Box justify="center" alignSelf="center" pad="none">
              <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" color="#ffffff" level="2">Introducing WPKT</HeadingLight>
              <Text textAlign="center" size="16px" color="#ffffff" margin="none">The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
              <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
              Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</Text>
            </Box>
            <Box justify="center" pad="35px 0 0"><Image alignSelf="center" height="65" width="250" src={iw_logo} fit="contain" /></Box>                 
            </CardBody>
          </Card>
          </Box>
        ) : (responsive === 'small') ? (
          <Box>
          <Card width="full" round="none" pad={{ top: "50px", bottom: "75px", horizontal: "20vw" }} style={wpktStyleMobile} className="dark">
            <CardBody> 
            <Box justify="center" alignSelf="center" pad="none">
              <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" color="#ffffff" level="2">Introducing WPKT</HeadingLight>
              <Text textAlign="center" size="18px" color="#ffffff" margin="none">The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
              <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
              Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</Text>
            </Box>
            <Box justify="center" pad="35px 0 0"><Image alignSelf="center" height="65" width="250" src={iw_logo} fit="contain" /></Box>                 
            </CardBody>
          </Card>
          </Box>
        ) : (responsive === 'tablet') ? (
          <Box>
          <Card width="full" round="none" pad={{ top: "50px", bottom: "75px", horizontal: "20vw" }} style={wpktStyleMobile} className="dark">
            <CardBody> 
            <Box justify="center" alignSelf="center" pad="none">
              <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" color="#ffffff" level="2">Introducing WPKT</HeadingLight>
              <Text textAlign="center" size="20px" color="#ffffff" margin="none">The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
              <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
              Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</Text>
            </Box>
            <Box justify="center" pad="35px 0 0"><Image alignSelf="center" height="85" width="300" src={iw_logo} fit="contain" /></Box>                 
            </CardBody>
          </Card>
          </Box>
        ) : (responsive === 'medium') ? (
          <Box>
          <Card width="full" round="none" pad={{ vertical: "6rem", horizontal: "50px" }} style={wpktStyle} className="dark">
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
            <Box gridArea="right" justify="center" pad="1/2"><Image alignSelf="center" height="150" width="450" src={iw_logo} fit="contain" /></Box>
            <Box gridArea="left" justify="center" alignSelf="center" pad="0 4vw 0 0">
              <HeadingLight textAlign="left" margin="0 0 2rem 0" weight="bold" color="#ffffff" level="2">Introducing WPKT</HeadingLight>
              <ScrollableText align="left" size="22px" color="#ffffff" margin="none" style={{ paddingRight: "65px" }}>The ODApp bridge converts your PKT into a BEP20 token called WPKT, which has a 1-to-1 peg to PKT. With WPKT you gain access to the multi-billion dollar world of Binance Smart Chain,  swap WPKT for BNB (or any BEP20 token), and hold WPKT in any wallet that supports BEP20 tokens.
              <br /><br />Since PKT and WPKT exist on different blockchains, PKT cannot be sent to the Binance Smart Chain and WPKT cannot be sent to the PKT chain without using the ODApp bridge. The symbols PKT and WPKT differentiate the assets based on the blockchain they can transact on. 
              Exist on different chains, 1PKT cannot be sent to the Ethereum chain and WPKT cannot be sent to the 1PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</ScrollableText>
              <Box pad="2rem 0 0"><p align="left"><ButtonRegular align="center" label="Learn More" margin={{ horizontal: "10px" }} className="ButtonRegular" /> </p></Box>
            </Box>                    
            </Grid>
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
        {responsive => (responsive === 'smallmob') ? (
          <Box background="#fff" pad="35px 20px">
            <Card width="full" round="large" background="#F9F9F9" pad="none" style={{ zIndex: "2" }}>
                <CardBody> 
                  <Box justify="center" alignSelf="center" pad="50px 20px 0">
                      <HeadingDark textAlign="center" margin="0 0 35px 0" weight="bold" level="2">Access DeFi</HeadingDark>
                      <Text textAlign="center" size="16px" color="#707070" margin="0 0 35px 0">WPKT allows for participation in the highly profitable and diverse world of decentralized finance (DeFi). WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap. You can also earn yields by staking into the WPKT / BNB liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it easy to convert back to PKT.</Text>
                      <Box pad="none" align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin="none" className="ButtonRegular" /></Box>
                      <Box pad="35px 0 0"><Image alignSelf="center" height="300" width="340" src={defi_mobile} fit="contain" /></Box>
                  </Box>                    
                </CardBody>
            </Card>
          </Box>
        ) : (responsive === 'small') ? (
          <Box background="#fff" pad="50px">
            <Card width="full" round="large" background="#F9F9F9" pad="none" style={{ zIndex: "2" }}>
                <CardBody> 
                  <Box justify="center" alignSelf="center" pad="50px 75px 0">
                      <HeadingDark textAlign="center" margin="0 0 35px 0" weight="bold" level="2">Access DeFi</HeadingDark>
                      <Text textAlign="center" size="18px" color="#707070" margin="0 0 35px 0">WPKT allows for participation in the highly profitable and diverse world of decentralized finance (DeFi). WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap. You can also earn yields by staking into the WPKT / BNB liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it easy to convert back to PKT.</Text>
                      <Box pad="none" align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin="none" className="ButtonRegular" /></Box>
                      <Box pad="35px 0 0"><Image alignSelf="center" height="300" width="340" src={defi_mobile} fit="contain" /></Box>
                  </Box>                    
                </CardBody>
            </Card>
          </Box>
        ) : (responsive === 'tablet') ? (
          <Box background="#fff" pad="50px 30px 75px">
              <Card width="full" round="large" background="#F9F9F9" pad="none" style={{ zIndex: "2" }}>
                  <CardBody> 
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['1/2', 'flex']}
                    alignContent="center"
                    justifyContent="center"
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="left" justify="start" pad="none" style={defiColumnStyle}></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="50px 35px 50px 0">
                        <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">Access DeFi</HeadingDark>
                        <Text textAlign="center" size="20px" color="#707070" margin="none">WPKT allows for participation in the highly profitable and diverse world of decentralized finance (DeFi). WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap. You can also earn yields by staking into the WPKT / BNB liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it easy to convert back to PKT.</Text>
                        <Box pad="35px 0 0"><p align="center"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>
        ) : (responsive === 'medium') ? (
          <Box background="#fff" pad="75px 50px 50px">
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
                      <Box gridArea="left" justify="start" pad="none" style={defiColumnStyle}></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="75px 75px 75px 0">
                        <HeadingDark textAlign="left" margin="0 0 2rem 0" weight="bold" color="#ffffff" level="2">Access DeFi</HeadingDark>
                        <Text align="left" size="22px" color="#707070" margin="none">WPKT allows for participation in the highly profitable and diverse world of decentralized finance (DeFi). WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap. You can also earn yields by staking into the WPKT / BNB liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it easy to convert back to PKT.</Text>
                        <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
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
                        <Box pad="2rem 0 0"><p align="left"><ButtonRegular href="/PreCommit" align="center" label="Get WPKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>
        )}
    </ResponsiveContext.Consumer>


      {/*Discover*/}
      <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
          <DiscoverBefore background="#222323" className="dark">
            <Box justify="center" alignSelf="center" pad="35px 25px 80px" >
                <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" level="2">Discover PKT CASH</HeadingLight>
                <Text textAlign="center" size="16px" color="#ffffff">PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
                <Box pad="35px 0 0"><p align="center"><ButtonRegular href="https://pkt.cash/" target="_blank" align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
            </Box>                    
          </DiscoverBefore>
        ) : (responsive === 'small') ? (
          <DiscoverBefore background="#222323" pad="50px" className="dark">
            <Box justify="center" alignSelf="center" pad="0 50px 75px">
                <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" color="#ffffff" level="2">Discover PKT CASH</HeadingLight>
                <Text textAlign="center" size="18px" color="#ffffff" style={{ padding: "0 10vw" }}>PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
                <Box pad="35px 0 0"><p align="center"><ButtonRegular href="https://pkt.cash/" target="_blank" align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
            </Box>                    
          </DiscoverBefore>
        ) : (responsive === 'tablet') ? (
          <DiscoverBefore background="#222323" pad="50px" className="dark">
            <Box justify="center" alignSelf="center" pad="0 50px 75px">
                <HeadingLight textAlign="center" margin="0 0 35px 0" weight="bold" color="#ffffff" level="2">Discover PKT CASH</HeadingLight>
                <Text textAlign="center" size="20px" color="#ffffff" style={{ padding: "0 10vw" }}>PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
                <Box pad="35px 0 0"><p align="center"><ButtonRegular href="https://pkt.cash/" target="_blank" align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
            </Box>                    
          </DiscoverBefore>
        ) : (responsive === 'medium') ? (
          <DiscoverBefore background="#222323" pad="50px" className="dark">
            <Box justify="center" alignSelf="center" pad="0 50px 75px">
                <HeadingLight textAlign="center" margin="0 0 3rem 0" weight="bold" color="#ffffff" level="2">Discover PKT CASH</HeadingLight>
                <Text textAlign="center" size="22px" color="#ffffff" style={{ padding: "0 10vw" }}>PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
                <Box pad="3rem 0 0"><p align="center"><ButtonRegular href="https://pkt.cash/" target="_blank" align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
            </Box>                    
          </DiscoverBefore>
        ) : (
          <DiscoverBefore background="#222323" pad="8rem" className="dark">
            <Box justify="center" alignSelf="center" pad="0 10rem 8rem 8rem">
                <HeadingLight textAlign="center" margin="0 0 4rem 0" weight="bold" color="#ffffff" level="2">Discover PKT CASH</HeadingLight>
                <Text textAlign="center" size="26px" color="#ffffff" style={{ padding: "0 19vw" }}>PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet bandwidth into cash. People who connect to the PKT Network are paid in PKT Cash (PKT) every 60 seconds. PKT continues the cjdns vision by allowing anyone to share their internet and become an internet service provider (ISP). If you don't know what PKT is then click here to find out how PKT is changing the internet as we know it.</Text>
                <Box pad="4rem 0 0"><p align="center"><ButtonRegular href="https://pkt.cash/" target="_blank" align="center" label="Discover PKT" margin={{ horizontal: "10px" }} className="ButtonRegular" /></p></Box>
            </Box>                    
          </DiscoverBefore>
        )}
      </ResponsiveContext.Consumer>

      {/*Support*/}
      <ResponsiveContext.Consumer>
          {responsive => (responsive === 'smallmob') ? (
            <Box background="#fff" pad="40px 25px 70px">
                <HeadingDark textAlign="center" margin="0" weight="bold" level="2">Our Support</HeadingDark>
                <Box pad="none" align="center" justify="center" direction="column" margin={{ top: "50px" }}>
                  <Box height="45px" margin={{ vertical: "20px" }}><Image fit="contain" src={logo_01} /></Box>
                  <Box height="45px" margin={{ vertical: "20px" }}><Image fit="contain" src={logo_02} /></Box>
                  <Box height="45px" margin={{ vertical: "20px" }}><Image fit="contain" src={logo_03} /></Box>
                  <Box height="45px" margin={{ vertical: "20px" }}><Image fit="contain" src={logo_04} /></Box>
                </Box>
            </Box>
          ) : (responsive === 'small') ? (
            <Box background="#fff" pad="50px 30px 75px">
                <HeadingDark textAlign="center" margin="0" level="2">Our Support</HeadingDark>
                <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "35px" }}>
                  <Box height="64px" margin={{ horizontal: "15px" }}><Image fit="contain" src={logo_01} /></Box>
                  <Box height="60px" margin={{ horizontal: "15px" }}><Image fit="contain" src={logo_02} /></Box>
                  <Box height="60px" margin={{ horizontal: "15px" }}><Image fit="contain" src={logo_03} /></Box>
                  <Box height="58px" margin={{ horizontal: "15px" }}><Image fit="contain" src={logo_04} /></Box>
                </Box>
            </Box>
          ) : (responsive === 'tablet') ? (
            <Box background="#fff" pad="50px 30px 75px">
                <HeadingDark textAlign="center" margin="0" level="2">Our Support</HeadingDark>
                <Fade bottom cascade><Box pad="none" align="center" justify="center" direction="row" margin={{ top: "35px" }}>
                  <Box height="64px" margin={{ horizontal: "25px" }}><Image fit="contain" src={logo_01} /></Box>
                  <Box height="60px" margin={{ horizontal: "25px" }}><Image fit="contain" src={logo_02} /></Box>
                  <Box height="60px" margin={{ horizontal: "25px" }}><Image fit="contain" src={logo_03} /></Box>
                  <Box height="58px" margin={{ horizontal: "25px" }}><Image fit="contain" src={logo_04} /></Box>
                </Box></Fade>
            </Box>
          ) : (
            <Box background="#fff" pad="8rem">
                <HeadingDark textAlign="center" margin="0" weight="bold" color="#ffffff" level="2">Our Support</HeadingDark>
                <Fade bottom cascade><Box pad="none" align="center" justify="center" direction="row" margin={{ top: "4rem" }}>
                  <Box height="64px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_01} /></Box>
                  <Box height="60px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_02} /></Box>
                  <Box height="60px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_03} /></Box>
                  <Box height="58px" margin={{ horizontal: "50px" }}><Image fit="contain" src={logo_04} /></Box>
                </Box></Fade>
            </Box>
          )}
      </ResponsiveContext.Consumer>
      
      {/*Join Community*/}
      <ResponsiveContext.Consumer>
          {responsive => (responsive === 'smallmob') ? (
            <Box pad="65px 30px 100px" style={joinStyle}>
              <Box height="auto" justify="center" alignSelf="center" pad="none">
                  <HeadingDarkSmaller textAlign="center" margin="0 0 35px 0" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
                  <Text textAlign="center" size="16px" color="#707070">Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
                  <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "35px" }}>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px", vertical: "15px" }}><a href="https://pkt.chat/" target="_blank"><Image fit="contain" src={icon_01} /></a></Box>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px", vertical: "15px" }}><a href="https://twitter.com/pkt_cash" target="_blank"><Image fit="contain" src={icon_02} /></a></Box>
                  </Box>
                  <Box pad="none" align="center" justify="center" direction="row" margin="none">
                    <Box height="88px" width="88px" margin={{ horizontal: "15px", vertical: "15px" }}><a href="https://t.me/pkt_cash" target="_blank"><Image fit="contain" src={icon_03} /></a></Box>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px", vertical: "15px" }}><a href="https://discord.gg/ytjzxzNzF3" target="_blank"><Image fit="contain" src={icon_04} /></a></Box>
                  </Box>
              </Box>                    
            </Box>
          ) : (responsive === 'small') ? (
            <Box pad="75px 50px" style={joinStyle}>
              <Box height="auto" justify="center" alignSelf="center" pad="none">
                  <HeadingDarkSmaller textAlign="center" margin="0 0 35px 0" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
                  <Text textAlign="center" size="18px" color="#707070" style={{ padding: "0 20vw" }}>Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
                  <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "35px" }}>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://pkt.chat/" target="_blank"><Image height="60" width="60" fit="contain" src={icon_01} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://twitter.com/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_02} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://t.me/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_03} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://discord.gg/ytjzxzNzF3" target="_blank"><Image height="60" width="60" fit="contain" src={icon_04} /></a></Box>
                  </Box>
              </Box>                    
            </Box>
          ) : (responsive === 'tablet') ? (
            <Box pad="75px 50px" style={joinStyle}>
              <Box height="auto" justify="center" alignSelf="center" pad="none">
                  <HeadingDarkSmaller textAlign="center" margin="0 0 35px 0" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
                  <Text textAlign="center" size="20px" color="#707070" style={{ padding: "0 20vw" }}>Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
                  <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "35px" }}>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://pkt.chat/" target="_blank"><Image height="60" width="60" fit="contain" src={icon_01} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://twitter.com/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_02} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://t.me/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_03} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://discord.gg/ytjzxzNzF3" target="_blank"><Image height="60" width="60" fit="contain" src={icon_04} /></a></Box>
                  </Box>
              </Box>                    
            </Box>
          ) : (responsive === 'medium') ? (
            <Box pad="100px 50px" style={joinStyle}>
              <Box height="auto" justify="center" alignSelf="center" pad="none">
                  <HeadingDarkSmaller textAlign="center" margin="0 0 2rem 0" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
                  <Text textAlign="center" size="22px" color="#707070" style={{ padding: "0 20vw" }}>Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
                  <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "2rem" }}>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://pkt.chat/" target="_blank"><Image height="60" width="60" fit="contain" src={icon_01} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://twitter.com/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_02} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://t.me/pkt_cash" target="_blank"><Image height="60" width="60" fit="contain" src={icon_03} /></a></Box>
                    <Box height="60px" width="60px" margin={{ horizontal: "15px" }}><a href="https://discord.gg/ytjzxzNzF3" target="_blank"><Image height="60" width="60" fit="contain" src={icon_04} /></a></Box>
                  </Box>
              </Box>                    
            </Box>
          ) : (
            <Box pad="8rem" style={joinStyle}>
              <Box height="auto" justify="center" alignSelf="center" pad="none">
                  <HeadingDarkSmaller textAlign="center" margin="0 0 3rem 0" size="2xl" weight="bold" color="#222323" level="2">Join The PKT Community</HeadingDarkSmaller>
                  <Text textAlign="center" size="26px" color="#707070" style={{ padding: "0 19vw" }}>Join the growing PKT Cash community. Visit the socials or join the conversation on PKT Chat or Telegram.</Text>
                  <Box pad="none" align="center" justify="center" direction="row" margin={{ top: "3rem" }}>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><a href="https://pkt.chat/" target="_blank"><Image fit="contain" src={icon_01} /></a></Box>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><a href="https://twitter.com/pkt_cash" target="_blank"><Image fit="contain" src={icon_02} /></a></Box>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><a href="https://t.me/pkt_cash" target="_blank"><Image fit="contain" src={icon_03} /></a></Box>
                    <Box height="88px" width="88px" margin={{ horizontal: "15px" }}><a href="https://discord.gg/ytjzxzNzF3" target="_blank"><Image fit="contain" src={icon_04} /></a></Box>
                  </Box>
              </Box>                   
            </Box>
          )}
      </ResponsiveContext.Consumer>
      
  </Grommet>
  
      
      
  );
}

export default Home;