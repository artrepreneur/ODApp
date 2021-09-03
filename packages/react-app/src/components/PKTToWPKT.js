import React from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
//import detectEthereumProvider from '@metamask/detect-provider';
import { Card, CardBody, CardHeader, Box, Text } from "grommet";
import { Image, BodyCenteredAlt, StyledButton } from ".";
import { useHistory } from "react-router-dom";
//import styled from 'styled-components';
import addresses from "./abi/addresses";
import abis from "./abi/abis";
import Web3 from "web3";

var provider;
var signer;
var WPKT; 

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
    <Box>
    <BodyCenteredAlt>
      <Card width="large" background="light-1" pad="none">
              <CardHeader background="#F0B90C" pad="none" responsive="true" justify="center" height="xsmall">
                <h2 align="center">Get WPKT</h2> 
              </CardHeader>          
              <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>  
             <Text size="medium" textAlign="left" margin="small">To convert your PKT to WPKT you will first need to send your PKT to ODApp's "VAULT" address, seen below, using the PKT wallet of your choice. 
              Be sure to save your transaction ID, which is provided by your wallet, as proof of your transaction. You will need this <Text style={{fontWeight: "bold"}}>transaction ID</Text> to get your PKT onto BSC's chain. </Text>
                <Card style={{backgroundColor: '#2B2F36'}}>
                    <CardBody pad="large">
                    <h4 align="center" style={{color: '#F0B90C'}}>Send Your PKT Here: </h4>
                    <div style={{color:'#DEE0E2', paddingBottom:'5%'}} align="center"> pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</div>
                    <StyledButton primary size='large' color='#F0B90C' label="Next" onClick={navigateTo}/>
                    </CardBody>
                </Card>
              {/*<Card pad='small' justify='center' width='100%'>
              <div id="spply">
              </div>
              </Card>*/}
              </CardBody>
        </Card>  
    </BodyCenteredAlt> 
    </Box> 
  );
}

export default PKTToWPKT;
