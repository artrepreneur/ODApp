import React from "react";
import { Form, Box, Card, Text, CardBody, TextInput, Spinner, FormField, CardHeader, ResponsiveContext } from "grommet";
import { BodyCenteredAlt, StyledButton } from ".";
import { useHistory } from "react-router-dom";
import Web3 from "web3";


//var noFeeAdjAmtNoWei;

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
    var cmd = "https://obeahdev.odapp.io/api/v1/userPayout/txHash/"+ethTxHash+"/address/"+PKTAddr+"/";
    //var cmd = "https://obeah.odapp.io/api/v1/userPayout/txHash/"+ethTxHash+"/address/"+PKTAddr+"/";
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
    <Box>    
      <BodyCenteredAlt>
        <Card width="xlarge" background="light-1" pad="none" >     
            <CardHeader background="#F0B90C" pad="none" responsive="true" justify="center" height="30%">
                  <h2 align="center">Claim PKT</h2>
            </CardHeader>   
            <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 

            <Text align="center">Use this screen if you used ODApp to send your WPKT to the bridge contract, but failed to receive PKT.  
              To claim your PKT you will need the transaction hash you received when you sent your WPKT to the bridge and the PKT recipient address. 
            </Text>
            <div style={{padding: '5%'}} align="center">
              <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                <CardHeader justify="center"><h4 style={{color: '#F0B90C'}}>Enter WPKT (BSC) Transaction Hash and PKT Recipient Address:</h4></CardHeader>
                <CardBody>  
                  <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                    <Box width="80%">
                        <FormField name="EthTxHash" required>
                            <TextInput style={{background: 'white', color: '#2B2F36'}} name="EthTxHash" placeholder={<Text size="small">Enter Your WPKT (BSC) Transaction Hash</Text>} />
                        </FormField>
                        {/*<FormField name="WPKTAmount" required validate={(fieldData) => {
                          if (!isNaN(fieldData)) {
                            console.log("It's a number");
                          }
                          else {
                            console.log("You must enter the amount of PKT you are claiming.");
                            return 'You must enter the amount of PKT you are claiming.';
                          } 
                          }}>
                            <TextInput style={{background: 'white', color: '#2B2F36'}} name="WPKTAmount" placeholder={<Text size="small">Enter Amount of WPKT Converted</Text>} />
                        </FormField>*/}
                        <FormField name="PKTAddr" required>
                            <TextInput style={{background: 'white', color: '#2B2F36'}} name="PKTAddr" placeholder={<Text size="small">Enter Your PKT Recipient Address</Text>} />
                        </FormField>
                        <StyledButton primary size='large' color='#F0B90C' type="submit" label="Submit" />
                    </Box>
                  </Form>
                </CardBody>
              </Card> 
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
            </div>     
            </CardBody>
        </Card>
    </BodyCenteredAlt>
    </Box>
    
  );
}

export default GetPKT;
