import React, { useRef } from "react"
import { Footer, Nav, Card, CardBody, CardHeader, Anchor, Box, Text, Grid, ResponsiveContext, Image, Grommet, Heading } from "grommet";
import { useHistory } from "react-router-dom";
import { themefont, ButtonCTA } from ".";
import {HeadingDark , HeadingLight, IdentifierTitle, IdentifierSubTitle, IdentifierText, PktBlock} from ".";
import SmoothScroll from "./SmoothScroll/SmoothScroll";
import top_banner from "../img/faq-page/top-banner.jpg";
import bridge_illustration from "../img/faq-page/bridge-illustration.svg";
import bridging_illustration from "../img/faq-page/bridging.svg";
import expected_balance_illustration from "../img/faq-page/expected-balance.svg";
import metamask_illustration from "../img/faq-page/metamask.svg";
import pre_commit_illustration from "../img/faq-page/pre-commit.svg";
import recive_pkt_illustration from "../img/faq-page/receive-pkt.svg";
import receive_wpkt_illustration from "../img/faq-page/receive-wpkt.svg";
import save_hash_illustration from "../img/faq-page/save-hash.svg";
import smart_contract_illustration from "../img/faq-page/smart-contract.svg";
import trans_hash_illustration from "../img/faq-page/transaction-hash.svg";
import vault_illustration from "../img/faq-page/vault-image.svg";
import pkt_illustration from "../img/faq-page/what-is-pkt.svg";
import wpkt_illustration from "../img/faq-page/what-is-wpkt.svg";
import pktBg from "../img/faq-page/what-is-pkt-bg.svg";

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

function FAQ() {
  
  return (

    <Grommet theme={themefont}> 
		{/*Top banner*/}
		<Box direction="row" justify="left" align="center" height="large" pad={{ horizontal: "8rem" }} round="none" style={bannerStyle}>
			<Box pad="medium" justify="left">
        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="1">FAQ</HeadingLight>
        <Text align="left" size="26px" color="#ffffff" margin="0">The following is a compiled list of some of our most common questions.</Text>
        <ButtonCTA label="Keep Reading" color="#FFFFFF" margin={{ top: "4vw" }} hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0", boxShadow: "0" }} />
			</Box>   
		</Box>

            {/* what is Bridge */}
            <Box  >
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
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is a Bridge?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">A bridge is a connection point between two disparate blockchains. It allows chains that aren't connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts, a bridge server, and Chainlink to transfer value from one chain to another.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* what is PKT */}
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
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is PKT?</HeadingLight>
                        <Text align="left" size="26px" color="#fff" margin="0 0 1rem 0">PKT is the currency of the decentralized bandwidth marketplace. PKT strives to bring a free and decentralized internet to the world, and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW) called PacketCrypt. Since it is mined, it is a digitally hard asset and therefore cannot be created out of thin air. For more details on the project check here.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* What is WPKT */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="725" src={wpkt_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is WPKT?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">WPKT is PKT on the ethereum blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more than 6 billion WPKT. WPKT is an ERC20 token and is compatible with all ERC20 platforms.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* What is the Vault */}
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" >
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
                      <Box gridArea="left" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={vault_illustration} fit="contain" /></Box>
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is the Vault?</HeadingLight>
                        <Text align="left" size="26px" color="#fff" margin="0 0 1rem 0">The vault is a PKT address which stores the PKT that WPKT tokens are issued against. When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address, your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* What is Metamask? */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={metamask_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is Metamask?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">Metamask is a popular wallet that is compatible with multiple chains, including Binance Smart Chain, Ethereum, Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. For more details on installing Metamask check here.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* What is a Smart Contract */}
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" >
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
                      <Box gridArea="left" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={smart_contract_illustration} fit="contain" /></Box>
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is a Smart Contract?</HeadingLight>
                        <Text align="left" size="26px" color="#fff" margin="0 0 1rem 0">A smart contract is a program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. ODapp uses smart contracts to issue WPKT on-chain.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* What is a Transaction Hash? */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={trans_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">What is a Transaction Hash?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, and Binance Smart Chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system to value transfer between chains.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* I Didn't Save My Transaction Hash? */}
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" >
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
                      <Box gridArea="left" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={save_hash_illustration} fit="contain" /></Box>
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">I Didn't Save My Transaction Hash?</HeadingLight>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your Binance Smart Chain transactions are saved in your Metamask wallet, but you can also find them on etherscan. Just search for your Binance Smart Chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, you can search for your PKT transaction hashes on the PKT explorer. To find your transaction hash, lookup the last transaction your PKT address executed against the address: pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz. Once you have your transaction hashes, you can complete bridging in any case.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* Why Does Bridging Take So Long? */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={bridging_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Why Does Bridging Take So Long?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain. Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 12 seconds while PKT cash's block time is 1 minute. In practice, we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. Additionally, Chainlink is used to create cross-chain communication. Chainlink adds additional latency to the process, via oracle requests. So, all of this together accounts for a slow settlement time. Bridging isn't exchanging or swapping, it is an entirely different process, and thus speed expectations should be adjusted to meet the realities of bridging.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* Why Must I Pre-Commit When Bridging WPKT? */}
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" >
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
                      <Box gridArea="left" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={pre_commit_illustration} fit="contain" /></Box>
                      <Box gridArea="right" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Why Must I Pre-Commit When Bridging WPKT?</HeadingLight>
                        <Text align="left" size="26px" color="#fff" margin="0 0 1rem 0">When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is a Binance smart chain address). Sending funds to the vault address without performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction id and submit it as their own. This can be prevented by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* Why Didn't I Receive PKT? */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={recive_pkt_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Why Didn't I Receive PKT?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this link or click "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction hash was provided to you on the "GetPKT" screen. You can also find it inside of your Metamask wallet in the transaction history. You can use this guide to find token transactions in Metamask.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* Why Didn't I Receive WPKT? */}
            <Box>
              <Card width="full" round="none" background="#222323" pad="none" >
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
                      <Box gridArea="left" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={receive_wpkt_illustration} fit="contain" /></Box>
                      <Box gridArea="right" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingLight textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Why Didn't I Receive WPKT?</HeadingLight>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx).</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>

            {/* Why Didn't I Receive the Balance I Expected? */}
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
                      <Box gridArea="right" height="large" justify="start" pad="0 0 0 5rem"><Image alignSelf="left" width="675" src={expected_balance_illustration} fit="contain" /></Box>
                      <Box gridArea="left" height="large" justify="center" alignSelf="center" pad="0 10rem 0 8rem">
                        <HeadingDark textAlign="left" margin="0 0 3rem 0" size="4xl" weight="bold" color="#ffffff" level="2">Why Didn't I Receive the Balance I Expected?</HeadingDark>
                        <Text align="left" size="26px" color="#707070" margin="0 0 1rem 0">The ODApp bridge network charges a 3.5% fee for all transactions. Therefore, your received amount WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs over Chainlink, operate infrastructure and expand this service.</Text>
                        <Box pad="2rem 0 0"><p align="left"></p></Box>
                      </Box>                    
                    </Grid>
                  </CardBody>
              </Card>
            </Box>
    </Grommet>
      
  );
}

export default FAQ;