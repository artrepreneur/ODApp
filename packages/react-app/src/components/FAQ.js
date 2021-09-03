import React from "react";
import { Card, Text, CardBody, CardHeader, Box} from "grommet";
import { BodyCenteredAlt2 } from ".";
import { useHistory } from "react-router-dom";

function FAQ() {
  const history = useHistory();

  return (
      
      <BodyCenteredAlt2><Box pad="small">
      
        <Card width="large" background="light-1" pad="none" >     
            <CardHeader background="#F0B90C" pad="none" justify="center" height="xsmall">
                  <h2 align="center">FAQs</h2>
            </CardHeader> 

            <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
                  

                <Box pad="small">
                <Text textAlign="left" alignSelf="center" margin="small" size="medium"><p>The following is a compiled list of some of our most popular inquires. 
                </p></Text>
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is a Bridge?</h5>
                        <Text align="left" color="white">
                            A bridge is a connection point between two disparate blockchains. It allows chains that aren't 
                            connected in any way to bi-directionally communicate and transfer value. ODApp uses smart contracts,
                            a bridge server, and <a href="https://chain.link/" style={{color:"#f0b90c"}}>chainlink</a> to transfer value from one chain to another.  
                        </Text>
                    </CardBody>
                </Card> 
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is PKT?</h5>
                        <Text align="left" color="white">
                           PKT is the currency of the decentralized bandwidth marketplace. The PKT project strives to bring a free and decentralized internet to the world, 
                           and is powered by blockchain. The currency is scarce and mined using a bandwidth hard Proof of Work (PoW). Since it is mined,
                           it is a digitally hard asset and therefore cannot be created out of thin air. 
                           For more details on the project check <a href="https://pkt.cash/" style={{color:"#f0b90c"}}>here</a>. 
                        </Text>
                    </CardBody>
                </Card> 
                </Box>
                
                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is WPKT?</h5>
                        <Text align="left" color="white">
                            WPKT is PKT on the Binance smart chain blockchain. It is a wrapped version of PKT, hence the "W" in WPKT. 
                            WPKT can only come into existence when PKT is sent to the vault address, thus WPKT can't be inflated, 
                            and has a 1-to-1 peg to PKT. As there can only be 6 billion PKT in existence, there can never be more
                            than 6 billion WPKT. WPKT is an ERC20 token and is compatible with all ERC20 platforms. 
                        </Text>
                    </CardBody>
                </Card> 
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is the Vault?</h5>
                        <Text align="left" color="white">
                            The vault is a PKT address which stores the PKT that WPKT tokens are issued against. 
                            When PKT coins are sent to the vault, the equivalent amount of WPKT can be claimed with the PKT transaction hash. The 
                            transaction hash is an identifier you receive after a transaction. So if you send PKT to the vault address,
                            your wallet will return a PKT transaction hash as proof of your transaction. This transaction proof, or 
                            transaction hash, allows the equivalent amount of WPKT, less fees, to be claimed. 
                        </Text>
                    </CardBody>
                </Card>
                </Box>  

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is Metamask?</h5>
                        <Text align="left" color="white">
                            Metamask is a popular wallet that is compatible with multiple chains, including Ethereum, Binance Smart Chain,
                            Polygon and others. ODApp transacts through Metamask so you must install it to use this bridge. 
                            For more details on installing Metamask check <a href="https://metamask.io/" style={{color:"#f0b90c"}}>here</a>. 
                        </Text>
                    </CardBody>
                </Card>
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is a Smart Contract?</h5>
                        <Text align="left" color="white">
                            A smart contract is program that runs on top of a blockchain. As such, smart contracts can be used to issue tokens. 
                            ODapp uses smart contracts to issue WPKT on-chain. 
                        </Text>
                    </CardBody>
                </Card>
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>What is a Transaction Hash?</h5>
                        <Text align="left" color="white">
                            A transaction hash is a unique identifier for your transaction. It is proof that your transaction has been performed, 
                            and it is verifiable on a blockchain. ODApp uses PKT transaction hashes to verify that coins were sent to the vault address, 
                            and Binance smart chain transaction hashes to prove that tokens were sent to the WPKT smart contract. Transaction hashes are a cryptographically sound way to prove that value 
                            has been transferred, and thus it is utilized for cross-chain interactions. ODApp uses a proof of transaction (PoTx) system
                            to value transfer between chains.
                        </Text>
                    </CardBody>
                </Card>
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>I Didn't Save My Transaction Hash?</h5>
                        <Text align="left" color="white">
                            If you lost your transaction hash, or didn't save it, you can recover it on-chain. Your etherume transactions,
                            are saved in your metamask wallet, but you can also find them on <a href="https://bscan.io" style={{color:"#f0b90c"}}>bscan</a>. Just 
                            search for your Binance smart chain address and find the last transaction you performed off the address with the WPKT contract. Similarly, 
                            you can search for your PKT transaction hashes on the <a href="https://explorer.pkt.cash" style={{color:"#f0b90c"}}>PKT explorer</a>. 
                            To find your transaction hash, lookup the last transaction your PKT address executed against the address:<a href="https://explorer.pkt.cash/address/pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz" style={{color:"#f0b90c"}}>pkt1qex9d4fjwc0nqr3x0hex6ds5vpu67efjdlm6ckz.</a>
                            Once you have your transaction hashes, you can complete bridging in any case.
                        </Text>
                    </CardBody>
                </Card>
                </Box>

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>Why Does Bridging Take So Long?</h5>
                        <Text align="left" color="white">
                            Cross-chain bridging, as it is commonly known, is a process which involves settlement over two different chains. Normally, blockchain settlement over a single chain is limited to the speed of the chain.
                            Every chain's speed is limited to its transactions per second (TPS) which is dependent on its block time. On average, Binance smart chain's block time is around 5 seconds while PKT cash's block time is 1 minute. In practice, 
                            we wait for several blocks of confirmation for a transaction to be approved, so we are waiting multiples of block time to settle. Bridging isn't exchanging or swapping, it is an entirely different process, and thus
                            speed expectations should be adjusted to meet the realities of bridging.  
                        </Text>
                    </CardBody>
                </Card>
                </Box>


                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>Why Must I Pre-Commit When Bridging WPKT?</h5>
                        <Text align="left" color="white">
                            When bridging from PKT to WPKT it is important to pre-commit the PKT sender address as well as the WPKT recipient address (which is an Binance smart chain address). Sending funds to the vault address without
                            performing this step first can result in your transaction being front-run by a malicious attacker. Specifically, an attacker may get your transaction id and submit it as their own. This can be prevented
                            by pre-committing your sender / recipient pair before sending money to the vault. You must be sure to send money to the vault from the sender address you have declared. And your WPKT can only be received 
                            by the recipient address committed. It is important to note that all sender / recipient address pairs are unique. You cannot reuse the sender address with a different recipient or vice versa. You can reuse
                            the same sender / recipient pair ad infinitum, but you can't mix and match to make new pairs using either declared address. If you wish to declare a new recipient address you must also add a new sender address. 
                            If you want to add a new sender you must also add a new recipient. Though it is somewhat limiting, the protection it offers far outweighs any inconvenience.
                        </Text>
                    </CardBody>
                </Card>
                </Box>


                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>Why Didn't I Receive PKT?</h5>
                        <Text align="left" color="white">
                            If you were attempting to transfer from WPKT to PKT and didn't receive your PKT, you can use this <a href="/GetPKT" style={{color:"#f0b90c"}}>link</a> or click
                            "Claim PKT" below, to get your allocation. You will need your transaction hash to complete this transaction. The transaction
                            hash was provided to you on the "Wpkt-2-Pkt" screen. You can also find it inside of your metamask wallet in the
                            transaction history. You can use this <a href="https://community.metamask.io/t/where-are-my-tokens/41" style={{color:"#f0b90c"}}>guide</a> to find token transactions in metamask.  
                        </Text>
                    </CardBody>
                </Card>
                </Box>  

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>Why Didn't I Receive WPKT?</h5>
                        <Text align="left" color="white">
                            If you didn't receive WPKT your transaction failed. This can happen for many reasons, but the solution in any case is inevitably the same. 
                            You simply need to perform the transaction again using your PKT transaction hash as proof of transaction (PoTx). 
                        </Text>
                    </CardBody>
                </Card>
                </Box> 

                <Box pad="small">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>  
                    <h5 style={{color: '#F0B90C', paddingBottom: '0%'}}>Why Didn't I Receive the Balance I Expected?</h5>
                        <Text align="left" color="white">
                            The ODApp bridge network charges a flexible between a 1% and 3.5% fee for all transactions. Fees vary dynamically on the basis of spreads, ie. price difference between centralized exchanges vs. decentralized exchanges. Therefore, your received amount 
                            WPKT or PKT is reduced by this fee expense. We use fees to subsidise transaction costs,
                            operate infrastructure and expand this service.  
                        </Text>
                    </CardBody>
                </Card> 
                </Box>

            </CardBody>
        </Card>
    </Box></BodyCenteredAlt2>
    
  );
}

export default FAQ;
