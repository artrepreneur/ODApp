import React from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
//import detectEthereumProvider from '@metamask/detect-provider';
import { Card, CardBody, Grid, Heading, CardHeader, Box, Text, ResponsiveContext } from "grommet";
import { Image, BodyCenteredAlt, StyledButton, HeadingDark, StyledTextDark } from ".";
import { useHistory } from "react-router-dom";
//import styled from 'styled-components';
import addresses from "./abi/addresses";
import abis from "./abi/abis";
import Web3 from "web3";

var provider;
var signer;
var WPKT;

var formWrapStyle = {
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)",
  width: "85%"
}

async function getSupply() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  WPKT = new Contract(addresses.WPKT, abis.WPKT, signer); 
  var supply = await WPKT._currentSupply();
  var supplyNoWei = Web3.utils.fromWei(supply.toString());
  console.log('supply:', parseFloat(supplyNoWei).toFixed(2));
  var dv = document.getElementById("spply");
  dv.style.display= 'block';
  dv.innerHTML = "<h6 align='center'>Total WPKT Supply To Date: "+Math.round(supplyNoWei*1000000000)/1000000000+" Minted</h6>";
} 

/*
var pktAddr = "";
var ethAddr = "";

function createSecret(pktAddr, ethAddr){
  var hashedPktAddr = Web3.utils.soliditySha3(pktAddr);
  var hashedEthAddr = Web3.utils.soliditySha3(ethAddr);
  secret = Web3.utils.soliditySha3(hashedPktAddr + hashedEthAddr);
  return secret;
}

function testSecret(secret, pktAddr, ethAddr){
  //call obeahBridge, returns 0 if secret doesn't match, else returns as expected
}
*/

function PKTToWPKT() {
  //getSupply();
  const history = useHistory();
  const navigateTo = () => {
    console.log('Moving on to swapping...', history);
    history.push('/SwapPKT')
  }
  return (
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'small') ? (
          <Box>
          </Box>
        ) : (responsive === 'medium') ? (
          <Box>
          </Box>
        ) : (
          <Box background="#fff">
              <Card width="full" round="none" background="#fff" pad="0 8rem" size="large">
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
                      <Box gridArea="left" background="#fff" height={{ min: "85vh" }} justify="center" alignSelf="center">
                          <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, seen below, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.</StyledTextDark>
                      </Box>
                      <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0">
                          <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="center" alignSelf="center" style={formWrapStyle}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="24px" margin={{ bottom: "50px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{color: "#222323", background: 'white', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px", marginBottom: "35px"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <StyledButton hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>                    
                      </Grid>
                    </CardBody>
              </Card>
          </Box>
        )}
    </ResponsiveContext.Consumer>
  );
}

export default PKTToWPKT;
