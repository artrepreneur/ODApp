import React, { useContext } from "react";
import { Card, CardBody, CardHeader, CardFooter, Anchor, Box, Text, Grid, ResponsiveContext, Image, Grommet } from "grommet";
//import { useQuery } from "@apollo/react-hooks";
import { BodyCenteredAlt } from ".";
import logo from "../img/logo1/3C.png";
import mm_logo from "../img/metamask-min.png";
import pkt_logo from "../img/pktlogoX-min.png";
import defi_wpkt from "../img/defi.jpeg";
import odapp_img from "../img/image1.jpeg";
import { grommet } from 'grommet/themes';


/*import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import addresses from "./abi/addresses";
import abis from "./abi/abis";
import Web3 from "web3";*/


import {
  Nodes,
  System,
  Compare,
  Cycle,
} from 'grommet-icons';

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


function Home( {btn} ) {
  //getSupply();

  const size = useContext(ResponsiveContext);
  const cards = ['Bridge PKT Cash onto Binance smart chain','Trade PKT Cash on Pancake Swap. Yield Farm, stake and more.'];

  const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="medium" align="center" {...rest}>
      {children}
      <Box>
        <Text size={size} weight="bold">
          {title}
        </Text>
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
  );

  const data = [
    {
      color: '#7d4cdb',
      icon: <Compare size="large" />,
      title: 'Bridging',
      subTitle: 'Get PKT Cash on Binance smart chain',
      message: 'Convert PKT to WPKT and access the world of Binance smart chain.'
    },
    {
      color: '#56cde0',
      icon: <System size="large" />,
      title: 'Trading',
      subTitle: 'Trade PKT Cash on Pancake Swap with WPKT',
      message: 'With WPKT you can swap PKT to ETH or any other pair on Pancake Swap.'
    },
    {
      color: '#F0B90C',
      icon: <Nodes size="large" />,
      title: 'DeFi',
      subTitle: 'Access decentralized finance (DeFi) and more',
      message: 'You can yield farm, stake or whatever flavor of DeFi you desire.'
    },
    {
      color: '#ffffff',
      icon: <Cycle size="large" />,
      title: 'Arbitrage',
      subTitle: 'Arbitrage WPKT against PKT',
      message: 'Take advantage of price inefficiencies between decentralized and centralized exchanges.'
    }
  ];
  
  const theme = {
    global: {
      font: {
        family: `-apple-system,
           BlinkMacSystemFont, 
           "Segoe UI"`,
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

    <Grommet theme={grommet}> 

      <Box direction="row" justify="center" align="center" height="40%" pad="medium" background={{image:
            'url(https://odapp.io/prple.jpg) ', repeat: "no-repeat",
          opacity: '.80'}} round="none">
        <Box pad="medium" justify="center">
          <Box pad="medium" direction="row" justify="center"><Text color="#7d4cdb" size="5xl" weight="bold" style={{color:"#F8F8FF", opacity: 1}}>The PKT To Binance smart chain Bridge</Text></Box>
          <Box justify="center">
          <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="small">
               {data.map(value => (
                  <Card background={value.color} key={value.message} round="small">
                    <CardBody pad="small">
                      <Identifier
                        pad="small"
                        title={value.title}
                        subTitle={value.subTitle}
                        size="small"
                        align="start"
                      >
                        {value.icon}
                      </Identifier>
                      {/*<Text margin="small" size="small">{value.message}</Text>*/}
                    </CardBody>
                    <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }} background={{color:"light-2", opacity: '.20'}}>
                      <Text size="small">{value.message}</Text>
               </CardFooter>
                  </Card>
                ))}
          </Grid> 
          </Box>
        </Box>   
      </Box>
    <BodyCenteredAlt>
     
      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (
            <Box pad="medium" size="small">
                  <Card pad="none" style={{backgroundColor: '#ffffff'}}>
                  <CardHeader background="#56cde0" pad="none" justify="center" height="30%"><h5 style={{color: '#ffffff', paddingBottom: '0%'}} align="center">What's an ODApp?</h5></CardHeader>
                      <CardBody pad="medium"> 
                      <Box height="xxsmall" justify="center" pad="xxsmall"><Image src={odapp_img} fit="contain" /></Box>  
 
                          <Text align="left" size={size} color="#2B2F36">
                          ODApp is a decentralized application that allows you to connect, or "bridge", between two different
                          blockchains. Specifically, ODApp bridges the world's of 
                          <Anchor label=" PKT Cash" style={{color: '#F0B90C'}} href="https://pkt.cash" /> (symbol: PKT) and Binance smart chain (BSC).
                          Though entirely different blockchains, PKT cash and Binance smart chain can be connected through ODApp to 
                          allow seamless value transfer between the two chains. 
                          </Text>
                      </CardBody>
                  </Card> 
              </Box>  
          ) : (
           
            <Card width="full" round="none" background="light-1" pad="none" >
            <CardHeader background="#56cde0" pad="large" responsive="true" justify="center" height="small">
              <Text textAlign="end" margin="medium" size="3xl" weight="bold" color="white">What's an ODApp?</Text>
            </CardHeader>
            <CardBody> 
            <Grid
            fill
            areas={[
              { name: 'left', start: [0, 0], end: [0, 0] },
              { name: 'right', start: [1, 0], end: [1, 0] },
            ]}
            columns={['flex', 'medium']}
            rows={['flex']}
            gap="none"
            >
            <Box gridArea="left" background="#ffffff" height="medium" justify="center" pad="large"> 
             <Text align="left" size="large" color="#2B2F36">
                  ODApp is a decentralized application that allows you to connect, or "bridge", between two different
                  blockchains. Specifically, ODApp bridges the world's of 
                  <Anchor label=" PKT Cash" style={{color:"#7d4cdb"}} href="https://pkt.cash" /> (symbol: PKT) and Binance smart chain.
                  Though entirely different blockchains, PKT cash and Binance smart chain can be connected through ODApp to 
                  allow seamless value transfer between the two chains. 
              </Text>
            </Box>                    
            <Box gridArea="right" background="#2B2F36"  height="medium" justify="center" pad="none">
              <Image fill src={odapp_img} fit="cover" />
            </Box>
            </Grid>
            </CardBody></Card>


          )}  
      </ResponsiveContext.Consumer>   

     

      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

            <Box pad="medium" size="large">
            <Card pad="none" style={{backgroundColor: '#2B2F36'}}> 
            <CardHeader background="#f0ba30" pad="none" justify="center" height="30%"><h5 style={{color: '#282c34', paddingBottom: '0%'}} align="center">The WPKT Token</h5></CardHeader>
                <CardBody pad="medium">
                    <Box height="xxsmall" justify="center" pad="xxsmall"><Image src={logo} fit="contain" /></Box>  
                    <Text align="left" size={size} color="white">
                    ODApp accomplishes bridging by wrapping your PKT into a ERC20 token called (WPKT), which has a 1-to-1 peg to PKT.
            With WPKT you can access the multi-billion dollar world of Binance smart chain, swap WPKT for ETH 
            (or any ERC20 token), and hold WPKT in any wallet that supports ERC20 tokens.
            <p>Since PKT and WPKT exist on different chains, PKT cannot be sent to the Binance smart chain chain and WPKT cannot be 
            sent to the PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</p>
                    </Text>
                </CardBody>
            </Card> 
            </Box>  
          ) : (   
            <Box>
            <Card width="full" round="none" background="light-1" pad="none" >
              <CardHeader background="#F0B90C" pad="large" responsive="true" justify="center" height="small">
                <Text textAlign="end" margin="medium" size="3xl" weight="bold" color="#282c34">The WPKT Token</Text>
              </CardHeader> 
              <CardBody>
            <Grid
              fill
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}
              columns={['flex', 'medium']}
              rows={['flex']}
              gap="none"
              >
              <Box gridArea="left" background="#2B2F36" height="medium" justify="center" pad="large">                     
                <Text align="left" size={size} color="#ffffff">
                ODApp accomplishes bridging by wrapping your PKT into a ERC20 token called (WPKT), which has a 1-to-1 peg to PKT.
        With WPKT you can access the multi-billion dollar world of Binance smart chain, swap WPKT for ETH 
        (or any ERC20 token), and hold WPKT in any wallet that supports ERC20 tokens.
        <p>Since PKT and WPKT exist on different chains, PKT cannot be sent to the Binance smart chain chain and WPKT cannot be 
        sent to the PKT chain without the ODApp bridge. Using different names allows for easy discernment between the assets.</p>
                </Text>
              {/*<Card width="full" round="xsmall" background="#F0B90C" pad="none" >
              <CardHeader background="#F0B90C" pad="large" responsive="true" justify="center" height="30%">
              <Text textAlign='center' margin='medium' size='xl' weight='bold' color='#282c34'><div id="spply"></div></Text>                
              </CardHeader>
            </Card>*/}
              </Box>
              
              <Box gridArea="right" background="#2B2F36" height="medium" justify="center" pad="small"><Image fill src={logo} fit="contain" /></Box>
            </Grid>
            </CardBody></Card>
            </Box>

          )}  
      </ResponsiveContext.Consumer> 


      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

            <Box pad="medium" size="large">
            <Card pad="none" style={{backgroundColor: 'white'}}>
            <CardHeader background="#7d4cdb" pad="none" justify="center" height="30%"><h5 style={{color: '#ffffff', paddingBottom: '0%'}} align="center">Access DeFi</h5></CardHeader>
                <CardBody pad="medium">  
                    <Text align="left" size={size} color="#2B2F36">
                    Additionally, WPKT allows for participation in the highly profitable world decentralized finance (DeFi). 
            WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap, and earn yields by staking into
            the WPKT / ETH liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it 
            easy to convert back.
                    </Text>
                </CardBody>
            </Card> 
            </Box>  

           
          ) : (   
            <Box>
            <Card width="full" round="none" background="light-1" pad="none" >
            <CardHeader background="#7d4cdb" pad="large" responsive="true" justify="center" height="small">
              <Text textAlign="end" margin="medium" size="3xl" weight="bold" color="white">Access DeFi</Text>
            </CardHeader> 
              <CardBody>
              <Grid
                fill
                areas={[
                  { name: 'left', start: [0, 0], end: [0, 0] },
                  { name: 'right', start: [1, 0], end: [1, 0] },
                ]}
                columns={['medium', 'flex']}
                rows={['flex']}
                gap="none"
                >
                <Box gridArea="left" background="#ffffff" height="medium" justify="center" pad="none">
                  <Image src={defi_wpkt} fit="cover" />
                </Box>                     
                <Box gridArea="right" background="#ffffff"  height="medium" justify="center" pad="large">
                  <Text align="left" size="large" color="#2B2F36">
                    Additionally, WPKT allows for participation in the highly profitable world decentralized finance (DeFi). 
                        WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap, and earn yields by staking into
                        the WPKT / ETH liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it 
                        easy to convert back.
                  </Text>
                </Box>
              </Grid>
            </CardBody></Card>
            </Box>

          )}  

      </ResponsiveContext.Consumer>   



      <ResponsiveContext.Consumer> 
        {size => (size === 'small') ? (

            <Box pad="medium" size="large">
            <Card pad="none" style={{backgroundColor: '#2B2F36'}}>
            <CardHeader background="#56cde0" pad="none" justify="center" height="30%"><h5 style={{color: '#ffffff', paddingBottom: '0%'}} align="center">Discover PKT</h5></CardHeader>
                <CardBody pad="medium">  
                    <Text align="left" size={size} color="white">
                    Additionally, WPKT allows for participation in the highly profitable world decentralized finance (DeFi). 
            WPKT allows you to trade on decentralized exchanges (DEX's) like Pancake Swap, and earn yields by staking into
            the WPKT / ETH liquidity pool. And if you decide to convert your DeFi gains back into PKT, ODApp makes it 
            easy to convert back.
                    </Text>
                </CardBody>
            </Card> 
            </Box>  

           
          ) : (   
            <Box>
            <Card width="full" round="none" background="light-1" pad="none" >
            <CardHeader background="#56cde0" pad="large" responsive="true" justify="center" height="small">
              <Text textAlign="end" margin="medium" size="3xl" weight="bold" color="#282c34">Discover PKT</Text>
            </CardHeader>
            <CardBody> 
            <Grid
            fill
            areas={[
              { name: 'left', start: [0, 0], end: [0, 0] },
              { name: 'right', start: [1, 0], end: [1, 0] },
            ]}
            columns={['flex', 'medium']}
            rows={['flex']}
            gap="none"
            >
            <Box gridArea="left" background="#2B2F36" height="medium" justify="center" pad="large"> 
            <Text align="left" size="large" color="#ffffff">
              PKT is the world's first bandwidth hard mining algorithm which allows you to turn your internet
              bandwidth into cash. The project is creating a bandwidth marketplace which will lower the cost 
              of internet access globally, and promote the decentralized expansion of the web 
              If you don't know what PKT is then click <Anchor label="here" style={{color: '#F0B90C'}} href="https://pkt.cash" /> to find out how PKT is changing the internet as we know it.
              </Text>
            </Box>                    
            <Box gridArea="right" background="#2B2F36"  height="medium" justify="center" pad="none">
              <Image src={pkt_logo} fit="contain" />
            </Box>
            </Grid>
            </CardBody></Card>
            </Box>

          )}  

          
      </ResponsiveContext.Consumer>   

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
              Then select from the nav menu to choose whether you are swapping from PKT to WPKT or 
              WPKT to PKT. If you don't have metamask install it <a href="https://metamask.io/" style={{color:"#7d4cdb"}}>here</a>
              </Text>
              <p align="center">{btn}</p>
              </CardBody>
              </Card>
              </Box>

          ) : (   
            <Box>
            <Card width="full" round="none" background="light-1" pad="none" >
            <CardHeader background="#F0B90C" pad="large" responsive="true" justify="center" height="small">
              <Text textAlign="end" margin="medium" size="3xl" weight="bold" color="#282c34">Connect Your Metamask Wallet</Text>
            </CardHeader>
            <CardBody> 
            <Grid
            fill
            areas={[
              { name: 'left', start: [0, 0], end: [0, 0] },
              { name: 'right', start: [1, 0], end: [1, 0] },
            ]}
            columns={['medium', 'flex']}
            rows={['flex']}
            gap="none"
            >
            <Box gridArea="left" background="#7d4cdb"  height="medium" justify="center" pad="none"><Image fill src={mm_logo} fit="cover" /></Box>
            <Box gridArea="right" background="#7d4cdb" height="medium" justify="center" pad="large"> 
            <Text align="left" size="large"> 
              To get started, use the "Connect Wallet" button to connect your metamask wallet to the bridge. 
              Then select from the nav menu to choose whether you are swapping from PKT to WPKT or 
              WPKT to PKT. If you don't have metamask install it <a href="https://metamask.io/" style={{color:"#F0B90C"}}>here</a>
              </Text>
              <Box pad="medium"><p align="center">{btn}</p></Box>
            </Box>                    
            </Grid>
            </CardBody></Card>
            </Box>

          )}  

          
      </ResponsiveContext.Consumer>  



     
 
        
    </BodyCenteredAlt>                
  </Grommet>
  
      
      
  );
}

export default Home;
