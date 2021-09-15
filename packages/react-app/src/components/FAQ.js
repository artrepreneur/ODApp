import React from "react"
import { Card, CardBody, Box, Text, Grid, ResponsiveContext, Image, Grommet } from "grommet";
import { themefont, ButtonCTA, HeadingDark , HeadingLight, ImageMobile, customBreakpoints } from ".";
import top_banner from "../img/faq-page/top-banner.jpg";
import bridge_illustration from "../img/faq-page/bridge-illustration.svg";
import bridging_illustration from "../img/faq-page/bridging.svg";
import bridging_illustration_mob from "../img/faq-page/watches-mobile-bg.png";
import expected_balance_illustration from "../img/faq-page/expected-balance.svg";
import metamask_illustration from "../img/faq-page/metamask.svg";
import pre_commit_illustration from "../img/faq-page/pre-commit.svg";
import recive_pkt_illustration from "../img/faq-page/receive-pkt.svg";
import recive_pkt_illustration_mob from "../img/faq-page/pkt-receive.png";
import receive_wpkt_illustration from "../img/faq-page/receive-wpkt.svg";
import save_hash_illustration from "../img/faq-page/save-hash.svg";
import smart_contract_illustration from "../img/faq-page/smart-contract.svg";
import trans_hash_illustration from "../img/faq-page/transaction-hash.svg";
import vault_illustration from "../img/faq-page/vault-image.svg";
import pkt_illustration from "../img/faq-page/what-is-pkt.svg";
import wpkt_illustration from "../img/faq-page/what-is-wpkt.svg";
import pktBg from "../img/faq-page/what-is-pkt-bg.svg";
import vaultBg from "../img/faq-page/vault-bg.svg";
import metamaskBgImg from "../img/faq-page/metamask-bg.svg";
import metamaskBgImgMob from "../img/faq-page/metamask-bg-mobile.svg";
import hashBgImg from "../img/faq-page/hash-bg.svg";
import watchesBgImg from "../img/faq-page/watches-bg.svg";
import precommitBridgeImg from "../img/faq-page/parashut-bg.svg";
import receivePKTImg from "../img/faq-page/receive-pkt-bg.svg";
import pktMobImg from "../img/faq-page/what-pkt-mobile.png";
import pktMobImgBg from "../img/faq-page/what-pkt-mobile-bg.svg";
import Slide from 'react-reveal/Slide';

var bannerStyle = {
    backgroundImage: 'url(' + top_banner + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative'
  };

var pktStyle = {
  backgroundColor: '#222323',
  backgroundImage: 'url(' + pktBg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '40% center',
  backgroundSize: '45%'
};

var pktStyleMobile = {
  backgroundColor: '#222323',
  backgroundImage: 'url(' + pktMobImgBg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 130%',
  backgroundSize: '100% auto'
};

var vaultStyle = {
  backgroundImage: 'url(' + vaultBg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '60%'
};

var vaultStyleMobile = {
  backgroundImage: 'url(' + vaultBg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: '100%'
};

var metamaskBg = {
  backgroundImage: 'url(' + metamaskBgImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '-4vw bottom',
  backgroundSize: 'cover'
}

var metamaskBgMob = {
  backgroundImage: 'url(' + metamaskBgImgMob + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundSize: 'cover'
}

var hashBg = {
  backgroundImage: 'url(' + hashBgImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center right',
  backgroundSize: 'contain'
}

var hashBgMobile = {
  backgroundImage: 'url(' + hashBgImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom',
  backgroundSize: 'contain'
}

var watchBg = {
  backgroundImage: 'url(' + watchesBgImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center right',
  backgroundSize: '55%'
}

var watchBgMob = {
  backgroundImage: 'url(' + watchesBgImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom',
  backgroundSize: 'contain'
}

var precommitBridge = {
  backgroundImage: 'url(' + precommitBridgeImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: '65%'
}

var precommitBridgeTablet = {
  backgroundImage: 'url(' + precommitBridgeImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: 'contain'
}

var precommitBridgeMob = {
  backgroundImage: 'url(' + precommitBridgeImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: '215%'
}

var receivePKT = {
  backgroundImage: 'url(' + receivePKTImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  backgroundSize: '19%'
}

var receiveWPKT = {
  backgroundImage: 'url(' + receive_wpkt_illustration + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: '50%'
}
var receiveWPKTMobLand = {
  backgroundImage: 'url(' + receive_wpkt_illustration + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: '60%'
}

var receiveWPKTMob = {
  backgroundImage: 'url(' + receive_wpkt_illustration + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  backgroundSize: 'contain'
}

function FAQ() {

  return (

    <Grommet theme={customBreakpoints}>
		{/*Top banner*/}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box direction="row" justify="left" align="center" height="88vh" pad={{ horizontal: "25px" }} round="none" style={bannerStyle}>
          <Box pad="medium" justify="left">
            <HeadingLight textAlign="center" margin="0 0 45px 0" level="1">FAQ</HeadingLight>
            <Text textAlign="center" size="16px" color="#ffffff" margin="0 ">The following is a compiled list of some of our most common questions.</Text>
            <ButtonCTA label="Keep Reading" color="#FFFFFF" style={{position: "absolute", bottom: "70px", left: "0", right: "0"}} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
          </Box>
        </Box>
      ) : (responsive === 'small') ? (
        <Box direction="row" justify="left" align="center" pad={{ horizontal: "20px", vertical: "4rem"}} round="none" style={bannerStyle}>
          <Box pad="medium" justify="left">
            <HeadingLight textAlign="start" margin="0 0 35px 0" level="1">FAQ</HeadingLight>
            <Text textAlign="start" size="18px" color="#ffffff" margin="0 ">The following is a compiled list of some of our most common questions.</Text>
            <ButtonCTA label="Keep Reading" color="#FFFFFF" margin={{ top: "50px" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
          </Box>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box direction="row" justify="left" align="center" pad={{ horizontal: "20px", vertical: "8rem"}} round="none" style={bannerStyle}>
          <Box pad="medium" justify="left">
            <HeadingLight textAlign="start" margin="0 0 50px 0" level="1">FAQ</HeadingLight>
            <Text textAlign="start" size="22px" color="#ffffff" margin="0 ">The following is a compiled list of some of our most common questions.</Text>
            <ButtonCTA label="Keep Reading" color="#FFFFFF" margin={{ top: "50px" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
          </Box>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box direction="row" justify="left" align="center" pad={{ horizontal: "25px", vertical: "8rem"}} round="none" style={bannerStyle}>
          <Box pad="medium" justify="left">
            <HeadingLight textAlign="start" margin="0 0 50px 0" level="1">FAQ</HeadingLight>
            <Text textAlign="start" size="22px" color="#ffffff" margin="0 ">The following is a compiled list of some of our most common questions.</Text>
            <ButtonCTA label="Keep Reading" color="#FFFFFF" margin={{ top: "50px" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
          </Box>
        </Box>
      ) : (
        <Box direction="row" justify="left" align="center" height="large" pad={{ horizontal: "8rem" }} round="none" style={bannerStyle}>
          <Box pad="medium" justify="left">
            <HeadingLight textAlign="start" margin="0 0 4vw 0" level="1">FAQ</HeadingLight>
            <Text textAlign="start" size="26px" color="#ffffff" margin="0 ">The following is a compiled list of some of our most common questions.</Text>
            <Slide bottom cascade><ButtonCTA label="Keep Reading" color="#FFFFFF" margin={{ top: "4vw" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} /></Slide>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* what is Bridge */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="70px 25px" >
              <Box gridArea="left" justify="center" alignSelf="center">
                    <HeadingDark textAlign="center" margin="0 0 45px 0" level="2">What is a Bridge?</HeadingDark>
                    <Text textAlign="center" size="16px" color="#707070">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, and a bridge network to transfer value from one chain to another.</Text>
              </Box>
              <Box gridArea="right" justify="center" margin={{top:"35px"}}><ImageMobile alignSelf="center" src={bridge_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 20px" >
              <Box gridArea="left" justify="center" alignSelf="center" pad="0 18vw">
                <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">What is a Bridge?</HeadingDark>
                <Text textAlign="center" size="18px" color="#707070">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, and a bridge network to transfer value from one chain to another.</Text>
              </Box>
              <Box gridArea="right" justify="center" margin={{top:"50px"}}><ImageMobile alignSelf="center" width="400" src={bridge_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="0 50px" >
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
                  <Box gridArea="right" justify="start"  pad="4rem 0"><Image alignSelf="end" width="350" src={bridge_illustration} fit="contain" /></Box>
                  <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">What is a Bridge?</HeadingDark>
                    <Text textAlign="start" size="20px" color="#707070">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, a bridge server, and a bridge network to transfer value from one chain to another.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="0 50px" >
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
                  <Box gridArea="right" justify="start"  pad="4rem 0"><Image alignSelf="end" width="450" src={bridge_illustration} fit="contain" /></Box>
                  <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is a Bridge?</HeadingDark>
                    <Text textAlign="start" size="22px" color="#707070">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, a bridge server, and a bridge network to transfer value from one chain to another.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#fff" pad="none" >
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
                  <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={bridge_illustration} fit="contain" /></Box>
                  <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is a Bridge?</HeadingDark>
                    <Text textAlign="start" size="26px" color="#707070">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, a bridge server, and a bridge network to transfer value from one chain to another.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* what is PKT */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" pad="70px 25px 50px" style={pktStyleMobile}>
              <Box justify="center" alignSelf="center">
                    <HeadingLight textAlign="center" margin="0 0 45px 0" level="2">What is PKT?</HeadingLight>
                    <Text textAlign="center" size="16px" color="#fff" margin="0 0 40px 0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check <a href="https://pkt.cash/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
              </Box>
              <Box justify="start" pad="none"><Image alignSelf="center" style={{maxWidth: "100%"}} src={pktMobImg} fit="cover" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" pad="50px 20px" style={pktStyleMobile}>
              <Box justify="center" alignSelf="center" pad="0 18vw">
                    <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">What is PKT?</HeadingLight>
                    <Text textAlign="center" size="18px" color="#fff" margin="0 0 35px 0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check <a href="https://pkt.cash/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
              </Box>
              <Box justify="start" pad="none"><Image alignSelf="center" width="350" style={{maxWidth: "100%"}} src={pktMobImg} fit="cover" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" pad="0 50px" style={pktStyle}>
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
                >
                  <Box gridArea="left" justify="start" pad="none"><Image alignSelf="start" width="450" src={pkt_illustration} fit="cover" style={{ position: "absolute", marginTop: "-40px", marginLeft: "-50px" }} /></Box>
                  <Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0">
                    <HeadingLight textAlign="start" margin="0 0 35px 0" level="2">What is PKT?</HeadingLight>
                    <Text textAlign="start" size="20px" color="#fff" margin="0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check <a href="https://pkt.cash/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                  </Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
          <Card width="full" round="none" pad="0 50px" style={pktStyle}>
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
                >
                  <Box gridArea="left" justify="start" pad="none"><Image alignSelf="left" width="500" src={pkt_illustration} fit="cover" style={{ position: "absolute", marginTop: "-55px", marginLeft: "-50px" }} /></Box>
                  <Slide right><Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0">
                    <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">What is PKT?</HeadingLight>
                    <Text textAlign="start" size="22px" color="#fff" margin="0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check <a href="https://pkt.cash/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                  </Box></Slide>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card width="full" round="none" pad="none" style={pktStyle}>
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
                >
                  <Box gridArea="left" height="large" justify="start" pad="none"><Image alignSelf="left" width="850" src={pkt_illustration} fit="cover" style={{ position: "absolute", marginTop: "-125px" }} /></Box>
                  <Slide right><Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                    <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">What is PKT?</HeadingLight>
                    <Text textAlign="start" size="26px" color="#fff" margin="0 45px 0 0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check <a href="https://pkt.cash/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                  </Box></Slide>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* What is WPKT */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="70px 25px 0">
              <Box justify="center" alignSelf="center">
                <HeadingDark textAlign="center" margin="0 0 45px 0" level="2">What is WPKT?</HeadingDark>
                <Text textAlign="center" size="16px" color="#707070">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an BEP20 token and is compatible with all BEP20 platforms.</Text>
              </Box>
              <Box justify="start"><Image alignSelf="center" style={{maxWidth: "125%"}} src={wpkt_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 20px">
              <Box justify="center" alignSelf="center" pad="0 18vw">
                <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">What is WPKT?</HeadingDark>
                <Text textAlign="center" size="18px" color="#707070">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an BEP20 token and is compatible with all BEP20 platforms.</Text>
              </Box>
              <Box justify="start"><Image alignSelf="center" width="400" src={wpkt_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="0 50px">
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
                  <Box gridArea="right" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" height="250" src={wpkt_illustration} fit="contain" /></Box>
                  <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">What is WPKT?</HeadingDark>
                    <Text textAlign="start" size="20px" color="#707070">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an BEP20 token and is compatible with all BEP20 platforms.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="0 50px">
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
                  <Box gridArea="right" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" height="250" src={wpkt_illustration} fit="contain" /></Box>
                  <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is WPKT?</HeadingDark>
                    <Text textAlign="start" size="22px" color="#707070">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an BEP20 token and is compatible with all BEP20 platforms.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#fff" pad="none">
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
                  <Box gridArea="right" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" height="300" src={wpkt_illustration} fit="contain" /></Box>
                  <Box gridArea="left" justify="center" alignSelf="center" pad="0 9rem 0 8rem"><Slide left>
                    <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is WPKT?</HeadingDark>
                    <Text textAlign="start" size="26px" color="#707070">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an BEP20 token and is compatible with all BEP20 platforms.</Text>
                    </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* What is the Vault */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="70px 25px" style={vaultStyleMobile}>
              <Box justify="center" alignSelf="center">
                <HeadingLight textAlign="center" margin="0 0 45px 0" level="2">What is the Vault?</HeadingLight>
                <Text textAlign="center" size="16px" color="#fff">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
              </Box>
              <Box justify="start" pad="none"><Image alignSelf="center" style={{maxWidth: "95%"}} margin={{top:"50px"}} src={vault_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 20px" style={vaultStyleMobile}>
              <Box justify="center" alignSelf="center" pad="0 16vw">
                <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">What is the Vault?</HeadingLight>
                <Text textAlign="center" size="18px" color="#fff">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
              </Box>
              <Box justify="start" pad="none"><Image alignSelf="center" width="400" src={vault_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="0 50px" style={vaultStyle}>
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
                  <Box gridArea="left" justify="start" pad="none"><Image alignSelf="left" width="400" src={vault_illustration} fit="contain" /></Box>
                  <Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0"><Slide right>
                    <HeadingLight textAlign="start" margin="0 0 35px 0" level="2">What is the Vault?</HeadingLight>
                    <Text textAlign="start" size="20px" color="#fff">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="0 50px" style={vaultStyle}>
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
                  <Box gridArea="left" justify="start" pad="none"><Image alignSelf="left" width="400" src={vault_illustration} fit="contain" /></Box>
                  <Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0"><Slide right>
                    <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">What is the Vault?</HeadingLight>
                    <Text textAlign="start" size="22px" color="#fff">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
                  </Slide></Box>
                </Grid>
              </CardBody>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#222323" pad="8rem" style={vaultStyle}>
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
                      <Box gridArea="left" justify="start" pad="none"><Image alignSelf="left" width="640" src={vault_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="0 0 0 8rem"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">What is the Vault?</HeadingLight>
                        <Text textAlign="start" size="26px" color="#fff" margin="0 3rem 0 0">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
          </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* What is Metamask? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="none" >
              <Box justify="center" alignSelf="center" pad="70px 20px 50px">
                    <HeadingDark textAlign="center" margin="0 0 50px 0" level="2">What is Metamask?</HeadingDark>
                    <Text textAlign="center" size="16px" color="#707070">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
              </Box>
              <Box justify="start" style={metamaskBgMob} pad="0 0 75px"><Image alignSelf="center" style={{maxWidth: "80%"}} src={metamask_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 0 0">
              <Box justify="center" alignSelf="center" pad="0 16vw">
                  <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">What is Metamask?</HeadingDark>
                  <Text textAlign="center" size="18px" color="#707070">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
              </Box>
              <Box justify="start" style={metamaskBgMob} pad="35px 0 50px"><Image alignSelf="center" width="350" src={metamask_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
              <Card width="full" round="none" background="#fff" pad="0 50px">
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
                      <Box gridArea="right" justify="start" style={metamaskBg}><Image alignSelf="center" width="425" margin={{top: "45px"}} style={{position: "absolute"}} src={metamask_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="6em 0"><Slide left>
                        <HeadingDark textAlign="left" margin="0 0 35px 0" level="2">What is Metamask?</HeadingDark>
                        <Text textAlign="start" size="20px" color="#707070" margin="0 0 1rem 0">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
              <Card width="full" round="none" background="#fff" pad="0 50px">
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
                      <Box gridArea="right" justify="start" style={metamaskBg}><Image alignSelf="center" width="450" margin={{top: "45px"}} style={{position: "absolute"}} src={metamask_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="6em 0"><Slide left>
                        <HeadingDark textAlign="left" margin="0 0 50px 0" level="2">What is Metamask?</HeadingDark>
                        <Text textAlign="start" size="22px" color="#707070" margin="0 0 1rem 0">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
        </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#fff" pad="none" >
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem" style={metamaskBg}><Image alignSelf="left" width="725" margin={{top: "85px"}} style={{position: "absolute"}} src={metamask_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem"><Slide left>
                        <HeadingDark textAlign="left" margin="0 0 50px 0" level="2">What is Metamask?</HeadingDark>
                        <Text textAlign="start" size="26px" color="#707070" margin="0 0 1rem 0">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{color: "#FBA300"}}>here</a>.</Text>
                      </Slide></Box>
                    </Grid>
              </CardBody>
            </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* What is a Smart Contract */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="70px 25px" >
              <Box justify="center" alignSelf="center" pad="0 0 25px">
                <HeadingLight textAlign="center" margin="0 0 40px 0" level="2">What is a Smart Contract?</HeadingLight>
                <Text textAlign="center" size="16px" color="#fff">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
              </Box>
              <Box justify="start"><Image alignSelf="center" style={{maxWidth: "90%", margin: "0 auto"}} src={smart_contract_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 20px" >
              <Box justify="center" alignSelf="center" pad="0 16vw">
                <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">What is a Smart Contract?</HeadingLight>
                <Text textAlign="center" size="18px" color="#fff">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
              </Box>
              <Box justify="start"><Image alignSelf="center" style={{maxWidth: "40%", margin: "35px auto 0"}} src={smart_contract_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
              <Card width="full" round="none" background="#222323" pad="0 50px">
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="375" src={smart_contract_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center"><Slide right>
                        <HeadingLight textAlign="left" margin="0 0 35px 0" level="2">What is a Smart Contract?</HeadingLight>
                        <Text textAlign="start" size="20px" color="#fff">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (responsive === 'medium') ? (
        <Box>
              <Card width="full" round="none" background="#222323" pad="0 50px">
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="400" src={smart_contract_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center"><Slide right>
                        <HeadingLight textAlign="left" margin="0 0 50px 0" level="2">What is a Smart Contract?</HeadingLight>
                        <Text textAlign="start" size="22px" color="#fff">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#222323" pad="4rem 8rem">
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="595" src={smart_contract_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="0 0 0 10vw"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">What is a Smart Contract?</HeadingLight>
                        <Text textAlign="start" size="26px" color="#fff" margin="0 0 1rem 0">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* What is a Transaction Hash? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="70px 20px 0" style={hashBgMobile}>
              <Box justify="center" alignSelf="center">
                    <HeadingDark textAlign="center" margin="0 0 40px 0" level="2">What is a Transaction Hash?</HeadingDark>
                    <Text textAlign="center" size="16px" color="#707070">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
              </Box>
              <Box justify="start" pad="50px 0 25px"><ImageMobile alignSelf="center" src={trans_hash_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 20px" style={hashBgMobile}>
              <Box justify="center" alignSelf="center" pad="0 14vw">
                    <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">What is a Transaction Hash?</HeadingDark>
                    <Text textAlign="center" size="18px" color="#707070">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
              </Box>
              <Box margin={{top: "35px"}}><ImageMobile alignSelf="center" width="400" src={trans_hash_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
            <Card width="full" round="none" background="#fff" pad="0 50px" style={hashBg}>
                  <CardBody>
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['55%', '45%']}
                    alignContent={['center']}
                    justifyContent={['center']}
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="400" style={{position: "absolute"}} margin={{top: "-25px"}} src={trans_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="4rem 0"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">What is a Transaction Hash?</HeadingDark>
                        <Text textAlign="start" size="20px" color="#707070">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (responsive === 'medium') ? (
        <Box>
            <Card width="full" round="none" background="#fff" pad="0 50px" style={hashBg}>
                  <CardBody>
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['55%', '45%']}
                    alignContent={['center']}
                    justifyContent={['center']}
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="450" style={{position: "absolute"}} margin={{top: "-25px"}} src={trans_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="4rem 0"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is a Transaction Hash?</HeadingDark>
                        <Text textAlign="start" size="22px" color="#707070">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
            <Card width="full" round="none" background="#fff" pad="12rem 0 12rem 8rem" style={hashBg}>
                  <CardBody>
                    <Grid
                    fill
                    areas={[
                      { name: 'left', start: [0, 0], end: [0, 0] },
                      { name: 'right', start: [1, 0], end: [1, 0] },
                    ]}
                    columns={['55%', '45%']}
                    alignContent={['center']}
                    justifyContent={['center']}
                    rows={['flex']}
                    gap="none"
                    background="#fff"
                    >
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="700" style={{position: "absolute"}} margin={{top: "-14vw"}} src={trans_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">What is a Transaction Hash?</HeadingDark>
                        <Text textAlign="start" size="26px" color="#707070" margin="0 14vw 0 0">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
            </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* I Didn't Save My Transaction Hash? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="70px 20px 20px">
              <Box justify="center" alignSelf="center">
                  <HeadingLight textAlign="center" margin="0 0 40px 0" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                  <Text textAlign="center" size="16px" color="#fff">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address:<br /><br /><span style={{color: "#FBA300", textDecoration: "underlined"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</span><br /><br />Once you have your transaction hashes, you can complete bridging in any case.</Text>
              </Box>
              <Box justify="start"><ImageMobile alignSelf="center" src={save_hash_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 20px">
              <Box justify="center" alignSelf="center" pad="0 16vw">
                  <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                  <Text textAlign="center" size="18px" color="#fff">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address:<br /><br /><span style={{color: "#FBA300", textDecoration: "underlined"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</span><br /><br />Once you have your transaction hashes, you can complete bridging in any case.</Text>
              </Box>
              <Box margin={{top: "35px"}}><ImageMobile alignSelf="center" width="350" src={save_hash_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="0 50px">
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
                    <Box gridArea="left" justify="start" pad={{left: "25px"}}><Image alignSelf="start" width="350" src={save_hash_illustration} fit="contain" /></Box>
                    <Box gridArea="right" justify="center" alignSelf="center" pad="4rem 0"><Slide right>
                      <HeadingLight textAlign="start" margin="0 0 35px 0" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                      <Text textAlign="start" size="20px" color="#fff">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address:<br /><br /><span style={{color: "#FBA300", textDecoration: "underlined"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</span><br /><br />Once you have your transaction hashes, you can complete bridging in any case.</Text>
                    </Slide></Box>
                  </Grid>
                </CardBody>
            </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
            <Card width="full" round="none" background="#222323" pad="0 50px">
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
                      <Box gridArea="left" justify="start" pad={{left: "50px"}}><Image alignSelf="start" width="400" src={save_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="4rem 0"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                        <Text textAlign="start" size="22px" color="#fff">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address:<br /><br /><span style={{color: "#FBA300", textDecoration: "underlined"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</span><br /><br />Once you have your transaction hashes, you can complete bridging in any case.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#222323" pad="8rem">
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="500" src={save_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" margin={{left: "10rem", right: "2rem"}}><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                        <Text textAlign="start" size="26px" color="#fff">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address:<br /><br /><span style={{color: "#FBA300", textDecoration: "underlined"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz</span><br /><br />Once you have your transaction hashes, you can complete bridging in any case.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* Why Does Bridging Take So Long? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="70px 20px 30px" style={watchBgMob}>
              <Box justify="center" alignSelf="center" pad="0 0 50px">
                <HeadingDark textAlign="center" margin="0 0 40px 0" level="2">Why Does Bridging Take So Long?</HeadingDark>
                <Text textAlign="center" size="16px" color="#707070">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. </Text>
              </Box>
              <Box justify="start"><ImageMobile alignSelf="center" src={bridging_illustration_mob} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 20px" style={watchBgMob}>
              <Box justify="center" alignSelf="center" pad="0 10vw">
                <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">Why Does Bridging Take So Long?</HeadingDark>
                <Text textAlign="center" size="18px" color="#707070">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. </Text>
              </Box>
              <Box margin={{top: "35px"}}><ImageMobile alignSelf="center" width="350" src={bridging_illustration_mob} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
              <Card width="full" round="none" background="#fff" pad="0 50px" style={watchBg}>
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
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="475" src={bridging_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="4rem 0"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">Why Does Bridging Take So Long?</HeadingDark>
                        <Text textAlign="start" size="20px" color="#707070">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. </Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
        </Box>
      ) : (responsive === 'medium') ? (
        <Box>
              <Card width="full" round="none" background="#fff" pad="0 50px" style={watchBg}>
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
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="550" src={bridging_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center" pad="4rem 0"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Does Bridging Take So Long?</HeadingDark>
                        <Text textAlign="start" size="22px" color="#707070">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. </Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
            <Card width="full" round="none" background="#fff" pad="10rem 6rem 10rem 8rem" style={watchBg}>
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
                      <Box gridArea="right" height="large" justify="start"><Image alignSelf="end" width="725" src={bridging_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 5vw 0 0"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Does Bridging Take So Long?</HeadingDark>
                        <Text textAlign="start" size="26px" color="#707070">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. </Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* Why Must I Pre-Commit When Bridging WPKT? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="70px 25px" style={precommitBridgeMob}>
              <Box justify="center" alignSelf="center" pad="0 0 40px">
                  <HeadingLight textAlign="center" margin="0 0 40px 0" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                  <Text textAlign="center" size="16px" color="#fff">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction hash and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
              </Box>
              <Box justify="start"><ImageMobile alignSelf="center" src={pre_commit_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 20px" style={precommitBridgeTablet}>
              <Box justify="center" alignSelf="center" pad="0 10vw">
                  <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                  <Text textAlign="center" size="18px" color="#fff">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction hash and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
              </Box>
              <Box margin={{top: "35px"}}><ImageMobile alignSelf="center" width="350" src={pre_commit_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
            <Card width="full" round="none" background="#222323" pad="0 50px" style={precommitBridge}>
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="400" src={pre_commit_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="4rem 0"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 35px 0" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                        <Text textAlign="start" size="20px" color="#fff">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction hash and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (responsive === 'medium') ? (
        <Box>
            <Card width="full" round="none" background="#222323" pad="0 50px" style={precommitBridge}>
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="450" src={pre_commit_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="4rem 0"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                        <Text textAlign="start" size="22px" color="#fff">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction hash and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
          <Card width="full" round="none" background="#222323" pad="8rem" style={precommitBridge}>
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
                      <Box gridArea="left" justify="start"><Image alignSelf="left" width="700" src={pre_commit_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="0 0 0 10rem"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                        <Text textAlign="start" size="26px" color="#fff">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction hash and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
            </Card>
        </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* Why Didn't I Receive PKT? */}
    <ResponsiveContext.Consumer>
    {responsive => (responsive === 'smallmob') ? (
      <Box>
        <Card width="full" round="none" background="#fff" pad="70px 25px 0">
            <Box justify="center" alignSelf="center" pad="0 0 25px">
                  <HeadingDark textAlign="center" margin="0 0 40px 0" level="2">Why Didn't I Receive PKT?</HeadingDark>
                  <Text textAlign="center" size="16px" color="#707070">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
            </Box>
            <Box justify="start"><Image alignSelf="center" style={{maxWidth: "100vw"}} src={recive_pkt_illustration_mob} fit="contain" /></Box>
        </Card>
      </Box>
    ) : (responsive === 'small') ? (
      <Box>
        <Card width="full" round="none" background="#fff" pad="50px 20px">
            <Box justify="center" alignSelf="center" pad="0 14vw">
                  <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">Why Didn't I Receive PKT?</HeadingDark>
                  <Text textAlign="center" size="18px" color="#707070">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
            </Box>
            <Box margin={{top:"35px"}}><Image alignSelf="center" width="350" src={recive_pkt_illustration_mob} fit="contain" /></Box>
        </Card>
      </Box>
    ) : (responsive === 'tablet') ? (
      <Box>
        <Card width="full" round="none" background="#fff" pad="0 50px" style={receivePKT}>
            <CardBody>
              <Grid
              fill
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}
              columns={['60%', '40%']}
              alignContent={['center']}
              justifyContent={['center']}
              rows={['flex']}
              gap="none"
              background="#fff"
              >
                <Box gridArea="right" justify="start"><Image alignSelf="center" width="375" src={recive_pkt_illustration} fit="contain" /></Box>
                <Box gridArea="left" justify="center" alignSelf="center" pad="6rem 0"><Slide left>
                  <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">Why Didn't I Receive PKT?</HeadingDark>
                  <Text textAlign="start" size="20px" color="#707070" margin="0 10vw 0 0">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
                </Slide></Box>
              </Grid>
            </CardBody>
        </Card>
      </Box>
    ) : (responsive === 'medium') ? (
      <Box>
        <Card width="full" round="none" background="#fff" pad="0 50px" style={receivePKT}>
            <CardBody>
              <Grid
              fill
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}
              columns={['60%', '40%']}
              alignContent={['center']}
              justifyContent={['center']}
              rows={['flex']}
              gap="none"
              background="#fff"
              >
                <Box gridArea="right" justify="start"><Image alignSelf="center" width="400" src={recive_pkt_illustration} fit="contain" /></Box>
                <Box gridArea="left" justify="center" alignSelf="center" pad="6rem 0"><Slide left>
                  <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive PKT?</HeadingDark>
                  <Text textAlign="start" size="22px" color="#707070" margin="0 10vw 0 0">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
                </Slide></Box>
              </Grid>
            </CardBody>
        </Card>
      </Box>
    ) : (
      <Box>
        <Card width="full" round="none" background="#fff" pad="8rem" style={receivePKT}>
            <CardBody>
              <Grid
              fill
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}
              columns={['60%', '40%']}
              alignContent={['center']}
              justifyContent={['center']}
              rows={['flex']}
              gap="none"
              background="#fff"
              >
                <Box gridArea="right" justify="start"><Image alignSelf="center" width="475" src={recive_pkt_illustration} fit="contain" /></Box>
                <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                  <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive PKT?</HeadingDark>
                  <Text textAlign="start" size="26px" color="#707070" margin="0 15vw 0 0">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
                </Slide></Box>
              </Grid>
            </CardBody>
        </Card>
      </Box>
    )}
    </ResponsiveContext.Consumer>

    {/* Why Didn't I Receive WPKT? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="70px 25px 300px" style={receiveWPKTMob}>
              <Box justify="center" alignSelf="center" pad="0 0 25px">
                <HeadingLight textAlign="center" margin="0 0 40px 0" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                <Text textAlign="center" size="16px" color="#fff">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
              </Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#222323" pad="50px 20px" style={receiveWPKTMobLand}>
              <Box justify="center" alignSelf="center" pad="0 3vw 0 40vw">
                <HeadingLight textAlign="center" margin="0 0 35px 0" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                <Text textAlign="center" size="18px" color="#fff">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
              </Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
            <Card width="full" round="none" background="#222323" pad="0 50px" style={receiveWPKT}>
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
                    background="#222323"
                    >
                      <Box gridArea="left" justify="start"></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 35px 0" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                        <Text textAlign="start" size="20px" color="#fff">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (responsive === 'medium') ? (
        <Box>
            <Card width="full" round="none" background="#222323" pad="0 50px" style={receiveWPKT}>
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
                    background="#222323"
                    >
                      <Box gridArea="left" justify="start"></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="6rem 0"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                        <Text textAlign="start" size="22px" color="#fff">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
            <Card width="full" round="none" background="#222323" pad="12rem 8rem" style={receiveWPKT}>
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
                    background="#222323"
                    >
                      <Box gridArea="left" justify="start"></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="0 0 0 9vw"><Slide right>
                        <HeadingLight textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                        <Text textAlign="start" size="26px" color="#fff">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      )}
    </ResponsiveContext.Consumer>

    {/* Why Didn't I Receive the Balance I Expected? */}
    <ResponsiveContext.Consumer>
      {responsive => (responsive === 'smallmob') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="70px 10px" >
                <Box>
                  <HeadingDark textAlign="center" margin="0 0 40px 0" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                  <Text textAlign="center" size="16px" color="#707070">The ODApp bridge network charges a sliding 1% to 3.5% fee for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs, operate infrastructure and expand this service.</Text>
              </Box>
              <Box><Image style={{maxWidth: "100%"}} alignSelf="center" src={expected_balance_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'small') ? (
        <Box>
          <Card width="full" round="none" background="#fff" pad="50px 20px" >
                <Box justify="center" alignSelf="center" pad="0 14vw">
                  <HeadingDark textAlign="center" margin="0 0 35px 0" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                  <Text textAlign="center" size="18px" color="#707070">The ODApp bridge network charges a The ODApp bridge network charges a sliding 1% to 3.5% fee for all transactions for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs, operate infrastructure and expand this service.</Text>
              </Box>
              <Box margin={{top: "35px"}}><Image width="350" style={{maxWidth: "100%"}} alignSelf="center" src={expected_balance_illustration} fit="contain" /></Box>
          </Card>
        </Box>
      ) : (responsive === 'tablet') ? (
        <Box>
            <Card width="full" round="none" background="#fff" pad="0 50px" >
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
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="475" src={expected_balance_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 35px 0" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                        <Text textAlign="start" size="20px" color="#707070" margin="0 5rem 0 0">The ODApp bridge network charges a sliding 1% to 3.5% fee for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs, operate infrastructure and expand this service.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (responsive === 'medium') ? (
        <Box>
            <Card width="full" round="none" background="#fff" pad="0 50px" >
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
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="550" src={expected_balance_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                        <Text textAlign="start" size="22px" color="#707070" margin="0 5rem 0 0">The ODApp bridge network charges a sliding 1% to 3.5% fee for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs, operate infrastructure and expand this service.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      ) : (
        <Box>
            <Card width="full" round="none" background="#fff" pad="3rem 8rem" >
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
                      <Box gridArea="right" justify="start"><Image alignSelf="end" width="750" src={expected_balance_illustration} fit="contain" /></Box>
                      <Box gridArea="left" justify="center" alignSelf="center"><Slide left>
                        <HeadingDark textAlign="start" margin="0 0 50px 0" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                        <Text textAlign="start" size="26px" color="#707070" margin="0 10rem 0 0">The ODApp bridge network charges a sliding 1% to 3.5% fee for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs, operate infrastructure and expand this service.</Text>
                      </Slide></Box>
                    </Grid>
                  </CardBody>
              </Card>
          </Box>
      )}
    </ResponsiveContext.Consumer>

    </Grommet>

  );
}

export default FAQ;
