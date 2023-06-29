import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'
import MetaMaskOnboarding from '@metamask/onboarding'
import { Button, Footer, Text, Box, Grommet, ResponsiveContext } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SwapPKT from "./components/SwapPKT";
import Teleport from "./components/Teleport";
import PKTToWPKT from "./components/PKTToWPKT";
import WPKTToPKT from "./components/WPKTToPKT";
import PreCommit from "./components/PreCommit";
import Collapsible from "./components/Collapsible";
import GetPKT from "./components/GetPKT";
import GetWPKT from "./components/GetWPKT";
import FAQ from "./components/FAQ";
import ReCommit from "./components/ReCommit";
import NotFound from "./components/NotFound";
import ToS from "./components/ToS";
import useWeb3Modal from "./hooks/useWeb3Modal";
import GET_TRANSFERS from "./graphql/subgraph";
import logoFooter from "./img/odapp-logo-footer.svg";
import { StyledButton, ButtonFooter, ImageFooter, customBreakpoints } from "./components/";

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

const forwarderOrigin = window.location.host;

let connected = false;
let installed = false;
let currentAccount = null;
let accounts = null;
let connectedStr = "Wallet Connect";


async function isMetaMaskConnected() {
  const { ethereum } = window;
  accounts = await ethereum.request({ method: 'eth_accounts' });
  console.log('In Metamask connection:', (accounts && accounts.length > 0));
  if (accounts.length === 0) {
    return false;
  } else {
    return true;
  }
}

function isMetaMaskInstalled() {
  console.log('In isMetaMaskInstalled');
  return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

const buttonSetup = async (label, setLabel) => {
  const { ethereum } = window;
   try {
     // Will open the MetaMask UI
     await initialize();
     connectedStr = (accounts && accounts.length > 0) ? ((accounts[0].toString()).slice(0,6))+'...' :  "Connect Wallet";
     setLabel(connectedStr);

   } catch (error) {
     console.error(error);
   }
 };

async function initialize() {
  connected = false;
  installed = false;
  installed = isMetaMaskInstalled();
  console.log('installed:', installed);
  //connected = await isMetaMaskConnected();
  //console.log('connected1:', connected);
}

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  window.ethereum.on('accountsChanged', async () => {
      await initialize();
      console.log('accounts changed here');
      if (connectedStr !== 'Wallet Connect'){
        window.location.reload();
      }

  });
}



const onClickConnect = async () => {
  const { ethereum } = window;
   try {
     // Will open the MetaMask UI
     console.log("Try to connect here", window.ethereum);
     try {
      accounts = await window.ethereum.request({ method: 'eth_accounts' });
     } catch (error) {console.log('error:',error);}
     console.log('accounts:', accounts);
     currentAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
     console.log('current account:', currentAccount);
     console.log('After await ethereum.request');
     console.log('current account:', currentAccount, accounts[0]);
   
   } catch (error) {
     console.error('error:',error);
   }
 };


function WalletButton() {
  const [connected, setConnected] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [label, setLabel] = useState("Connect Wallet");
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  const initialize = async () => {
    if (window.ethereum) {
      setInstalled(isMetaMaskInstalled());
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccounts(accounts);
      setConnected(accounts.length > 0);
    }
  };

  // Initial setup
  useEffect(() => {
    initialize();
  }, []); 

  // Listen for accounts change
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        setAccounts(accounts);
        setConnected(accounts.length > 0);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // cleanup function
      return () => {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const onClickConnect = async () => {
    if (window.ethereum) {
      const currentAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccounts(accounts);
      setConnected(accounts.length > 0);
    }
  };

  // Update label when accounts or connection status changes
  useEffect(() => {
    if (connected && accounts.length > 0) {
      setLabel((accounts[0].toString()).slice(0,6) + '...');
    } else {
      setLabel("Connect Wallet");
    }
  }, [connected, accounts]);
  

  return (
    <StyledButton 
      id="connectButton" 
      primary size='large' 
      pad="medium" 
      color='#F0B90C' 
      label={label} 
      onClick={async () => {
        if (!installed) {
          onboarding.startOnboarding();
          return;
        }

        await onClickConnect();
      }}
    />
  );
}




function App() {

  const { loading, error, data } = useQuery(GET_TRANSFERS);
  //const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const items = [
    { label: 'HOME', href: '/' },
    { label: 'PKT-to-WPKT', href: 'PKTToWPKT' },
    { label: 'WPKT-to-PKT', href: 'WPKTToPKT' },
    //{ label: 'Teleport', href: 'Teleport' },
    { label: 'FAQ', href: 'FAQ' },
  ];

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  
  React.useEffect(() => {
  if (window.ethereum) {
    const handleAccountsChanged = (accounts) => {
      // Handle accounts change here instead of reloading the page
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // cleanup function
    return () => {
      window.ethereum.off('accountsChanged', handleAccountsChanged);
    };
  }
}, []); // empty dependency array means this effect runs once on mount and cleanup on unmount

   

  return (
    <div>
    <Collapsible btn={ WalletButton() }/>
    {/* <Collapsible btn={ WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal, clr}) }/> */}

        <Router>
          <Switch>
            <Route exact path="/">
            <Home btn={ WalletButton() } />
              {/*<Home btn={ WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal, clr}) } /> */}
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
            <Route exact path="/Teleport">
              <Teleport />
            </Route>
            <Route exact path="/WPKTToPKT">
              <WPKTToPKT />
            </Route>
            <Route exact path="/GetPKT">
              <GetPKT />
            </Route>
            <Route exact path="/GetWPKT">
              <GetWPKT />
            </Route>
            <Route exact path="/FAQ">
              <FAQ />
            </Route>
            <Route exact path="/ReCommit">
              <ReCommit />
            </Route>
            <Route exact path="/ToS">
              <ToS />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      <Grommet theme={customBreakpoints}>
      <ResponsiveContext.Consumer>
          {responsive => (responsive === 'smallmob') ? (
            <Footer background="#222323" pad="35px 25px 75px" align="center" justify="center" className="mainFooter">
              <Box size="small" align="center"><ImageFooter src={logoFooter} fit="contain" alt="react-logo" /></Box>
              <ButtonFooter href="/GetPKT" label="Recover PKT" color="#FFFFFF" margin={{ top: "50px", bottom: "40px"}} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
              {/*<ButtonFooter href="/GetWPKT" label="Recover WPKT" color="#FFFFFF" margin={{ bottom: "40px" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />*/}
              <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" margin={{ bottom: "40px" }} label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
              <ButtonFooter href="/ReCommit" align="center" label="Recommit Pair" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
            </Footer>
          ) : (responsive === 'small') ? (
            <Footer background="#222323" pad="35px 25px 75px" align="center" justify="center" className="mainFooter" >
              <Box size="small" align="center"><ImageFooter src={logoFooter} fit="contain" alt="react-logo" /></Box>
              <ButtonFooter href="/GetPKT" label="Recover PKT" color="#FFFFFF" margin={{ top: "50px", bottom: "40px"}} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
              {/*<ButtonFooter href="/GetWPKT" label="Recover WPKT" color="#FFFFFF" margin={{ bottom: "40px" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />*/}
              <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" margin={{ bottom: "40px" }} label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
              <ButtonFooter href="/ReCommit" align="center" label="Recommit Pair" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />

            </Footer>
          ) : (responsive === 'tablet') ? (
            <Footer background="#222323" pad="large" align="center" justify="center" className="mainFooter"> {/*style={{bottom:'0px', position:'fixed'}}*/}
                <Box size="small" className="mainFooterLogo"><ImageFooter src={logoFooter} fit="contain" alt="react-logo" /></Box>
                <ButtonFooter href="/GetPKT" label="Recover PKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
                {/* <ButtonFooter href="/GetWPKT" label="Recover WPKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} /> */}
                <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
                <ButtonFooter href="/ReCommit" align="center" label="Recommit Pair" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
            </Footer>
          ) : (responsive === 'medium') ? (
            <Footer background="#222323" pad="large" align="center" justify="center" className="mainFooter">
                <Box size="small" className="mainFooterLogo"><ImageFooter src={logoFooter} fit="contain" alt="react-logo" /></Box>
                <ButtonFooter href="/GetPKT" label="Recover PKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
                {/* <ButtonFooter href="/GetWPKT" label="Recover WPKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} /> */}
                <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
                <ButtonFooter href="/ReCommit" align="center" label="Recommit Pair" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
            </Footer>
          ) : (
            <Footer background="#222323" pad="large" align="center" justify="center" className="">
                <Box size="small" className="mainFooterLogo"><ImageFooter src={logoFooter} fit="contain" alt="react-logo" /></Box>
                <ButtonFooter href="/GetPKT" label="Recover PKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
              {/* <ButtonFooter href="/GetWPKT" label="Recover WPKT" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} /> */}
                <ButtonFooter href="https://pkt.cash/" target="_blank" align="center" label="Learn About PKT Cash" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
                <ButtonFooter href="/ReCommit" align="center" label="Recommit Pair" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
            </Footer>
          )}
      </ResponsiveContext.Consumer>
      <Box background={{ color: "#FBA300" }} pad="small" size="xxsmall" align="center" alignSelf="center"><Text textAlign="center" size="15px" color="#fff"><a style={{color:"white"}} href="/ToS">Terms of Service</a></Text></Box>
      </Grommet>
    </div>
  );
}

export default App;
