import React from "react";
import { Contract } from "@ethersproject/contracts";
import { Form, Box, Card, Text, CardBody, TextInput, Spinner, FormField, CardHeader } from "grommet";
import { BodyCenteredAlt, StyledButton } from ".";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

import addresses from "./abi/addresses";
import abis from "./abi/abis";
import Web3 from "web3";

var provider;
var signer;
var WPKT; 
var WPKTAmount;
var amtNoWei;
var feesNoWei;
var PKTAddr;
var ethTxHash;
var dv, dv1, dv2, dv3, dv4, dv5;
var net = 4;//1



async function handleInput(e){
  dv = document.getElementById("output1");
  dv1 = document.getElementById("spin");
  dv2 = document.getElementById("div1");
  dv3 = document.getElementById("recPKT");
  e.preventDefault();
  WPKTAmount = e.value.WPKTAmount.trim();
  
  if(isNaN(WPKTAmount)){
    dv.style.display= 'block';
    dv2.style.display= 'block';
    console.log('WPKT amount is not a number');
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your amount must be a number.</h4>";
    return;
  }

  PKTAddr = e.value.PKTAddr.trim().toString();
  console.log('WPKT Amount to Convert:', WPKTAmount, 'PKTC Recipient Address:', PKTAddr);
  if (PKTAddr.charAt(0) == '0'){
    console.log("Bad Address");
    dv.style.display= 'block';
    dv2.style.display= 'block';
    dv1.style.display= 'none'; 
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Bad PKTC Recipient Address.</h4>";  
    return;
  }
  
  // Check that bridge has pkt.
  var chkCmd = "https://explorer.pkt.cash/api/v1/PKT/pkt/address/pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz";
  var bal = 0;
  fetch(chkCmd)
    .then((response) => response.json())
    .then(async (result) => {
      bal = Number(result.balance);
      console.log('Data:', result.balance,(bal > 0));
      if (bal <= 0){
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your Transaction Cannot be Processed.</h4>";  
        dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>The bridge hot wallet is paused until refilled.</h6>";  
        dv.style.display= 'block';
        dv1.style.display= 'none'; 
        dv2.style.display= 'block';
        return;
      }
      else{

        const mm_provider = await detectEthereumProvider();  
        if (mm_provider) {
          if (mm_provider !== window.ethereum){
            console.log('Multiple wallets installed');
            return;
          }
          else {
              console.log('window.ethereum is current wallet.');
          }

          provider = new ethers.providers.Web3Provider(window.ethereum);
          signer = provider.getSigner();
          WPKT = new Contract(addresses.WPKT, abis.WPKT, signer); 
          console.log('WPKT:', WPKT); 

          var network = await window.ethereum.request({ method: 'net_version' })
          console.log(network);
          if (Number(network)!= Number(net)){
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Connect Metamask to Ethereum Mainnet.</h4>";
              dv1.style.display= 'none'; 
              dv.style.display= 'block';
              dv2.style.display= 'block';
              return;
          }

          // Submit to smart contract - 
          var options = {
              gasLimit: 10000000, //5000000
              gasPrice: 61000000000 //25000000000
          };

          // Encode PKTC address as an ETH address. To be used as an on-chain record.
          var pktEncodedAddr = Web3.utils.soliditySha3(PKTAddr.toString());
          pktEncodedAddr = '0x' + pktEncodedAddr.slice(pktEncodedAddr.length-40, pktEncodedAddr.length);
          console.log('PKTC Encoded Address', pktEncodedAddr);
          console.log('Is Address', ethers.utils.isAddress(pktEncodedAddr));
          
          dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
          dv.style.display= 'block';
          dv1.style.display= 'block';
          dv2.style.display= 'block';
          

          var WPKTAmtWei = WPKTAmount * (10 ** 18); 
          console.log('Wei Amount:', WPKTAmtWei);

          try {

            var tx = await WPKT.convertToPkt(pktEncodedAddr, WPKTAmtWei.toString());//, options);
            console.log('TX:',tx);
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction ID:</h4><Text margin='small' >" + tx.hash + "</Text><h4 style={{backgroundColor: '#2B2F36'}}>Please wait for confirmation...</h4>";
            
            var receipt = await tx.wait();
            console.log('Receipt:', receipt, (receipt.status === 1));
            //dv1.style.display= 'none';

            await WPKT.on("Sold", (amount) => {
                ethTxHash = tx.hash;
                amount = Web3.utils.fromWei(amount.toString());
                console.log(amount);
                console.log(amount.toString());
                var fees = ((amount / .965) - amount);
                var originalAmt = (amount / .965);
                amtNoWei = amount;
                feesNoWei = fees;
                console.log("Amount:", amtNoWei, 'Fees:', feesNoWei, 'Original Amt:', originalAmt);
                if (Number(amtNoWei) > 0) {
                    dv1.style.display= 'none';
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>WPKT Successfully Sent</h4><h6 style={{backgroundColor: '#2B2F36'}}><b>Your WPKT transaction hash is " + receipt.transactionHash + "</h6>";
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You sent "+originalAmt+" WPKT tokens to the WPKT contract.</h6>";
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your fees were "+feesNoWei+" WPKT.</h6>";
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>After fees you will receive "+amtNoWei+" PKTC.</h6>";
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Use the button \"Claim PKTC\" to complete the bridge and receive your PKTC. Please save your transaction hash. <p>If there are any issues you can always use your transaction hash to retrieve your PKTC.</p></h6>";
                    dv3.style.display= 'block';
                }
            });

            
            
            if (receipt.status !== 1) {
                console.log('Transaction Failure.');
                dv1.style.display= 'none';
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";  
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Make sure your entered the correct address and amount.</h6>";   
                return;
            }
            else {
              console.log('Transaction Receipt Success.');
            }
            
       

          }
          catch (err) {
              console.log('Transaction Failure.', err, (err.toString().indexOf('unknown') !== -1 ));
              dv1.style.display='none';
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";

              if (err.toString().indexOf('unknown') !== -1 ){
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Make sure you are logged into Metamask.</h6>";   
              }
              else {
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Make sure your entered the correct address and amount.</h6>";   
              }
          }
        }
        else{
          console.log('Metamask not running. Is it installed?');
          dv.style.display='block';
          dv2.style.display= 'block';
          dv1.style.display='none';
          dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Please Install <a href='https://metamask.io/download.html' style='color:#F0B90C;' />Metamask</a></h4>";
        }
      }
    }).catch(function() {
      console.log('No data returned');
    });
 
   

  
}

function hideForm(){
  var elem1 = document.getElementById("ConvertWPKTtoPKT");
  elem1.style.display = "none";
}

function getPKT(){
  console.log('In get pkt');
  dv1 = document.getElementById("spin");
  dv3 = document.getElementById("recPKT");
  dv4 = document.getElementById("div2"); 
  dv5 = document.getElementById("output2");

  dv1.style.display= 'block';

  try {

    var cmd = "https://obeah.odapp.io/api/v1/userPayout/txHash/"+ethTxHash+"/address/"+PKTAddr+"/";
    console.log(cmd);
    fetch(cmd)
    .then((response) => response.json())
    .then((result) => {
      console.log('Data:', result.data);
      //dv3.style.display= 'none';//remove button
      if (result.data.toString().includes('Payout Transaction Hash')){
        dv1.style.display= 'none';
        dv5.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>PKTC Payout Complete</h4>";
        dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your PKTC transction hash is: "+result.hash+"</h6>";
        dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You were sent "+amtNoWei+" PKTC cash.</h6>";
        dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your fees were "+feesNoWei+" WPKT.</h6>";
        dv3.style.display= 'none'; 
      }
      else if (result.data.toString().includes('already been paid out')){    
        dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>This transaction has already been paid out.</h6>";
        if (!result.err2) {
          console.log("POT:",result.POT.toString(),"TID", result.TID.toString());
          dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>The transaction hash is:"+result.TID.toString()+"</h6>";
        } 
      }
      else {
        dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Vault failed to pay out. Check transaction id's and try resubmission</h6>";            
        dv1.style.display= 'none'; 
      }
      dv4.style.display= 'block'; 
      dv5.style.display= 'block';
    }).catch(function() {
      console.log('Server Down.');
      dv5.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
      dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>There was a problem communicating with the bridge servers.</h6>";
      dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Save your transaction ID and try to claim again in a few minutes.</h6>";
      dv5.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You can also use the \"Claim PKTC\" menu item below.</h6>";
      dv1.style.display= 'none'; 
      dv4.style.display= 'block'; 
      dv5.style.display= 'block';
    });

  } //try
  catch (err) {
      console.log('Transaction Failure.', err);
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
      dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Make sure your entered the correct address and amount.</h6>";   
  }    
}

function WPKTToPKT() {
  const history = useHistory();
  const navigateTo = () => {
    console.log('OK to receive PKTC.', history);
    history.push('/GetPKT')
  }

  
  return (
    <Box> 
      
      <BodyCenteredAlt>
        <Card width="xlarge" background="light-1" pad="none" >     
            <CardHeader background="#F0B90C" pad="none" justify="center" height="xsmall">
                  <h2 align="center">Get PKTC</h2>
            </CardHeader>   
            <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 

            <Text size="large" textAlign="left" margin="small" style={{paddingLeft: '5%', paddingRight: '5%'}}>To convert your WPKT to PKTC just use the DApp below. Enter the amount
            of WPKT you wish to convert, and the PKTC address which will recieve the PKTC.
            Be sure to enter a PKTC address and not an ethereum address. 
            </Text>
            <div style={{padding: '5%'}} align="center">
              <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                <CardHeader justify="center"><h4 style={{color: '#F0B90C'}}>Enter WPKT Amount and PKTC Recipient Address:</h4></CardHeader>
                <CardBody>  
                  <Form name="ConvertWPKTtoPKT" id="ConvertWPKTtoPKT" onSubmit={handleInput}>
                    <Box width="80%">
                        <FormField name="WPKTAmount" required>
                            <TextInput style={{background: 'white', color: '#2B2F36'}} name="WPKTAmount" placeholder={<Text size="small">Enter Amount of WPKT to Convert</Text>} />
                        </FormField>
                        <FormField name="PKTAddr" required>
                            <TextInput style={{background: 'white', color: '#2B2F36'}} name="PKTAddr" placeholder={<Text size="small">Enter PKTC Recipient Address</Text>} />
                        </FormField>
                        <StyledButton primary size='large' color='#F0B90C' type="submit" label="Submit"/>
                    </Box>
                  </Form>
  
                </CardBody>
              </Card>  
              <div hidden id="div1" style={{paddingTop: '2%'}}>
              
                <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                    <div hidden align="center" id="output1" style={{padding:'2%'}}></div>  
                    <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                        <StyledButton size='large' color='#F0B90C' label='Claim PKTC' onClick={() => getPKT()}/>
                    </div> 
                    <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                </Box>
              </div>
              
              <div hidden id="div2" style={{paddingTop: '2%'}}>
                <Box id="box2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                  <div hidden align="center" id="output2" style={{padding:'2%'}}></div> 
                </Box>  
              </div>  
            </div>  
            </CardBody>
        </Card>
   
    </BodyCenteredAlt>
    </Box>
    
  );
}

export default WPKTToPKT;
