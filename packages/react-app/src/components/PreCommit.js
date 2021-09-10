import React, { useContext } from "react";
import { Form, Box, Card, Text, CardBody, TextInput, Spinner, FormField, CardHeader } from "grommet";
import { BodyCenteredAlt, StyledButton } from ".";
import { useHistory } from "react-router-dom";

var pktAddr = "";
var wpktAddr = "";
var dv, dv1, dv2, dv3;



async function handleInput(e){
    dv = document.getElementById("output1");
    dv1 = document.getElementById("spin");
    dv2 = document.getElementById("div1");
    dv3 = document.getElementById("recWPKT");

    dv.style.display= 'none';
    dv1.style.display= 'none';
    dv2.style.display= 'none';
    dv3.style.display= 'none';
    
    e.preventDefault();
    wpktAddr= e.value.WPKTAddr.trim();
    pktAddr= e.value.PKTAddr.trim();
    console.log("PKT Sender:", pktAddr, "WPKT Recipient:", wpktAddr);

     // Check that bridge has pkt.
    var chkCmd = "https://obeah.odapp.io/api/v1/commitAddresses/pktSenderAddress/"+pktAddr+"/ethRecipientAddress/"+wpktAddr+"/";
    //var chkCmd = "https://obeahdev.odapp.io/api/v1/commitAddresses/pktSenderAddress/"+pktAddr+"/ethRecipientAddress/"+wpktAddr+"/";
    //var chkCmd = "http://localhost:5000/api/v1/commitAddresses/pktSenderAddress/"+pktAddr+"/ethRecipientAddress/"+wpktAddr+"/";
    dv.style.display= 'block';
    dv1.style.display= 'block';
    dv2.style.display= 'block';
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Pair Commitment</h4>";  

    fetch(chkCmd)
        .then((response) => response.json())
        .then(async (result) => {
            console.log('Result:', result);   
            
            if (result.output === 'address_pair_exists' || result.output === 'duplicate_pairs'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Successfully Committed</h4>";  
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>A previously committed pair has been successfully recommitted.</h6>";          
                dv3.style.display= 'block';
                dv1.style.display= 'none';
            }
            else if (result.output ==='duplicate_key_error'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Failed to Commit</h4>";  
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You cannot pair a previously committed address with new one. Either recommit a pair previously committed, or commit a totally unique pair (not containing any previously comitted addresses). If you are confused about pre-comitting check out the <a href='/FAQ' style='color:#f0b90c'>FAQs</a> for a detailed explanation.</h6>";  
                dv1.style.display= 'none';
            }
            else if (result.output ==='error_occurred'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Unknown Error Occurred</h4>";  
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please wait and try this commit again.</h6>";  
                dv1.style.display= 'none';
            }
            else{
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Successfully Committed</h4>";  
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Committed pair is unique. This pair can be recommitted at any time in the future.</h6>";  
                dv3.style.display= 'block';
                dv1.style.display= 'none';
            }

        }).catch(function() {
            console.log('No data returned');
        });
}

function PreCommit() {
  const history = useHistory();
  const navigateTo = () => {
    console.log('Moving on to swapping...', history);
    history.push('/PKTToWPKT');
  }
  return (
    <Box> 
    <BodyCenteredAlt>
    <Box pad="small">
        <Card width="large" background="light-1" pad="none" >     
                    <CardHeader background="#F0B90C" pad="none" justify="center" height="xsmall">
                            <h2 align="center">Pre-Commit Addresses</h2>
                    </CardHeader>   
                    <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
                    <Text size="medium" textAlign="left" margin="small" style={{paddingLeft: '0%', paddingRight: '0%'}}>To convert your PKT to WPKT you will first need to pre-commit your PKT sender address and your intended WPKT recipient address. This 
                pair of addresses is unique. Once commited, you can either re-use this pair as many times as you like, or create a totally unique pair.
                </Text>
                <Card width="large" background='#2B2F36' >  
                
                <CardBody pad="large" justify="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
               

                    <div align="center">

                        <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Box width="90%">
                                <FormField name="PKTAddr" required>
                                    <TextInput style={{background: 'white', color: '#2B2F36'}} name="PKTAddr" placeholder={<Text size="xsmall" style={{ color: '#2B2F36'}}>PKT Sender Address</Text>} />
                                </FormField>
                                <FormField name="WPKTAddr" required>
                                    <TextInput style={{background: 'white', color: '#2B2F36'}} name="WPKTAddr" placeholder={<Text size="xsmall" style={{ color: '#2B2F36'}}>WPKT Recipient Address (BSC)</Text>} />
                                </FormField>
                                <StyledButton primary size='large' color='#F0B90C' type="submit" label="Submit"/>
                            </Box>
                        </Form>   
                    </div>  
                    </CardBody>
                </Card>
                <div hidden id="div1" style={{paddingTop: '2%'}}>
                    
                    <Box id="box1" width="large" pad="small" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                        <div hidden align="center" id="output1" style={{padding:'2%'}}></div>  
                        <div hidden align="center" id="recWPKT" style={{padding:'2%'}}>
                            <StyledButton size='large' color='#F0B90C' label='Get WPKT' onClick={navigateTo}/>
                        </div> 
                        <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                    </Box>
            </div>
            </CardBody>
        </Card>

    </Box>
  
    </BodyCenteredAlt>
    </Box>
    
  );
}

export default PreCommit;

