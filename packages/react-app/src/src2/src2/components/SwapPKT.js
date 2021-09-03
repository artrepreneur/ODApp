import React from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

import addresses from "./abi/addresses";
import abis from "./abi/abis";

import { Form, Box, Card, Text, CardBody, Spinner, TextInput, FormField, CardHeader } from "grommet";

import { BodyCenteredAlt, StyledButton } from ".";
import Web3 from "web3";

var pktTID;
var provider;
var signer;
var WPKT; 
var net = 56;//97;
var networkType;
var chainType = "BSC";

if (net===97){
    networkType = "testnet";
}
else if (net===56){
    networkType = "mainnet";
}

async function addWPKT(){

    const tokenAddress = '0x1C25222994531C4AC35E4d94bbf7552c9aa92E32'; //'0x577D11F9ccfC337F32f385Afd1a007222C0388AF'; //
    const tokenSymbol = 'WPKT';
    const tokenDecimals = 18;
    const tokenImage = 'https://odapp.io/WPKTLogo2Large.png'; //'https://odapp.io/3C.png'; 

    try {

        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

    } catch (error) {
        console.log(error);
    }
}


async function handleInput(e){
    var payoutPromiseDone = false;

    const mm_provider = await detectEthereumProvider()  ;

    if (mm_provider !== window.ethereum){
        console.log('Multiple wallets installed');
        return;
    }
    else {
        console.log('window.ethereum is current wallet.');
    }   
   
    // Get the provider.
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    WPKT = new Contract(addresses.WPKT, abis.WPKT, signer); 
    console.log('WPKT:', WPKT);

    // Prevent default behavior
    e.preventDefault();
    pktTID = e.value.PktTID.trim().toString();
    var pktSenderAddr = e.value.PktSenderAddr.trim().toString();
    var ethAddr = e.value.EthAddr.trim().toString();

    var dv = document.getElementById("output");
    var dv1 = document.getElementById("spin");
    //var dv2 = document.getElementById("outputCard");
    var dv3 = document.getElementById("addToken");

    // Reset Interface
    dv.style.display= 'none';
    dv1.style.display= 'none';
    dv3.style.display= 'none';


    var network = await window.ethereum.request({ method: 'net_version' })
    console.log(network, net, (Number(network) === Number(net)));

    if (Number(network)!== Number(net)){
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Connect Metamask to Binance Smart Chain "+networkType+" and resubmit.</h4>";
        dv.style.display= 'block';
        dv1.style.display= 'none'; 
        return;
    }


    // For Gas estimates
    /*await WPKT.estimateGas.mint(ethAddr, Web3.utils.toWei('100000'))
    .then(async function(gasAmount){
        console.log('Gas:', gasAmount.toString()); // in gwei
    });*/

    //var cmd = "https://obeahdev.odapp.io/api/v1/getTransactionBalance/txid/"+pktTID+"/fromAddress/"+pktSenderAddr+"/ethToAddress/"+ethAddr+"/chainType/"+chainType;
    var cmd = "https://obeah.odapp.io/api/v1/getTransactionBalance/txid/"+pktTID+"/fromAddress/"+pktSenderAddr+"/ethToAddress/"+ethAddr+"/chainType/"+chainType;
    //var cmd = "http://localhost:3000/api/v1/getTransactionBalance/txid/"+pktTID+"/fromAddress/"+pktSenderAddr+"/ethToAddress/"+ethAddr+"/chainType/"+chainType;
    console.log('cmd', cmd);
    dv1.style.display= 'block';
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
    dv.style.display= 'block';
    dv3.style.display= 'block';
    

    fetch(cmd)
    .then((response) => response.json())
    .then( async (result) => {
        console.log('Data:', result.output);

        var complete = false; 
        var keyExists = false;

        try { 
            if ((Number(result.output) === -1)){
                // Check if tx is complete in contract 
                keyExists = await WPKT.keyExists(pktTID);
                if (!keyExists){
                    console.log('Transaction Failure.');
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Not approved for payout. Try again later.</h6>";
                    dv1.style.display= 'none';
                    return;
                }
                else {
                    complete = await WPKT.complete(pktTID);
                    console.log("Payout complete?:",complete);
                }
                
            }
        }
        catch (err){
            console.log('Transaction Failure.', err);
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
            if (err.toString().includes('unknown account')){ 
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet.</h6>";
            }
            dv1.style.display= 'none';
            return;
        }    
        

        // Possible for result.output == -1 and !complete implying dupe transaction, but payout never occurred.
        if ((Number(result.output) > 0) || ((Number(result.output) === -1) && !complete)){ 
            
            if (mm_provider) {
                
        
                // Submit to smart contract - 
                var options = {
                    gasLimit: 10000000,//5000000
                    gasPrice: 61000000000//25000000000
                };  
                
            
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
                dv.style.display= 'block';

                /*
                var network = await window.ethereum.request({ method: 'net_version' })
                console.log(network, net, (Number(network) === Number(net)));

                if (Number(network)!== Number(net)){
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Connect Metamask to Binance smart chain "+networkType+" and resubmit.</h4>";
                    dv1.style.display= 'none'; 
                    return;
                }*/
                 
                try{
    
                    var tx = await WPKT.retrieveWpktPayout(pktTID);
                
                    console.log('TX:',tx);
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction ID:</h4><Text margin='small' >" + tx.hash + "</Text><h4 style={{backgroundColor: '#2B2F36'}}>Please wait for on-chain confirmation...</h4>";
                    
                    WPKT.on("PayoutComplete", (recip, amount) => {
                        payoutPromiseDone = true;
                        console.log('Recipient:',recip);
                        console.log('Amount:', amount.toString());
                        var amtNoWei = Web3.utils.fromWei(amount.toString());
                        var fees = ((amtNoWei / .965) - amtNoWei);
                        var feesNoWei = fees.toFixed(2); //Math.round(fees);
                        console.log("Amount:", amtNoWei, 'Fees:', feesNoWei);

                        if (Number(amtNoWei) > 0) {
                            if (receipt !== undefined) {
                                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction Complete.</h4><h6 style={{backgroundColor: '#2B2F36'}}><b>Your transaction hash is " + receipt.transactionHash + "</h6>";
                            }
                            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You received "+amtNoWei+" WPKT tokens.</h6>";
                            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your fees were "+feesNoWei+" WPKT.</h6>";
                            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>If the WPKT token hasn't already been added to your wallet yet, use the button below to add it. </h6>";
                            dv3.style.display= 'block';
                            dv1.style.display= 'none';
                            return;
                        }
                        else {
                            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failed.</h4>";
                            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Bad transaction. Check your sender / recipient address pair or transaction id. </h6>";
                            dv1.style.display= 'none';
                            return;
                        }
                    });


                    var receipt = await tx.wait();
                    console.log('Receipt:', receipt, (receipt.status === 1));

                    

                    if (receipt.status !== 1) {
                        console.log('Transaction Failure.');
                        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>"; 
                        dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>It's possible you have already claimed this transaction.</h6>";
                        dv1.style.display= 'none'; 
                        return;  
                    }
                    else {
                        console.log('Receipt received');
                    }

                    
                 
                }
                catch (err) {
                     dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
                    if (err.toString().includes('unknown account')){ 
                        dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet.</h6>";
                    }
                    //dv2.style.display= 'block';
                    dv1.style.display= 'none';
                    return;
                }
            } 
            else {
                console.log('Metamask not running. Is it installed?');
                dv.style.display='block';
                //dv2.style.display= 'block';
                //dv1.style.display='none';
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Please Install <a href='https://metamask.io/download.html' style='color:#F0B90C;' />Metamask</a></h4>";  
                return;   
            }
        }    
        else if (Number(result.output) === -1)  {
            console.log('Duplicate transaction.');
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You can't claim the same transaction more than once.</h6>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>If the WPKT token hasn't already been added to your wallet yet, use the button below to add it. </h6>";
            dv.style.display= 'block';
            dv3.style.display= 'block';
            dv1.style.display= 'none';
            return;
           
        }
        else if (Number(result.output) === -2)  {
            console.log('Bad address.');
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your sender / recipient address pair was not pre-commited. Click <a href='./PreCommit' style='color:#F0B90C;' />here</a> to pre-commit an address pair. </h6>";
            dv.style.display= 'block';
            dv1.style.display= 'none';
            return;
        }
        else if (Number(result.output) === -3)  {
            console.log('Gas price error.');
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Non-specific gas price error.</h6>";
            dv.style.display= 'block';
            dv1.style.display= 'none';
            return;
        }
        else if (Number(result.output) === -4)  {
            console.log('Unknown Error.');
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Unknown error.</h6>";
            dv.style.display= 'block';
            dv1.style.display= 'none';
            return;
        }
        else {
            console.log('Bad transaction.');
            dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}> Either transaction doesn't exist or it was for a zero amount.</h6>";
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}> It is possible you used a different pkt address for this transaction.</h6>";
            dv.style.display= 'block';
            dv1.style.display= 'none';
            return;
        }
    }).catch(function(err) {
        console.log("error", err);
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
        dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>There was a problem communicating with the bridge servers.</h6>";
        dv.style.display= 'block';
        dv1.style.display= 'none';
        return;
    });
}



function SwapPKT() {//{wpkt}
    //WPKT = {wpkt};
    return (
        <Box>
        <BodyCenteredAlt>
            <Card width="xlarge" background="light-1" pad="none" >
                <CardHeader background="#F0B90C" pad="none" responsive="true" justify="center" height="xsmall">
                        <h2 align="center">Swap PKT to WPKT</h2> 
                </CardHeader>          
                <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
                <Text align="center" size="large" style={{paddingLeft: '5%', paddingRight: '4%'}}> 
                    Enter your PKT transaction ID, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.
                </Text>
                
                <div id="stdiv" align="center" style={{padding: '5%'}}>
                    
                    <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>

                        <CardBody>                
                            <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                
                                <Box width="80%">
                                    <h4 style={{color: '#F0B90C'}}>Enter PKT Transaction ID and BSC Address: </h4>
                                    <FormField name="PktTID" required>
                                        <TextInput style={{background: 'white', color: '#2B2F36'}} name="PktTID" placeholder={<Text size="small">Enter PKT Transaction ID</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required>
                                        <TextInput style={{background: 'white', color: '#2B2F36'}} name="PktSenderAddr" placeholder={<Text size="small">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required>
                                        <TextInput style={{background: 'white', color: '#2B2F36'}} name="EthAddr" placeholder={<Text size="small">Enter BSC Recipient Address</Text>} />
                                    </FormField>
                                    <StyledButton size='large' color='#F0B90C' type="submit" label="Submit" />
                                </Box>
                            
                            </Form>

                        </CardBody>
                    </Card>
                    
                        <div style={{paddingTop: '2%'}}>
                            <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                <div hidden align="center" id="output" style={{padding:'2%'}}>
                                </div>
                                <div id="spin" hidden pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>  
                                <div hidden align="center" id="addToken" style={{padding:'2%'}}>
                                    <StyledButton size='large' color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/> 
                                </div> 
                            </Box>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </BodyCenteredAlt>
        </Box>
  );

  
  
}

export default SwapPKT;
