import React, { useState } from "react";
import { useCookies } from 'react-cookie';
//import { BLOCKCHAIN_NAME, Configuration, SDK, WalletProvider, TRADE_TYPE, TradeType } from 'rubic-sdk'; //For Future Routes.
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';
import { useLocation } from "react-router-dom";

import addresses from "./abi/addresses";
import abis from "./abi/abis";
import { Grid, Form, Box, Card, Text, CardBody, Spinner, TextInput, FormField, Heading, ResponsiveContext, RadioButtonGroup, Grommet, Menu} from "grommet";
import { ButtonForm, StyledButton, HeadingDark, StyledTextDark, customBreakpoints } from ".";
import Web3 from "web3";

import ethLogo from "../img/eth.svg";
import bscLogo from "../img/bsc2.svg";
import maticLogo from "../img/matic.svg";
import { Blank, FormDown } from 'grommet-icons';

var pktTID;
var provider;
var signer;
var Obeah_Bsc = null;
var Obeah_Eth = null;
var Obeah_Matic = null;
var fromWPKTAddr;
var WPKT_Con;
var wpktBscAddr = addresses.WPKT;
var wpktEthAddr = addresses.WPKT_Eth;
var wpktMaticAddr = addresses.WPKT_Matic;
var ObeahContractBurn, ObeahContractMint;
var networkType;
var chainType = "BSC";
var tokenAddress = wpktBscAddr;//**
var fromNetRadio, toNetRadio;
var fromChainId, toChainId;
var bscNetId = 97;
var ethNetId = 4; //Eth
var maticNetId = 80001; //Mumbai
var fromNetId = bscNetId; //Default
//var toNetId = ethNetId;//Default //**
var toNetId = maticNetId;//Default
var signature;
var hashedTxId;
var blockNumber;
var dv, dv1, dv3, dv4;
var initialAmt, amt, evmToAddress;
var mm_provider;
var usrBalance;
var loc;
var completePhase = false;

/*const chainParams = new Map();
chainParams.set('97', {chainName:"Smart Chain Testnet", rpcUrl:"https://data-seed-prebsc-1-s1.binance.org:8545", nativeCurrencyName:"BNB", nativeCurrencySymbol:"BNB", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://testnet.bscscan.com"});
chainParams.set('56', {chainName:"Smart Chain", rpcUrl:"https://bsc-dataseed.binance.org/", nativeCurrencyName:"BNB", nativeCurrencySymbol:"BNB", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://bscscan.com/"});
chainParams.set('137', {chainName:"Matic", rpcUrl:"https://rpc-mainnet.maticvigil.com", nativeCurrencyName:"Matic", nativeCurrencySymbol:"Matic", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://explorer.matic.network"});
chainParams.set('80001', {chainName:"Mumbai Testnet", rpcUrl:"https://rpc-mumbai.maticvigil.com/", nativeCurrencyName:"Matic", nativeCurrencySymbol:"Matic", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://mumbai-explorer.matic.today"});
chainParams.set('43114', {chainName:"AVAX", rpcUrl:"https://api.avax.network/ext/bc/C/rpc", nativeCurrencyName:"AVAX", nativeCurrencySymbol:"AVAX", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://cchain.explorer.avax.network/"});
chainParams.set('250', {chainName:"Fantom", rpcUrl:"https://rpc.ftm.tools/", nativeCurrencyName:"FTM", nativeCurrencySymbol:"FTM", nativeCurrencyDecimals:"18", blockExplorerUrl:"https://ftmscan.com"});
*/


export const EthIcon = props => (
  <Blank {...props}>
    <svg viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <image href={ethLogo} height="24" width="24"/>text
    </svg>
  </Blank>
);

export const BscIcon = props => (
  <Blank {...props}>
    <svg viewBox="2 2 12 12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <image href={bscLogo} height="16" width="16"/>
    </svg>
  </Blank>
);

export const MaticIcon = props => (
  <Blank {...props}>
    <svg viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <image href={maticLogo} height="24" width="24"/>
    </svg>
  </Blank>
);

// Allows for swapping out net easily, when switching from testnet to mainnet
if (bscNetId===97 || ethNetId===4 || maticNetId===80001 ){
    networkType = "testnet";
}
else if (bscNetId===56 || ethNetId===1 || maticNetId===137 ){
    networkType = "mainnet";
}


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

async function addWPKT(){

    const tokenSymbol = 'WPKT';
    const tokenDecimals = 18;
    const tokenImage = 'https://odapp.io/WPKTLogo2Large.png';
    await setNets();
    console.log('tokenAddress', tokenAddress);


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

function getBlockHeight(str){
  var arr = str.split('|');
  return arr[1];
}



async function switchChain(chainId){
  if (window.ethereum) {
     try {
       // check if the chain to connect to is installed
       await window.ethereum.request({
         method: 'wallet_switchEthereumChain',
         params: [{ chainId: chainId }],
       });
     } catch (error) {

       // Error indicates that the chain has not been added to MetaMask
       if (error.code === 4902) {
         try {

           /*
            // Adds a wider range of chains with more detail
            const params = [{
                "chainId": chainId,
                "chainName": chainParams.get(chainId.toString()).chainName,
                "rpcUrls": [
                    chainParams.get(chainId.toString()).rpcUrl
                ],
                "nativeCurrency": {
                    "name": chainParams.get(chainId.toString()).nativeCurrencyName,
                    "symbol": chainParams.get(chainId.toString()).nativeCurrencySymbol,
                    "decimals": chainParams.get(chainId.toString()).nativeCurrencyDecimals
                },
                "blockExplorerUrls": [
                    chainParams.get(chainId.toString()).blockExplorerUrl
                ]
            }]*/

           await window.ethereum.request({
             method: 'wallet_addEthereumChain',
             params: [
               {
                 chainId: chainId,
                 //params
               },
             ],
           });
         } catch (addError) {
           console.error(addError);
         }

       }//
       console.error(error);
     }
  }

}

async function completeTransaction(){
  console.log("CompleteTransaction - switching to:", toChainId);
  completePhase = true;
  var complete = false;
  var keyExists = false;

  //getProvider();
  await setNets();
  var switching = await switchChain(toChainId);
  dv4.style.display= 'none';

  if (!ObeahContractMint){
    console.log('ObeahContractMintError:', ObeahContractMint);
  }

  try {
          // Check if key exists to know if transaction was already completed.
          keyExists = await ObeahContractMint.keyExistsTx(signature);
          console.log('keyExists', keyExists);

          if (keyExists){
              complete = true;
              console.log("Payout Status?:", complete);
          }
  }

  catch (err){
      console.log('Transaction Failure.', err);
      if (err.data.message === 'header not found'){ //(err.toString().includes('header not found')){
        dv4.style.display= 'block'; // show continue
      }
      else {
        if (err.toString().includes('unknown account')){
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet.</h6>";
        }
        else{
            dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>"+err.data.message+"</h6>";
        }
      }
      dv1.style.display= 'none';
      dv3.style.display= 'none';
      return;
  }

  console.log('amt:', amt, 'TokenAddress:', tokenAddress, 'TID:', hashedTxId, 'ethAddr:', evmToAddress, 'Sig:',signature, '*Block Number:', blockNumber);

  if (signature && hashedTxId && blockNumber && !complete){

      if (mm_provider) {

          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
          dv.style.display= 'block';

          try{

              var tx = await ObeahContractMint.bridgeMintStealth(amt, amt.toString(), hashedTxId.toString(), evmToAddress.toString(), signature, blockNumber.toString(), blockNumber.toString());
              //var tx = await ObeahContractMint.unvaultStealth(amt, amt.toString(), hashedTxId.toString(), evmToAddress.toString(), signature, blockNumber.toString(), blockNumber.toString()); //Vaulting.
              console.log('TX:',tx);

              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction ID:</h4><Text margin='small' >" + tx.hash + "</Text><h4 style={{backgroundColor: '#2B2F36'}}>Please wait for on-chain confirmation...</h4>";
              dv1.style.display= 'block';

              ObeahContractMint.once("BridgeMinted", (recip, amount) => {
                  var feesNoWei = 0;
                  console.log('Recipient:',recip);
                  console.log('Amount:', amount.toString());
                  var amtNoWei = Web3.utils.fromWei(amount.toString());
                  initialAmt = Web3.utils.fromWei(amt.toString());
                  console.log('amtNoWei', amtNoWei, initialAmt);
                  if (Number(amtNoWei) > 0){
                    var fees = Number(initialAmt) - (Number(amtNoWei));
                    feesNoWei = fees.toFixed(4);
                  }

                  console.log("Amount:", amtNoWei, 'Fees:', feesNoWei);

                  if (Number(amtNoWei) > 0) {
                      if (receipt !== undefined) {
                          dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction Complete.</h4><h4 style={{backgroundColor: '#2B2F36'}}><b>Your transaction hash is " + receipt.transactionHash + "</h4>";
                      }
                      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>You received "+amtNoWei+" WPKT tokens.</h4>";
                      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your fees were "+feesNoWei+" WPKT.</h4>";
                      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>If the WPKT token hasn't already been added to your wallet yet, use the button below to add it. Make sure to add it to the right MetaMask account.</h4>";
                      dv3.style.display= 'block';
                      dv1.style.display= 'none';
                      complete = true;
                      return;
                  }
                  else {
                      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failed.</h4>";
                      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Bad transaction. Check your sender / recipient address pair or transaction hash. </h4>";
                      dv1.style.display= 'none';
                      return;
                  }
              });

              var receipt = await tx.wait();
              console.log('Receipt:', receipt, (receipt.status === 1));

              if (receipt.status !== 1) {
                  console.log('Transaction Failure.');
                  dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
                  dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>It's possible you have already claimed this transaction.</h6>";
                  dv1.style.display= 'none';
                  return;
              }
              else {
                  console.log('Receipt received');
                  if (!complete){
                    dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>If the WPKT token hasn't already been added to your wallet yet, use the button below to add it. Make sure to add it to the right MetaMask account.</h4>";
                    dv1.style.display= 'none';
                    dv3.style.display= 'block';
                    //reciept.transactionHash
                    // kill listener
                    complete = true;
                  }

                  ObeahContractMint.removeAllListeners(["BridgeMinted"]);
                  //setCookie('mintTx', receipt.transactionHash);//response.data.access_token, { path: '/',  expires}//allows for faster tx recovery when mint fails using stored burn hash -- TBD.
              }

          }
          catch (err) {
              console.log('Error:', err);
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
              if (err.toString().includes('unknown account')){
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet to this site.</h6>";
              }
              else if (err.code.toString().includes('-32603')){
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>"+err.message+"</h6>";
              }

              dv1.style.display= 'none';
              return;
          }

      }
      else {
          console.log('Metamask not running. Is it installed?');
          dv.style.display='block';
          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Please Install <a href='https://metamask.io/download.html' style='color:#F0B90C;' />Metamask</a></h4>";
          return;
      }
  }
  else {
      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
      dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Can\'t retrieve data from bridge servers.</h6>";
      dv.style.display= 'block';
      dv1.style.display= 'none';
      return;
  }
}

function setNet(){
    if (fromNetRadio === 'BSC'){
      if (networkType ==='mainnet') {
        bscNetId = 56;
      }
      else{
        bscNetId = 97;
      }
      fromNetId = bscNetId;
    }
    if (fromNetRadio === 'Ethereum'){
      if (networkType ==='mainnet') {
        ethNetId = 1;
      }
      else{
        ethNetId = 4;
      }
      fromNetId = ethNetId;
    }
    if (fromNetRadio === 'Matic'){
      if (networkType ==='mainnet') {
        maticNetId = 137;
      }
      else{
        maticNetId = 80001;
      }
      fromNetId = maticNetId;
    }
    console.log("fromNetRadio", fromNetRadio, fromNetId);
}

function setNets(){
  console.log("fromNetRadio", fromNetRadio);
  console.log("toNetRadio", toNetRadio);

  if (fromNetRadio == 'BSC' && toNetRadio == 'Ethereum'){
    ObeahContractBurn = Obeah_Bsc;
    ObeahContractMint = Obeah_Eth;
    WPKT_Con = new Contract(addresses.WPKT, abis.WPKT, signer);
    fromWPKTAddr = addresses.WPKT;
    fromNetId = bscNetId;
    toNetId = ethNetId;
    tokenAddress = wpktEthAddr;

    if (networkType =='mainnet') {
      bscNetId = 56;
    }
    else{
      bscNetId = 97;
    }
  }
  else if (fromNetRadio == 'Ethereum' && toNetRadio == 'BSC') {
    ObeahContractBurn = Obeah_Eth;
    ObeahContractMint = Obeah_Bsc;
    WPKT_Con = new Contract(addresses.WPKT_Eth, abis.WPKT, signer);
    fromWPKTAddr = addresses.WPKT_Eth;
    fromNetId = ethNetId;
    toNetId = bscNetId;
    tokenAddress = wpktBscAddr;
    if (networkType =='mainnet') {
      ethNetId = 1;
    }
    else {
      ethNetId = 4;
    }
  }

  else if (fromNetRadio == 'Matic' && toNetRadio == 'Ethereum') {
    ObeahContractBurn = Obeah_Matic;//
    ObeahContractMint = Obeah_Eth;
    WPKT_Con = new Contract(addresses.WPKT_Matic, abis.WPKT, signer);
    fromWPKTAddr = addresses.WPKT_Matic;
    fromNetId = maticNetId;
    toNetId = ethNetId;
    tokenAddress = wpktEthAddr;
    if (networkType =='mainnet') {
      maticNetId = 137;
    }
    else {
      maticNetId = 80001;
    }
  }

  else if (fromNetRadio == 'Ethereum' && toNetRadio == 'Matic') {
    ObeahContractBurn = Obeah_Eth;//
    ObeahContractMint = Obeah_Matic;
    WPKT_Con = new Contract(addresses.WPKT_Eth, abis.WPKT, signer);
    fromWPKTAddr = addresses.WPKT_Eth;
    fromNetId = ethNetId;
    toNetId = maticNetId;
    tokenAddress = wpktMaticAddr;
    if (networkType =='mainnet') {
      ethNetId = 1;
    }
    else {
      ethNetId = 4;
    }
  }

  else if (fromNetRadio == 'Matic' && toNetRadio == 'BSC') {
    ObeahContractBurn = Obeah_Matic;//
    ObeahContractMint = Obeah_Bsc;
    WPKT_Con = new Contract(addresses.WPKT_Matic, abis.WPKT, signer);
    fromWPKTAddr = addresses.WPKT_Matic;
    fromNetId = maticNetId;
    toNetId = bscNetId;
    tokenAddress = wpktBscAddr;
    if (networkType =='mainnet') {
      maticNetId = 137;
    }
    else {
      maticNetId = 80001;
    }
  }

  else if (fromNetRadio == 'BSC' && toNetRadio == 'Matic') {
    ObeahContractBurn = Obeah_Bsc;//
    ObeahContractMint = Obeah_Matic;
    WPKT_Con = new Contract(addresses.WPKT, abis.WPKT, signer);
    console.log('addresses.WPKT:', addresses.WPKT);
    fromWPKTAddr = addresses.WPKT;
    fromNetId = bscNetId;
    toNetId = maticNetId;
    tokenAddress = wpktMaticAddr;
    if (networkType =='mainnet') {
      bscNetId = 56;
    }
    else{
      bscNetId = 97;
    }
  }

  fromChainId = ("0x"+fromNetId.toString(16)).toString();
  toChainId = ("0x"+toNetId.toString(16)).toString();
  return WPKT_Con;
}

async function checkNetsMatch(){
  dv = document.getElementById("output");
  dv1 = document.getElementById("spin");
  dv3 = document.getElementById("addToken");
  dv4 = document.getElementById("continue");

  dv.style.display= 'none';
  dv3.style.display= 'none';
  dv4.style.display= 'none';

  var network = await window.ethereum.request({ method: 'net_version' })
  var currentNetworkName = "Binance Smart Chain";

  console.log("fromNetId", fromNetId);

  if (fromNetId==ethNetId){
    currentNetworkName = "Ethereum";
  }
  else if (fromNetId==maticNetId){
    currentNetworkName = "Matic";
  }
  else if (fromNetId==bscNetId){
    currentNetworkName = "Binance Smart Chain";
  }

  console.log('currentNetworkName:',currentNetworkName, fromNetId, network);


  if (Number(network)!== Number(fromNetId)){
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Connect Metamask to "+currentNetworkName+" "+networkType+" and resubmit.</h4>";
      dv.style.display= 'block';
      dv1.style.display= 'none';
      return false;
  } else{
    return true;
  }
}


async function getProvider(){
  mm_provider = await detectEthereumProvider();
  if (mm_provider !== window.ethereum){
      console.log('Multiple wallets installed');
      return;
  }
  else {
      console.log('window.ethereum is current wallet.');
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      signer = provider.getSigner();
  }
}


if (typeof window.ethereum !== 'undefined'
|| (typeof window.web3 !== 'undefined')) {

  window.ethereum.on('accountsChanged', function (accounts) {
    if (loc && loc.pathname === '/Teleport'){
      dv = document.getElementById("output");
      dv.style.display= 'none';
      let balOk = checkBalanceInput(initialAmt);
    }
  });

  window.ethereum.on('networkChanged', function (network) {
    if (loc && loc.pathname === '/Teleport' && (!completePhase)){
      dv = document.getElementById("output");
      dv.style.display= 'none';
      setNets();
      console.log("complete:", completePhase);
      checkNetsMatch();
    }
  });

}

function balanceError(){
  dv = document.getElementById("output");
  dv.style.display= 'block';
  dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your WPKT balance is too low for this transaction. Make sure to connect the correct account to this site.</h4>";
}

async function checkBalanceInput(value){
  if ((fromNetRadio != 'Select') && (toNetRadio != 'Select')){
    dv = document.getElementById("output");
    dv.style.display= 'none';
    await userBalance();

    if (Number(value) && Number(usrBalance)){
      if (Number(value)>Number(usrBalance)){
        balanceError();
        return false;
      }
      else{
          return true;
      }
    }

  }
}

async function userBalance(){
  WPKT_Con = await setNets(); // sets correct WPKT
  let correctNets = await checkNetsMatch();
  if (!correctNets){
    console.log('Wrong network');
    return;
  }

  var thisAccount = await provider.listAccounts();
  console.log('Signer is:', thisAccount[0]);

  try {
    usrBalance = Web3.utils.fromWei((await WPKT_Con.balanceOf(thisAccount[0])).toString());
    console.log('Balance:', usrBalance);
  }
  catch (err){
    console.log('Error:', err);
  }
}

function handleValueFrom(valueFrom, setValueFrom, setValueTo){
  fromNetRadio=valueFrom;
  setValueFrom(valueFrom);

  //var valueTo = (valueFrom === 'Ethereum') ? 'BSC' : 'Ethereum'; //**
  var valueTo = (valueFrom === 'Matic') ? 'BSC' : 'Matic';
  setValueTo(valueTo);
  toNetRadio=valueTo;

  setNets();
  checkNetsMatch();
  let balOk = checkBalanceInput(initialAmt);
}

function handleValueTo(valueTo, setValueFrom, setValueTo){
  toNetRadio=valueTo;
  setValueTo(valueTo);

  //var valueFrom = (valueTo === 'Ethereum') ? 'BSC' : 'Ethereum';//**
  var valueFrom = (valueTo === 'Matic') ? 'BSC' : 'Matic';
  setValueFrom(valueFrom);
  fromNetRadio=valueFrom;

  setNets();
  checkNetsMatch();
  let balOk = checkBalanceInput(initialAmt);
}

function handleValueFromDrop(valueFrom, setValueFrom, setValueTo){
  fromNetRadio=valueFrom;
  setValueFrom(valueFrom);
  setNet();
  checkNetsMatch();
  if ((fromNetRadio != toNetRadio) && (fromNetRadio != 'Select' && toNetRadio != 'Select')){//
    let balOk = checkBalanceInput(initialAmt);
  }

}

function handleValueToDrop(valueTo, setValueFrom, setValueTo){
  toNetRadio=valueTo;
  setValueTo(valueTo);
  /*if ((fromNetRadio != toNetRadio) && (fromNetRadio != 'Select' && toNetRadio != 'Select')){
    let balOk = checkBalanceInput(initialAmt);
  }*/
}

/*

// Routes - Allows routing from any coin to WPKT. - TBD.
async function wpktRouter() {

      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });//eth_chainId

      const walletProvider: WalletProvider = {
              address: accounts[0],
              chainId,
              core: window.ethereum
          }

      const configuration: Configuration = {
          rpcProviders: {
              [BLOCKCHAIN_NAME.ETHEREUM]: {
                  mainRpc: ''
              },
              [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
                  mainRpc: ''
              }
          },
          walletProvider
      }

      const sdk = await SDK.createSDK(configuration);
      await sdk.updateConfiguration(configuration);

      const blockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
      //const blockchain = BLOCKCHAIN_NAME.ETHEREUM;
      const fromTokenAddress = '0x0000000000000000000000000000000000000000'; //'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; // BNB
      //const fromTokenAddress = '0x0000000000000000000000000000000000000000'; // ETH
      const fromAmount = .2; //initialAmt
      const toTokenAddress = '0x1C25222994531C4AC35E4d94bbf7552c9aa92E32'; // WPKT
      //const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT

      try{
        const trades = await sdk.instantTrades.calculateTrade(
            { blockchain, address: fromTokenAddress },
            fromAmount,
            toTokenAddress
        );

        // explore trades info
        Object.entries(trades).forEach(([tradeType, trade]) =>
            console.log(tradeType, `to amount: ${trade.to.tokenAmount.toFormat(3)}`)
        )

        console.log('trades',trades, TRADE_TYPE.PANCAKE_SWAP, trades[0]);
        const onConfirm = (hash: string) => console.log(hash);
        const routeReceipt = await trades[0].swap({ onConfirm });//ONE_INCH_BSC //SUSHI_SWAP_POLYGON //PANCAKE_SWAP
        console.log('routeReceipt', routeReceipt);

        // On success - bridge through WPKT.
        // After bridging, then route back to target coin.

      }
      catch (err) {
        console.log('err', err);
      }

      return;


}
*/

async function handleInput(e){

    // Reset
    signature = null;
    hashedTxId = null;
    blockNumber = null;

    e.preventDefault();

    // Get Details
    //recipAddr = e.value.RecipAddr.trim().toString();
    initialAmt = e.value.Amt.trim();

    dv = document.getElementById("output");
    dv1 = document.getElementById("spin");
    dv3 = document.getElementById("addToken");
    dv4 = document.getElementById("continue");

    // Reset Interface
    dv.style.display= 'none';
    dv1.style.display= 'none';
    dv3.style.display= 'none';
    dv4.style.display= 'none';

    if(isNaN(initialAmt)){
      dv.style.display= 'block';
      console.log('WPKT amount is not a number');
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your amount must be a number.</h4>";
      return;
    }

    initialAmt = initialAmt.toString();
    console.log(toNetRadio, fromNetRadio, initialAmt);

    // Make sure networks are different
    if (fromNetRadio === 'Select' ||  toNetRadio === 'Select'){
      console.log("Networks are not different.");
      dv.style.display= 'block';
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>You must select to and from networks.</h4>";
      return;
    }

    if (!toNetRadio || !fromNetRadio){
      console.log("Network selection error.");
      dv.style.display= 'block';
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>NetworkSelectionError: Please select your from and to networks again.</h4>";
      return;
    }

    // Make sure networks are different
    if (fromNetRadio === toNetRadio){
      console.log("Networks are not different.");
      dv.style.display= 'block';
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your from and to networks must be different.</h4>";
      return;
    }


    // Get contracts.
    Obeah_Bsc = new Contract(addresses.Obeah, abis.Obeah, signer);
    Obeah_Eth = new Contract(addresses.Obeah_Eth, abis.Obeah, signer);
    Obeah_Matic = new Contract(addresses.Obeah_Matic, abis.Obeah, signer);
    //console.log('Obeah Contract:', Obeah_Bsc, Obeah_Eth);
    ObeahContractBurn = null;

    // Set correct contracts for from and to chains
    console.log("fromNetRadio", fromNetRadio, "toNetRadio", toNetRadio);
    setNets();
    var switching = await switchChain(fromChainId);

    let correctNets = checkNetsMatch();
    if (!correctNets)
      return;

    let balOk = await checkBalanceInput(initialAmt);
    if(!balOk){
      return;
    }


    try{
        amt = Web3.utils.toWei(initialAmt.toString()); // Convert intialAmt toWei
        console.log("ObeahContractBurn:",ObeahContractBurn.address);

        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
        dv.style.display= 'block';

        var tx = await ObeahContractBurn.bridgeBurn(amt); // Burn coins
        //var approve = await WPKT.approve(fromWPKTAddr,amt); // approve
        //var tx = await ObeahContractBurn.bridgeVault(amt); //Vault

        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction ID:</h4><Text margin='small' >" + tx.hash + "</Text><h4 style={{backgroundColor: '#2B2F36'}}>Please wait for on-chain confirmation...</h4>";
        dv1.style.display= 'block';

        var cnt = 0;


        // Listen for burning complete
        ObeahContractBurn.once("BridgeBurned", (caller, amount) => {
            console.log('Recipient:', caller);
            console.log('Amount:', amount.toString());

            if (cnt == 0) {
              handleMint(amount, cnt, fromNetId, toNetId, dv, dv1, receipt, tx);
              cnt++;
            }


        });


        //ObeahContractBurn.off("BridgeBurned");
        //ObeahContractBurn.removeAllListeners(["BridgeBurned"]);

        var receipt = await tx.wait();
        console.log('Receipt:', receipt, (receipt.status === 1));

        if (receipt.status !== 1) {
            console.log('Transaction Failure.');
            dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed.</h4>";
            dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Did you pay the network fees?</h4>";
            dv.style.display= 'block';
            dv1.style.display= 'none';
            return;
        }
        else {
            console.log('Receipt received');
            ObeahContractBurn.off("BridgeBurned");
            ObeahContractBurn.removeAllListeners(["BridgeBurned"]);
            if (cnt == 0) {
              await handleMint(amt, cnt, fromNetId, toNetId, dv, dv1, receipt, tx);
              cnt++;
            }
            //setCookie('burnTx', receipt.transactionHash);//{ path: '/',  expires} //allows for faster tx recovery when mint fails using stored burn hash -- TBD.
        }

    }
    catch (err) {
        console.log('Error:', err);
        dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
        if (err.toString().includes('unknown account')){
          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Please connect your metamask wallet to this site.</h4>";
        }
        else if (err.code.toString().includes('-32603')){
          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>"+err.data.message+"</h4>";
        }
        else {
          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Check you have enough coin to afford this transaction\'s gas fees.</h4>";
        }
        dv.style.display= 'block';
        dv1.style.display= 'none';
        return;
    }
}

async function handleMint(amount, cnt, fromNetId, toNetId, dv, dv1, receipt, tx){
  amt = amount; // in wei
  var amtNoWei = Web3.utils.fromWei(amount.toString());
  var txid = tx.hash;
  console.log('amtNoWei', Number(amtNoWei), 'txid', txid, 'cnt', cnt);


  if (Number(amtNoWei) > 0 && cnt == 0) {

      if (receipt !== undefined) {
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Bridge Received Coins.</h4><h4 style={{backgroundColor: '#2B2F36'}}><b>Your transaction hash is " + txid + "</h4>";
      }
      dv1.style.display= 'none';

      //Retrieve Sig
      //var cmd = "http://localhost:3200/api/v1/getevmtrans/txid/"+txid+"/fromNetwork/"+fromNetId+"/toNetwork/"+toNetId+"/stealthMode/"+true;
      var cmd = "https://obeahdev.odapp.io/api/v1/getevmtrans/txid/"+txid+"/fromNetwork/"+fromNetId+"/toNetwork/"+toNetId+"/stealthMode/"+true;
      console.log('cmd', cmd);
      dv1.style.display= 'block';
      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Bridge Signature Pending...</h4>";
      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Retrieving signature from the bridge network.</h4>";
      dv.style.display= 'block';
      dv1.style.display= 'block';
      dv3.style.display= 'none';

      fetch(cmd)
      .then((response) => response.json())
      .then( async (result) => {
          console.log('Data:', result);

          if (result.signature && result.hashedTxId && result.blockNumber){
            // Set globals
            signature = result.signature;
            hashedTxId = result.hashedTxId;
            blockNumber = result.blockNumber;
            evmToAddress = result.from;

            console.log('hashedTxId:', hashedTxId, 'blockNumber', blockNumber);

            //completeTransaction(); //Auto Switching.
            dv1.style.display= 'none';
            dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Click continue to complete your transaction.</h4>";
            dv.style.display= 'block';
            dv4.style.display= 'block'; // Show the continue button
          }
          else if (Number(result.output) === -1)  {
              console.log('Duplicate transaction.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>You can't claim the same transaction more than once.</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>If the WPKT token hasn't already been added to your wallet yet, use the button below to add it. </h4>";
              dv.style.display= 'block';
              dv3.style.display= 'block';
              //dv1.style.display= 'none';
              return;
          }
          else if (Number(result.output) === -2)  {
              console.log('Bad address.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your sender / recipient address pair was not pre-commited. Click <a href='./PreCommit' style='color:#F0B90C;' />here</a> to pre-commit an address pair. </h4>";
              dv.style.display= 'block';
              dv1.style.display= 'none';
              return;
          }
          else if (Number(result.output) === -3)  {
              console.log('Gas price error.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Non-specific gas price error.</h4>";
              dv.style.display= 'block';
              dv1.style.display= 'none';
              return;
          }
          else if (Number(result.output) === -4)  {
              console.log('Unknown Error.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Unknown error.</h4>";
              dv.style.display= 'block';
              dv1.style.display= 'none';
              return;
          }
          else if (Number(result.output) === -5)  {
              console.log('Front Run Attempt.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Potential front run attempt.</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Your address pair does not match the pre-committed pair</h4>";
              dv.style.display= 'block';
              dv1.style.display= 'none';
              return;
          }
          else {
              console.log('Bad transaction.');
              dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}> Either transaction doesn't exist or it was for a zero amount.</h4>";
              dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}> It is possible you used a different pkt address for this transaction.</h4>";
              dv.style.display= 'block';
              dv1.style.display= 'none';
              return;
          }

      }).catch(function(err) {
          console.log("error", err);
          dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failure</h4>";
          dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>There was a problem communicating with the bridge servers.</h4>";
          dv.style.display= 'block';
          dv1.style.display= 'none';
          return;
      });


      return;
  }
  else {
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Failed.</h4>";
      dv.innerHTML += "<h4 style={{backgroundColor: '#2B2F36'}}>Bad transaction. Check your sender / recipient address pair or transaction hash. </h4>";
      dv.style.display= 'block';
      dv1.style.display= 'none';
      return;
  }

}

var initialValue = "BSC";
var initialValue2 = "Ethereum";
var initialValue3 = "Matic";
fromNetRadio = "Select"; //initialValue;
//toNetRadio = initialValue2; //**
toNetRadio = "Select"; //initialValue3;



function Teleport({ valueFrom: initialValue, ...props }, { valueTo: initialValue2, ...props2 }) {
    const [valueFrom, setValueFrom] = useState('Select');
    //const [valueFrom, setValueFrom] = useState('BSC');
    const [valueTo, setValueTo] = useState('Select');
    //const [valueTo, setValueTo] = useState('Matic');
    const [cookies, setCookie] = useCookies(['burnTx', 'mintTx']);
    const [fromIcn, setFromIcn] = useState(<FormDown color='white'/>);
    const [toIcn, setToIcn] = useState(<FormDown color='white'/>);

    getProvider();

    loc = useLocation();
    console.log('loc', loc);
    console.log('valueTo:', valueTo, 'valueFrom:', valueFrom);

    return (
    <Grommet theme={customBreakpoints}>
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                            <Box background="#fff" justify="center" alignSelf="center">
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Bridge More Chains</HeadingDark>
                                <StyledTextDark textAlign="center">Send WPKT privately between chains. The bridge fee is .25%.Enter your WPKT amount, choose the from and to chains, and provide a target recipient address.
                                Additionally, you must hold the native coins of the chains you wish to bridge between. For example, to execute a BSC-to-Matic swap of WPKT, you must also own BNB and Matic.</StyledTextDark>
                            </Box>
                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                                <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>

                                <Form name="bridgeWPKT" id="bridgeWPKT" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Bridge Your WPKT: </Heading>
                                <Box justify="center" alignSelf="center" >
                                    <Box justify="center" alignSelf="center"  width="medium" pad="small" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">From:</Text>
                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setFromIcn(<MaticIcon/>); handleValueFromDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setFromIcn(<BscIcon/>); handleValueFromDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >
                                        <Box direction="row" gap="small" alignSelf="center" pad="small">
                                            <ButtonForm size='large' pad='medium' icon={fromIcn} style={{borderRadius: '10px'}} color='#F0B90C' margin={{top: "15px", horizontal: "auto"}} label={valueFrom} id='slctFromBtn'/>
                                        </Box>
                                      </Menu>
                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum' },
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueFrom}
                                      onChange={event => handleValueFrom(event.target.value, setValueFrom, setValueTo)}
                                      {...props}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}
                                    </Box>


                                    <FormField
                                      name="Amt"
                                      alignSelf="center"
                                      pad="small"
                                      required
                                      width="medium"
                                      contentProps={{ border: false, margin: "0", pad: {top:"small", bottom:"0", left:"0", right:"0"} }}
                                      validate={[
                                        { regexp: /^\s*(?=.*[1-9])\d*(?:\.\d*)?\s*$/}
                                      ]}
                                    >
                                        <TextInput
                                          style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }}
                                          name="Amt"
                                          placeholder={<Text weight="normal" size="20px" color="#707070">0.0
                                          </Text>}
                                          onChange={event =>{initialAmt=event.target.value; checkBalanceInput(initialAmt)}}
                                        />
                                    </FormField>

                                    <Box justify="center" alignSelf="center" pad="small" width="medium" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">To:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio2"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum'},
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueTo}
                                      onChange={event => handleValueTo(event.target.value, setValueFrom, setValueTo)}
                                      {...props2}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}

                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setToIcn(<MaticIcon/>); handleValueToDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setToIcn(<BscIcon/>); handleValueToDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >

                                        <Box direction="row" gap="small" pad="small">
                                            <ButtonForm size='large' style={{borderRadius: '10px'}} pad='medium' margin={{top: "15px", horizontal: "auto"}} icon={toIcn} color='#F0B90C' label={valueTo} id='slctToBtn'/>
                                        </Box>
                                      </Menu>

                                    </Box>


                                    <ButtonForm width="medium" style={{width: '50%' }} hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "15px", horizontal: "auto"}} size='medium' color="#fff" type="submit" label="Submit"></ButtonForm>
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
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Bridge More Chains </HeadingDark>
                                <StyledTextDark textAlign="center">Send WPKT privately between chains. The bridge fee is .25%. The bridge fee is .25% Enter your WPKT amount, choose the from and to chains, and provide a target recipient address.
Additionally, you must hold the native coins of the chains you wish to bridge between. For example, to execute a BSC-to-Matic swap of WPKT, you must also own BNB and Matic.</StyledTextDark>
                            </Box>
                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                                <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>

                                <Form name="bridgeWPKT" id="bridgeWPKT" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Bridge Your WPKT: </Heading>
                                <Box justify="center" alignSelf="center" >
                                    <Box justify="center" alignSelf="center"  width="medium" pad="small" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">From:</Text>
                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum' },
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueFrom}
                                      onChange={event => handleValueFrom(event.target.value, setValueFrom, setValueTo)}
                                      {...props}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}
                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setFromIcn(<MaticIcon/>); handleValueFromDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setFromIcn(<BscIcon/>); handleValueFromDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >
                                        <Box direction="row" gap="small" alignSelf="center" pad="small">
                                            <ButtonForm size='large' pad='medium' icon={fromIcn} style={{borderRadius: '10px'}} color='#F0B90C' margin={{top: "15px", horizontal: "auto"}} label={valueFrom} id='slctFromBtn'/>
                                        </Box>
                                      </Menu>
                                    </Box>


                                    <FormField
                                      name="Amt"
                                      alignSelf="center"
                                      pad="small"
                                      required
                                      width="medium"
                                      contentProps={{ border: false, margin: "0", pad: {top:"small", bottom:"0", left:"0", right:"0"} }}
                                      validate={[
                                        { regexp: /^\s*(?=.*[1-9])\d*(?:\.\d*)?\s*$/}
                                      ]}
                                    >
                                        <TextInput
                                          style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }}
                                          name="Amt"
                                          placeholder={<Text weight="normal" size="20px" color="#707070">0.0
                                          </Text>}
                                          onChange={event =>{initialAmt=event.target.value; checkBalanceInput(initialAmt)}}
                                        />
                                    </FormField>

                                    <Box justify="center" alignSelf="center" pad="small" width="medium" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">To:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio2"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum'},
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueTo}
                                      onChange={event => handleValueTo(event.target.value, setValueFrom, setValueTo)}
                                      {...props2}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}
                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setToIcn(<MaticIcon/>); handleValueToDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setToIcn(<BscIcon/>); handleValueToDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >

                                        <Box direction="row" gap="small" pad="small">
                                            <ButtonForm size='large' style={{borderRadius: '10px'}} pad='medium' margin={{top: "15px", horizontal: "auto"}} icon={toIcn} color='#F0B90C' label={valueTo} id='slctToBtn'/>
                                        </Box>
                                      </Menu>

                                    </Box>



                                    <ButtonForm width="medium" style={{width: '50%' }} hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "15px", horizontal: "auto"}} size='medium' color="#fff" type="submit" label="Submit"></ButtonForm>
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
                                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Bridge More Chains </HeadingDark>
                                <StyledTextDark textAlign="center">Send WPKT between chains. The bridge fee is .25%. Enter your WPKT amount, choose the from and to chains, and provide a target recipient address.
Additionally, you must hold the native coins of the chains you wish to bridge between. For example, to execute a BSC-to-Matic swap of WPKT, you must also own BNB and Matic.</StyledTextDark>
                            </Box>

                            <div style={{paddingTop: '2%'}}>

                            <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">

                                <Box background="#f9f9f9" round="25px" justify="center" alignSelf="center" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} style={formWrapStyleMob}>

                                <Form name="bridgeWPKT" id="bridgeWPKT" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Bridge Your WPKT: </Heading>
                                <Box justify="center" alignSelf="center" >
                                    <Box justify="center" alignSelf="center"  width="medium" pad="small" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">From:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum' },
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueFrom}
                                      onChange={event => handleValueFrom(event.target.value, setValueFrom, setValueTo)}
                                      {...props}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}
                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setFromIcn(<MaticIcon/>); handleValueFromDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setFromIcn(<BscIcon/>); handleValueFromDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >
                                        <Box direction="row" gap="small" alignSelf="center" pad="small">
                                            <ButtonForm size='large' pad='medium' icon={fromIcn} style={{borderRadius: '10px'}} color='#F0B90C' margin={{top: "15px", horizontal: "auto"}} label={valueFrom} id='slctFromBtn'/>
                                        </Box>
                                      </Menu>

                                    </Box>


                                    <FormField
                                      name="Amt"
                                      alignSelf="center"
                                      pad="small"
                                      required
                                      width="medium"
                                      contentProps={{ border: false, margin: "0", pad: {top:"small", bottom:"0", left:"0", right:"0"} }}
                                      validate={[
                                        { regexp: /^\s*(?=.*[1-9])\d*(?:\.\d*)?\s*$/}
                                      ]}
                                    >
                                        <TextInput
                                          style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }}
                                          name="Amt"
                                          placeholder={<Text weight="normal" size="20px" color="#707070">0.0
                                          </Text>}
                                          onChange={event =>{initialAmt=event.target.value; checkBalanceInput(initialAmt)}}
                                        />
                                    </FormField>

                                    <Box justify="center" alignSelf="center" pad="small" width="medium" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">To:</Text>


                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio2"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum'},
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueTo}
                                      onChange={event => handleValueTo(event.target.value, setValueFrom, setValueTo)}
                                      {...props2}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}

                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setToIcn(<MaticIcon/>); handleValueToDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setToIcn(<BscIcon/>); handleValueToDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >

                                        <Box direction="row" gap="small" pad="small">
                                            <ButtonForm size='large' style={{borderRadius: '10px'}} pad='medium' margin={{top: "15px", horizontal: "auto"}} icon={toIcn} color='#F0B90C' label={valueTo} id='slctToBtn'/>
                                        </Box>
                                      </Menu>

                                    </Box>



                                    <ButtonForm width="medium" style={{width: '50%' }} hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "15px", horizontal: "auto"}} size='medium' color="#fff" type="submit" label="Submit"></ButtonForm>
                                </Box>
                                </Form>

                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>

                                          <div hidden align="center" id="continue" pad="medium" style={{padding:'2%'}}>
                                          <StyledButton size='large' pad="medium" color='#F0B90C' label='Continue' id='continue' onClick={() => completeTransaction()}/>
                                          </div>

                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
                                            <StyledButton size='large' pad="medium" color='#F0B90C' label='Add Token To Wallet' id='addToken' onClick={() => addWPKT()}/>
                                        </div>
                                    </Box>
                                </div>
                                </Box>
                            </Box>
                            </div>

                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'medium') ? (
            <Box background="#fff">
                <Card width="full" round="none" background="#fff" pad="150px 50px">
                    <CardBody>

                        <Grid fill areas={[ { name: 'left', start: [0, 0], end: [0, 0] }, { name: 'right', start: [1, 0], end: [1, 0] },]}
                            columns={['flex', 'flex']} alignContent="center" justifyContent="between" rows={['flex']} gap="none"
                            background="#fff">

                            <Box gridArea="left" background="#fff" justify="center" alignSelf="start">
                                <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Bridge More Chains </HeadingDark>
                                <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>Send WPKT privately between chains. The bridge fee is .25%. Enter your WPKT amount, choose the from and to chains, and provide a target recipient address.
Additionally, you must hold the native coins of the chains you wish to bridge between. For example, to execute a BSC-to-Matic swap of WPKT, you must also own BNB and Matic.</StyledTextDark>
                            </Box>

                            <Box gridArea="right" background="#fff" justify="end" alignSelf="center" pad="0">
                                <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>

                                <Form name="bridgeWPKT" id="bridgeWPKT" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Bridge Your WPKT: </Heading>
                                <Box justify="center" alignSelf="center" width="100%">
                                    <Box justify="center" alignSelf="center"  width="medium" pad="small" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">From:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum' },
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueFrom}
                                      onChange={event => handleValueFrom(event.target.value, setValueFrom, setValueTo)}
                                      {...props}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}

                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setFromIcn(<MaticIcon/>); handleValueFromDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setFromIcn(<BscIcon/>); handleValueFromDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >
                                        <Box direction="row" gap="small" alignSelf="center" pad="small">
                                            <ButtonForm size='large' pad='medium' icon={fromIcn} style={{borderRadius: '10px'}} color='#F0B90C' margin={{top: "15px", horizontal: "auto"}} label={valueFrom} id='slctFromBtn'/>
                                        </Box>
                                      </Menu>


                                    </Box>


                                    <FormField
                                      name="Amt"
                                      alignSelf="center"
                                      pad="small"
                                      required
                                      width="medium"
                                      contentProps={{ border: false, margin: "0", pad: {top:"small", bottom:"0", left:"0", right:"0"} }}
                                      validate={[
                                        { regexp: /^\s*(?=.*[1-9])\d*(?:\.\d*)?\s*$/}
                                      ]}
                                    >
                                        <TextInput
                                          style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }}
                                          name="Amt"
                                          placeholder={<Text weight="normal" size="20px" color="#707070">0.0
                                          </Text>}
                                          onChange={event =>{initialAmt=event.target.value; checkBalanceInput(initialAmt)}}
                                        />
                                    </FormField>

                                    <Box justify="center" alignSelf="center" pad="small" width="medium" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">To:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio2"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum'},
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' }
                                      ]}
                                      value={valueTo}
                                      onChange={event => handleValueTo(event.target.value, setValueFrom, setValueTo)}
                                      {...props2}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>
                                      */}

                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setToIcn(<MaticIcon/>); handleValueToDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setToIcn(<BscIcon/>); handleValueToDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >

                                        <Box direction="row" gap="small" pad="small">
                                            <ButtonForm size='large' style={{borderRadius: '10px'}} pad='medium' margin={{top: "15px", horizontal: "auto"}} icon={toIcn} color='#F0B90C' label={valueTo} id='slctToBtn'/>
                                        </Box>
                                      </Menu>



                                    </Box>


                                    <ButtonForm style={{width: '65%' }} hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "15px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"></ButtonForm>


                                </Box>
                                </Form>

                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>

                                          <div hidden align="center" id="continue" pad="medium" style={{padding:'2%'}}>
                                          <StyledButton size='large' pad="medium" color='#F0B90C' label='Continue' id='continue' onClick={() => completeTransaction()}/>
                                          </div>

                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
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
                                <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0", horizontal: "0" }} size="4xl" weight="bold" color="#222323" level="2">Bridge More Chains </HeadingDark>
                                <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>Send WPKT privately between chains. The bridge fee is .25%. Enter your WPKT amount, choose the from and to chains, and provide a target recipient address.
Additionally, you must hold the native coins of the chains you wish to bridge between. For example, to execute a BSC-to-Matic swap of WPKT, you must also own BNB and Matic.</StyledTextDark>
                            </Box>

                            <Box gridArea="right" background="#fff" justify="end" alignSelf="center" pad="0">
                              <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="end" alignSelf="center" style={formWrapStyleMed}>
                                <Form name="bridgeWPKT" id="bridgeWPKT" onSubmit={handleInput}>
                                <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Bridge Your WPKT: </Heading>
                                <Box justify="center" alignSelf="center" width="100%">
                                    <Box justify="center" alignSelf="center"  width="medium" pad="small" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">From:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum' },
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' } //**
                                      ]}
                                      value={valueFrom}
                                      onChange={event => handleValueFrom(event.target.value, setValueFrom, setValueTo)}
                                      {...props}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;

                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }

                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>*/}
                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setFromIcn(<MaticIcon/>); handleValueFromDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setFromIcn(<BscIcon/>); handleValueFromDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >
                                        <Box direction="row" gap="small" alignSelf="center" pad="small">
                                            <ButtonForm size='large' pad='medium' icon={fromIcn} style={{borderRadius: '10px'}} color='#F0B90C' margin={{top: "15px", horizontal: "auto"}} label={valueFrom} id='slctFromBtn'/>
                                        </Box>
                                      </Menu>

                                    </Box>


                                    <FormField
                                      name="Amt"
                                      alignSelf="center"
                                      required
                                      width="medium"
                                      contentProps={{ border: false, margin: "0", pad: {top:"small", bottom:"0", left:"0", right:"0"} }}
                                      validate={[
                                        { regexp: /^\s*(?=.*[1-9])\d*(?:\.\d*)?\s*$/}
                                      ]}
                                    >
                                        <TextInput
                                          style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }}
                                          name="Amt"
                                          placeholder={<Text weight="normal" size="20px" color="#707070">0.0
                                          </Text>}
                                          onChange={event =>{initialAmt=event.target.value; checkBalanceInput(initialAmt)}}
                                        />
                                    </FormField>

                                    <Box justify="center" alignSelf="center" pad="small" width="medium" background="white" round="xsmall">
                                      <Text justify="center" alignSelf="left" weight="bold">To:</Text>

                                      {/*<RadioButtonGroup
                                      direction="row"
                                      name="radio2"
                                      pad="small"
                                      justify="center"
                                      options={[
                                        //{ label: 'Ethereum', value: 'Ethereum'},
                                        { label: 'BSC', value: 'BSC' },
                                        { label: 'Matic', value: 'Matic' } //**
                                      ]}
                                      value={valueTo}
                                      onChange={event => handleValueTo(event.target.value, setValueFrom, setValueTo)}
                                      {...props2}
                                      >
                                      {(option, { checked, focus, hover }) => {
                                        var Icon = BscIcon;
                                        switch(option.label) {
                                          case 'BSC':
                                            Icon = BscIcon;
                                            break;

                                          case 'Ethereum':
                                            Icon = EthIcon;
                                            break;

                                          case 'Matic':
                                            Icon = MaticIcon;
                                            break;
                                        }
                                        let background;
                                        if (checked) background = 'brand';
                                        else if (hover) background = 'light-4';
                                        else if (focus) background = 'light-4';
                                        else background = 'light-2';
                                        return (
                                          <Box direction="row" background={background} pad="xsmall" round="small">
                                            <Icon/>{option.label}
                                          </Box>
                                       );
                                       }}
                                      </RadioButtonGroup>
                                      */}

                                      <Menu plain closed
                                        items={[
                                          {
                                            label: <Box alignSelf="center">Matic</Box>,
                                            value: 'Matic',
                                            onClick: () => {console.log('Matic'); setToIcn(<MaticIcon/>); handleValueToDrop('Matic', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <MaticIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                            {
                                            label: <Box alignSelf="center">BSC</Box>,
                                            onClick: () => {console.log('BSC'); setToIcn(<BscIcon/>); handleValueToDrop('BSC', setValueFrom, setValueTo)
                                            },
                                              icon: (
                                                <Box pad="medium">
                                                  <BscIcon size="large" />
                                                </Box>
                                              ),
                                            },
                                        ]}
                                        >

                                        <Box direction="row" gap="small" pad="small">
                                            <ButtonForm size='large' style={{borderRadius: '10px'}} pad='medium' margin={{top: "15px", horizontal: "auto"}} icon={toIcn} color='#F0B90C' label={valueTo} id='slctToBtn'/>
                                        </Box>
                                      </Menu>


                                    </Box>



                                    <ButtonForm style={{width: '55%' }} hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "15px", horizontal: "auto"}} color="#fff" type="submit" label="Submit"></ButtonForm>
                                </Box>
                                </Form>

                                <div style={{paddingTop: '2%'}}>
                                    <Box hidden id="outputCard" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                        <div hidden align="center" id="output" style={{padding:'2%', wordBreak: "break-word"}}>
                                        </div>
                                        <div id="spin" align="center" hidden pad="medium" style={{padding:'2%', wordBreak: "break-word"}}><Spinner size="large" /></div>

                                          <div hidden align="center" id="continue" pad="medium" style={{padding:'2%'}}>
                                          <StyledButton size='large' pad="medium" color='#F0B90C' label='Continue' id='continue' onClick={() => completeTransaction()}/>
                                          </div>

                                        <div hidden align="center" id="addToken" pad="medium" style={{padding:'2%', wordBreak: "break-word"}}>
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

export default Teleport;
