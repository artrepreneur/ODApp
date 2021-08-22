import React from "react";
import { Form, Box, Card, Text, CardBody, Grid, Heading, TextInput, Spinner, FormField, CardHeader, ResponsiveContext } from "grommet";
import { BodyCenteredAlt, StyledButton, HeadingDark, StyledTextDark } from ".";
import { useHistory } from "react-router-dom";
import Web3 from "web3";


//var noFeeAdjAmtNoWei;
var formWrapStyle = {
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)",
  width: "85%"
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

async function handleInput(e){

  e.preventDefault();
  //var WPKTAmount = e.value.WPKTAmount.trim().toString();
  var PKTAddr = e.value.PKTAddr.trim().toString();
  var ethTxHash = e.value.EthTxHash.trim().toString();

  var dv = document.getElementById("output2");
  var dv1 = document.getElementById("spin");
  var dv2 = document.getElementById("outputCard2");
  var dv3 = document.getElementById("recPKT");

  // Check if number
  /*if(isNaN(WPKTAmount)){
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>You must enter the number of WPKT you are converting.</h4>";
    dv1.style.display= 'none';
    dv.style.display= 'block';
    dv2.style.display= 'block';
  }if{}*/    

  dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Transaction Pending...</h4>";
  dv1.style.display= 'block';
  dv.style.display= 'block';
  dv2.style.display= 'block';

  try {
    var WPKTAmount = 0;
    var noFeeAdjAmtNoWei = 0;
    var feesNoWei = 0;
    var hash = 0;
    var cmd = "https://obeah.odapp.io/api/v1/userPayout/txHash/"+ethTxHash+"/address/"+PKTAddr+"/";
    //var cmd = "http://localhost:5000/api/v1/userPayout/txHash/"+ethTxHash+"/address/"+PKTAddr+"/";
    console.log(cmd);
    fetch(cmd)
    .then((response) => response.json())
    .then((result) => {
      console.log('Data:', result.data, result.amt, result.hash);

      if (result.amt !== undefined) {
        WPKTAmount = Number(result.amt); //Web3.utils.fromWei(result.amt);
        noFeeAdjAmtNoWei = Number(WPKTAmount) /.965;
        feesNoWei = noFeeAdjAmtNoWei - WPKTAmount;
        round(feesNoWei, 6);
        hash = result.hash;
      }
      
      if (result.data.toString().includes('Payout Transaction Hash')){ //Currently this fails -- possibly result.hash
        dv3.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Transaction Complete.</h4>";
        dv3.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your transction hash is: "+hash+"</h6>";
        dv3.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>You were sent "+WPKTAmount+" PKT cash.</h6>";
        dv3.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Your fees were "+feesNoWei+" WPKT.</h6>";
        dv3.style.display = 'block';
        dv1.style.display = 'none';
        dv.style.display = 'none';
      }
      else if (result.data.toString().includes('TransactionAlreadyProcessedError')){    
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>This transaction has already been paid out.</h4>";
        if (!result.err2 && result.TID !== undefined) {
          console.log("POT:",result.POT.toString(),"TID", result.TID.toString());
          dv.innerHTML = "<h6 style={{backgroundColor: '#2B2F36'}}>The transaction hash is:"+result.TID.toString()+"</h6>";

        } 
        dv1.style.display = 'none';
        dv.style.display = 'block';
      }
      else if (result.data.toString().includes('WrongPktRecipientAddressError')){ 
        dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Wrong PKT Recipient Address Entered.</h4>";
        dv1.style.display = 'none';
        dv.style.display = 'block';
      }  
      else {
        dv.innerHTML = "<h6 style={{backgroundColor: '#2B2F36'}}>Vault failed to pay out. Check transaction id's, PKT recipient address, and amount and try resubmission.</h6>";            
        dv1.style.display = 'none';
        dv.style.display = 'block';
      }
    }).catch(function() {
      console.log('Server Down.');
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Server isn't communicating.</h4>";
      dv1.style.display = 'none';
      dv.style.display = 'block';
    });
    
  } //try
  catch (err) {
      console.log('Transaction Failure.', err);
      dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Your transaction failed</h4>";
      dv1.style.display= 'none';
      //dv2.style.display= 'block';
      dv.style.display= 'block';
  }

}

function GetPKT() {
  const history = useHistory();
  const navigateTo = () => {
    console.log('OK to receive PKT.', history);
    history.push('/GetPKT')
  }

  return (
    <Box background="#fff">
        <Card width="full" round="none" background="#fff" pad="0 8rem" size="large">
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
                <Box gridArea="left" background="#fff" height={{ min: "85vh" }} justify="center" alignSelf="center">
                    <HeadingDark textAlign="left" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Reclaim PKT</HeadingDark>
                    <StyledTextDark textAlign="left" style={{ paddingRight: "6vw" }}>If you sent your WPKT to the ODApp bridge, but failed to receive your PKT within 2 hours, use this process to reclaim your PKT. Enter the transaction hash you received when you sent your WPKT to the ODApp bridge, as well as your PKT recipient address.</StyledTextDark>
                </Box>
                <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0">
                    <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "xlarge" }} round="25px" justify="center" alignSelf="center" style={formWrapStyle}>
                    <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                    <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="24px" margin={{ bottom: "50px", top: "0" }}  textAlign="center">Enter Your WPKT Transaction and PKT Recipient Hash</Heading>
                    <Box justify="center" alignSelf="center">
                        <FormField name="EthTxHash" required contentProps={{ border: false }}>
                            <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px" }} name="EthTxHash" placeholder={<Text weight="normal" size="24px" color="#707070">WPKT Transaction Hash</Text>} />
                        </FormField>
                        <FormField name="PKTAddr" required contentProps={{ border: false }}>
                            <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", padding: "12px 20px" }} name="PKTAddr" placeholder={<Text weight="normal" size="24px" color="#707070">PKT Recipient Hash</Text>} />
                        </FormField>
                        <StyledButton hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" type="submit" label="Submit"/>
                    </Box>
                    </Form>
                    <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                      <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                          <div hidden align="center" id="output2" style={{padding:'2%'}}>
                          </div>  
                          <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                          <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                              <StyledButton size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
                          </div> 
                      </Box>
                    </div> 
                    </Box>
                </Box>                    
                </Grid>
              </CardBody>
        </Card>
    </Box>
    
  );
}

export default GetPKT;
