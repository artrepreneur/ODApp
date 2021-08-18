import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'
import { Button, Footer, Text, Box, Nav, Anchor, Image } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SwapPKT from "./components/SwapPKT";
import PKTToWPKT from "./components/PKTToWPKT";
import WPKTToPKT from "./components/WPKTToPKT";
import PreCommit from "./components/PreCommit";
import Collapsible from "./components/Collapsible";
import GetPKT from "./components/GetPKT";
import FAQ from "./components/FAQ";
import NotFound from "./components/NotFound";
import useWeb3Modal from "./hooks/useWeb3Modal";
import GET_TRANSFERS from "./graphql/subgraph";
import logoFooter from "./img/odapp-logo-footer.svg";
import { ButtonFooter } from "./components/";

import {
  Connect
} from 'grommet-icons';

var clr = '#FBA300';
var provider;

async function checkMetamask(){

  provider = await detectEthereumProvider(); 
  if (provider) {
    console.log('Metamask successfully detected!');
    provider = new ethers.providers.Web3Provider(window.ethereum);

  }
  else{
    console.log('Please install metamask');
    alert('Please install metamask');
    return false;
  }
  
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal, clr}) {
  
  var initialLabel = !provider ? "Connect Wallet" : "Disconnect Wallet"; 
  const [label, setLabel] = useState(initialLabel);
  return (
    
    <Button id="cnct" primary size="large" align="center" color="#FBA300" class="mainConnect" label={!provider ? "Connect Wallet" : "Disconnect Wallet"} onClick={async () => {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install metamask to use this site');
        return;
      }
      
      if (!provider) {
        setLabel("Connect Wallet");
        loadWeb3Modal();
      } else {
        setLabel("Disconnect Wallet");
        logoutOfWeb3Modal();
      }

    }}/>

  );
}


async function connectMetamask(){
  try {
    // Will open the MetaMask UI
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (!provider) {
      alert('install metamask');
    }
    else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('Connect provider', provider);
      return provider;
    }
  } catch (error) {
    console.error(error);
    alert(error);
    return provider;
  }
}

function App() {
  
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const items = [
    { label: 'HOME', href: '/' },
    { label: 'PKT-to-WPKT', href: 'PKTToWPKT' },
    { label: 'WPKT-to-PKT', href: 'WPKTToPKT' },
    { label: 'FAQ', href: 'FAQ' },
  ];
  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div>
    <Collapsible btn={ WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal, clr}) }/>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home btn={ WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal, clr}) } />
            </Route>
            <Route exact path="/PKTToWPKT">
              <PKTToWPKT/>
            </Route>
            <Route exact path="/PreCommit">
              <PreCommit />
            </Route>
            <Route exact path="/SwapPKT">
              <SwapPKT />
            </Route>
            <Route exact path="/WPKTToPKT">
              <WPKTToPKT />
            </Route>
            <Route exact path="/GetPKT">
              <GetPKT />
            </Route>
            <Route exact path="/FAQ">
              <FAQ />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
        
      <Footer background="#222323" pad="large" align="center" justify="center">
          <Box size="small"><Image src={logoFooter} fit="contain" alt="react-logo" /></Box>
          <ButtonFooter href="/GetPKT" label="Claim PKT" color="#FFFFFF" margin={{ horizontal: "4vw" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
          <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
      </Footer>
      <Box background={{ color: "#FBA300" }} pad="small" size="xxsmall" align="center" alignSelf="center"><Text textAlign="center" size="15px" color="#fff">Copyright © ODapp.io</Text></Box>
    </div>
  );
}

export default App;