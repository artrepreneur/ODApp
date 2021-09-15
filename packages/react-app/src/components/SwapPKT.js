import React from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

import addresses from "./abi/addresses";
import abis from "./abi/abis";

import { Grid, Form, Box, Card, Text, CardBody, Spinner, TextInput, FormField, Heading, ResponsiveContext, Grommet } from "grommet";

import { ButtonForm, StyledButton,HeadingDark, StyledTextDark, customBreakpoints } from ".";
import Web3 from "web3";

var pktTID;
var provider;
var signer;
var WPKT;
var net = 56;
var networkType;
var chainType = "BSC";

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

if (net===97){
    networkType = "testnet";
}
else if (net===56){
    networkType = "mainnet";
}

async function addWPKT(){

    const tokenAddress = '0x1C25222994531C4AC35E4d94bbf7552c9aa92E32';
    const tokenSymbol = 'WPKT';
    const tokenDecimals = 18;
    const tokenImage = 'https://odapp.io/WPKTLogo2Large.png';

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
    console.log('cmd', cmd);
    dv1.style.display= 'block';
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Checking PKT Chain</h6>";
    dv.style.display= 'block';
    dv3.style.display= 'none';

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
                    dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Problem processing transaction.</h6>";
                    dv1.style.display= 'none';
                    console.log('Number:',Number(result.output), 'Complete:',complete);
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
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction Hash:</h4><Text margin='small' >" + tx.hash + "</Text><h4 style={{backgroundColor: '#2B2F36'}}>Please wait for on-chain confirmation...</h4>";

                    WPKT.on("PayoutComplete", (recip, amount) => {
                        payoutPromiseDone = true;
                        console.log('Recipient:',recip);
                        console.log('Amount:', amount.toString());
                        var amtNoWei = Web3.utils.fromWei(amount.toString());
                        var fees = ((amtNoWei / .965) - amtNoWei);
                        var feesNoWei = fees.toFixed(4); //Math.round(fees);
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
                            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Bad transaction. Check your sender / recipient address pair or transaction hash. </h6>";
                            dv1.style.display= 'none';
                            return;
                        }
                    });


                    var receipt = await tx.wait();
                    console.log('Receipt:', receipt, (receipt.status === 1));


                    if (receipt.status !== 1) {
                        console.log('Transaction Failure.');
                        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed.</h4>";
                        dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>It's possible you have already claimed this transaction.</h6>";
                        dv1.style.display= 'none';
                        return;
                    }
                    else {
                        console.log('Receipt received');
                    }



                }
                catch (err) {
                    console.log('Error:', err);
                    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
                    if (err.toString().includes('unknown account')){
                      dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet to this site.</h6>";
                    }
                    else if (err.code.toString().includes('-32603')){
                      dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>"+err.data.message+"</h6>";
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
    //window.scrollTo(0,document.body.scrollHeight);

}



function SwapPKT() {//{wpkt}
    //WPKT = {wpkt};
    return (
    <Grommet theme={customBreakpoints}>
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                            <Box background="#fff" justify="center" alignSelf="center">
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Swap PKT to WPKT</HeadingDark>
                                <StyledTextDark textAlign="center">Enter your PKT Transaction Hash, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.</StyledTextDark>
                            </Box>
                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                                <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                                <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter PKT Transaction Hash and WPKT Address: </Heading>
                                <Box justify="center" alignSelf="center">
                                    <FormField name="PktTID" required contentProps={{ border: false, margin: "0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktTID" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Transaction Hash</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktSenderAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter WPKT Recipient (BSC) Address</Text>} />
                                    </FormField>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                                </Box>
                                </Form>
                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%'}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%'}}><Spinner size="large" /></div>
                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%'}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
                                </Box>
                            </Box>
                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'small') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                            <Box background="#fff" justify="center" alignSelf="center">
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Swap PKT to WPKT</HeadingDark>
                                <StyledTextDark textAlign="center">Enter your PKT Transaction Hash, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.</StyledTextDark>
                            </Box>
                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                                <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                                <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter PKT Transaction Hash and WPKT Address: </Heading>
                                <Box justify="center" alignSelf="center">
                                    <FormField name="PktTID" required contentProps={{ border: false, margin: "0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktTID" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Transaction Hash</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktSenderAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter WPKT Recipient (BSC) Address</Text>} />
                                    </FormField>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                                </Box>
                                </Form>
                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%'}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%'}}><Spinner size="large" /></div>
                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%'}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
                                </Box>
                            </Box>
                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'tablet') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="75px 30px 100px">
                    <CardBody>
                            <Box background="#fff" justify="center" alignSelf="center">
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Swap PKT to WPKT</HeadingDark>
                                <StyledTextDark textAlign="center">Enter your PKT Transaction Hash, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.</StyledTextDark>
                            </Box>
                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                                <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                                <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter PKT Transaction Hash and WPKT Address: </Heading>
                                <Box justify="center" alignSelf="center">
                                    <FormField name="PktTID" required contentProps={{ border: false, margin: "0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktTID" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Transaction Hash</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktSenderAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthAddr" placeholder={<Text weight="normal" size="18px" color="#707070">Enter WPKT Recipient (BSC) Address</Text>} />
                                    </FormField>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                                </Box>
                                </Form>
                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>
                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
                                </Box>
                            </Box>
                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'medium') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="150px 50px">
                    <CardBody>
                        <Grid fill areas={[ { name: 'left', start: [0, 0], end: [0, 0] }, { name: 'right', start: [1, 0], end: [1, 0] },]}
                            columns={['1/2', 'flex']} alignContent="center" justifyContent="between" rows={['flex']} gap="none"
                            background="#fff">
                            <Box gridArea="left" background="#fff" justify="center" alignSelf="start">
                                <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Swap PKT to WPKT</HeadingDark>
                                <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>Enter your PKT Transaction Hash, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.</StyledTextDark>
                            </Box>
                            <Box gridArea="right" background="#fff" justify="end" alignSelf="center" pad="0">
                                <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>
                                <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter PKT Transaction Hash and WPKT Address: </Heading>
                                <Box justify="center" alignSelf="center">
                                    <FormField name="PktTID" required contentProps={{ border: false, margin: "0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktTID" placeholder={<Text weight="normal" size="20px" color="#707070">Enter PKT Transaction Hash</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PktSenderAddr" placeholder={<Text weight="normal" size="20px" color="#707070">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthAddr" placeholder={<Text weight="normal" size="20px" color="#707070">Enter WPKT Recipient (BSC) Address</Text>} />
                                    </FormField>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                                </Box>
                                </Form>
                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" height="100%" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>
                                        <div hidden align="center" height="100%" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
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
                        <Grid fill areas={[ { name: 'left', start: [0, 0], end: [0, 0] }, { name: 'right', start: [1, 0], end: [1, 0] },]}
                            columns={['1/2', 'flex']} alignContent="center" justifyContent="between" rows={['flex']} gap="none"
                            background="#fff">
                            <Box gridArea="left" background="#fff" height={{ min: "85vh" }} justify="center" alignSelf="start">
                                <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Swap PKT to WPKT</HeadingDark>
                                <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>Enter your PKT Transaction Hash, the address you sent your PKT from, and the BSC address you would like your WPKT sent to.</StyledTextDark>
                            </Box>
                            <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0">
                                <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "xlarge" }} round="25px" justify="center" alignSelf="center" style={formWrapStyle}>
                                <Form name="inputPktTID" id="inputPktTID" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="24px" margin={{ bottom: "50px", top: "0" }}  textAlign="center">Enter PKT Transaction Hash and WPKT Address: </Heading>
                                <Box justify="center" alignSelf="center">
                                    <FormField name="PktTID" required contentProps={{ border: false, margin: "0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="PktTID" placeholder={<Text weight="normal" size="24px" color="#707070">Enter PKT Transaction Hash</Text>} />
                                    </FormField>
                                    <FormField name="PktSenderAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="PktSenderAddr" placeholder={<Text weight="normal" size="24px" color="#707070">Enter PKT Sender Address</Text>} />
                                    </FormField>
                                    <FormField name="EthAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                        <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="EthAddr" placeholder={<Text weight="normal" size="24px" color="#707070">Enter WPKT Recipient (BSC) Address</Text>} />
                                    </FormField>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                                </Box>
                                </Form>
                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" height="100%" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>
                                        <div hidden align="center" height="100%" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
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

export default SwapPKT;
