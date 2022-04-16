import React from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
//import detectEthereumProvider from '@metamask/detect-provider';
import { Card, CardBody, Grid, Heading, Box, ResponsiveContext, Grommet } from "grommet";
import { ButtonForm, HeadingDark, StyledTextDark, customBreakpoints } from ".";
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
var formWrapStyleMed = {
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)",
  width: "80%"
};
var formWrapStyleMob = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  minWidth: "50vw",
  width: "auto"
};

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
    <Grommet theme={customBreakpoints}>
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
          <Box background="#fff">
              <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                      <Box background="#fff" justify="center" alignSelf="center">
                          <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="center">To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.  <br/><br/>For security, you will need to wait about 7 minutes to claim your WPKT. For transactions greater than 7 million PKT will take 3 hours to complete. </StyledTextDark>
                      </Box>
                      <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                          <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{ wordBreak: "break-all", color: "#222323", background: 'white', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px", wordBreak: "break-all"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>
                    </CardBody>
              </Card>
          </Box>
        ) : (responsive === 'small') ? (
          <Box background="#fff">
              <Card width="full" round="none" background="#fff" pad="75px 30px 100px">
                    <CardBody>
                      <Box background="#fff" justify="center" alignSelf="center">
                          <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="center">To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.  <br/><br/>For security, you will need to wait about 7 minutes to claim your WPKT. For transactions greater than 7 million PKT will take 3 hours to complete. </StyledTextDark>
                      </Box>
                      <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                          <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{ wordBreak: "break-all", color: "#222323", background: 'white', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px", wordBreak: "break-all"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>
                    </CardBody>
              </Card>
          </Box>
        ) : (responsive === 'tablet') ? (
          <Box background="#fff">
              <Card width="full" round="none" background="#fff" pad="75px 50px 100px">
                    <CardBody>
                      <Box background="#fff" justify="center" alignSelf="center">
                          <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="center">To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.   <br/><br/>For security, you will need to wait about 7 minutes to claim your WPKT. For transactions greater than 7 million PKT will take 3 hours to complete. </StyledTextDark>
                      </Box>
                      <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                          <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{ wordBreak: "break-all", color: "#222323", background: 'white', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px", wordBreak: "break-all"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>
                    </CardBody>
              </Card>
          </Box>
        ) : (responsive === 'medium') ? (
          <Box background="#fff">
              <Card width="full" round="none" background="#fff" pad="150px 50px">
                    <CardBody>
                      <Grid
                      fill
                      areas={[
                        { name: 'left', start: [0, 0], end: [0, 0] },
                        { name: 'right', start: [1, 0], end: [1, 0] },
                      ]}
                      columns={['1/2', 'flex']}
                      alignContent="center"
                      justifyContent="between"
                      rows={['flex']}
                      gap="none"
                      background="#fff"
                      >
                      <Box gridArea="left" background="#fff" justify="center" alignSelf="start">
                          <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.   <br/><br/>For security, you will need to wait about 7 minutes to claim your WPKT. For transactions greater than 7 million PKT will take 3 hours to complete. </StyledTextDark>
                      </Box>
                      <Box gridArea="right" background="#fff" justify="center" alignSelf="center" pad="0">
                          <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "medium" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{ wordBreak: "break-all", color: "#222323", background: 'white', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>
                      </Grid>
                    </CardBody>
              </Card>
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
                      alignContent="center"
                      justifyContent="between"
                      rows={['flex']}
                      gap="none"
                      background="#fff"
                      >
                      <Box gridArea="left" background="#fff" height={{ min: "85vh" }} justify="center" alignSelf="start">
                          <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Get WPKT</HeadingDark>
                          <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, using the PKT wallet of your choice. Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this transaction ID to get your PKT onto BSC's chain.   <br/><br/>For security, you will need to wait about 7 minutes to claim your WPKT. For transactions greater than 7 million PKT will take 3 hours to complete. </StyledTextDark>
                      </Box>
                      <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0">
                          <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "medium" }} round="25px" justify="center" alignSelf="center" style={formWrapStyle}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="24px" margin={{ bottom: "50px", top: "0", horizontal: "0" }}  textAlign="center">Send Your PKT Here: </Heading>
                            <Box justify="center" alignSelf="center">
                              <div style={{ wordBreak: "break-all", color: "#222323", background: 'white', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px"}} align="center">pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "50px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Next" onClick={navigateTo}/>
                            </Box>
                          </Box>
                      </Box>
                      </Grid>
                    </CardBody>
              </Card>
          </Box>
        )}
    </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default PKTToWPKT;
