import React from "react";
import { Form, Box, Card, Text, CardBody, Grid, Heading, TextInput, Spinner, FormField, ResponsiveContext, Grommet } from "grommet";
import { HeadingDark, StyledTextDark, ButtonForm, customBreakpoints } from ".";
import { useHistory } from "react-router-dom";

//var noFeeAdjAmtNoWei;
var formWrapStyle = {
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)",
  width: "85%"
}
var formWrapStyleMed = {
  width: "80%"
};
var formWrapStyleMob = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};

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
    <Grommet theme={customBreakpoints}>
      <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
          <Box background="#fff">
          <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                   <CardBody> 
                     <Box background="#fff" justify="center" alignSelf="center">
                         <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Reclaim PKT</HeadingDark>
                         <StyledTextDark textAlign="center">If you sent your WPKT to the ODApp bridge, but failed to receive your PKT within 2 hours, use this process to reclaim your PKT. Enter the transaction hash you received when you sent your WPKT to the ODApp bridge, as well as your PKT recipient address.</StyledTextDark>
                     </Box>
                     <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                         <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                         <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                         <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Your WPKT Transaction and PKT Recipient Hash</Heading>
                         <Box justify="center" alignSelf="center">
                             <FormField name="EthTxHash" required contentProps={{ border: false, margin: "0" }}>
                                 <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthTxHash" placeholder={<Text weight="normal" size="18px" color="#707070">WPKT Transaction Hash</Text>} />
                             </FormField>
                             <FormField name="PKTAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                 <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PKTAddr" placeholder={<Text weight="normal" size="18px" color="#707070">PKT Recipient Hash</Text>} />
                             </FormField>
                             <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} type="submit" label="Submit"/>
                         </Box>
                         </Form>
                         <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                           <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                               <div hidden align="center" id="output2" style={{padding:'2%'}}>
                               </div>  
                               <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                               <div hidden align="center" id="recPKT" style={{padding:'2%', wordBreak: "break-all"}}>
                                   <ButtonForm size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
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
            <Card width="full" round="none" background="#fff" pad="75px 50px 100px">
                    <CardBody> 
                      <Box background="#fff" justify="center" alignSelf="center">
                          <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Reclaim PKT</HeadingDark>
                          <StyledTextDark textAlign="center">If you sent your WPKT to the ODApp bridge, but failed to receive your PKT within 2 hours, use this process to reclaim your PKT. Enter the transaction hash you received when you sent your WPKT to the ODApp bridge, as well as your PKT recipient address.</StyledTextDark>
                      </Box>
                      <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                          <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                          <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                          <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Your WPKT Transaction and PKT Recipient Hash</Heading>
                          <Box justify="center" alignSelf="center">
                              <FormField name="EthTxHash" required contentProps={{ border: false, margin: "0" }}>
                                  <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthTxHash" placeholder={<Text weight="normal" size="18px" color="#707070">WPKT Transaction Hash</Text>} />
                              </FormField>
                              <FormField name="PKTAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                  <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PKTAddr" placeholder={<Text weight="normal" size="18px" color="#707070">PKT Recipient Hash</Text>} />
                              </FormField>
                              <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} type="submit" label="Submit"/>
                          </Box>
                          </Form>
                          <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                            <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                <div hidden align="center" id="output2" style={{padding:'2%'}}>
                                </div>  
                                <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                                <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                                    <ButtonForm size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
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
             <Card width="full" round="none" background="#fff" pad="100px 30px">
                      <CardBody> 
                        <Grid
                        fill
                        areas={[
                          { name: 'left', start: [0, 0], end: [0, 0] },
                          { name: 'right', start: [1, 0], end: [1, 0] },
                        ]}
                        columns={['1/2', 'flex']}
                        alignContent="center"
                        justifyContent="between"
                        rows={['flex']}
                        gap="none"
                        background="#fff"
                        >
                        <Box gridArea="left" background="#fff" justify="center" alignSelf="center">
                            <HeadingDark textAlign="left" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Reclaim PKT</HeadingDark>
                            <StyledTextDark textAlign="left" style={{ paddingRight: "6vw" }}>If you sent your WPKT to the ODApp bridge, but failed to receive your PKT within 2 hours, use this process to reclaim your PKT. Enter the transaction hash you received when you sent your WPKT to the ODApp bridge, as well as your PKT recipient address.</StyledTextDark>
                        </Box>
                        <Box gridArea="right" background="#fff" justify="center" alignSelf="center" pad="0">
                            <Box background="#f9f9f9" pad={{ vertical: "25px", horizontal: "25px" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>
                            <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Your WPKT Transaction and PKT Recipient Hash</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="EthTxHash" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px", wordBreak: "break-all" }} name="EthTxHash" placeholder={<Text weight="normal" size="18px" color="#707070">WPKT Transaction Hash</Text>} />
                                </FormField>
                                <FormField name="PKTAddr" required contentProps={{ border: false, margin: "15px 0 0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px", wordBreak: "break-all" }} name="PKTAddr" placeholder={<Text weight="normal" size="18px" color="#707070">PKT Recipient Hash</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                              <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                  <div hidden align="center" id="output2" style={{padding:'2%'}}>
                                  </div>  
                                  <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                                  <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                                      <ButtonForm size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
                                  </div> 
                              </Box>
                            </div> 
                            </Box>
                        </Box>                    
                        </Grid>
                      </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'medium') ? (
          <Box background="#fff">
             <Card width="full" round="none" background="#fff" pad="150px 50px">
                      <CardBody> 
                        <Grid
                        fill
                        areas={[
                          { name: 'left', start: [0, 0], end: [0, 0] },
                          { name: 'right', start: [1, 0], end: [1, 0] },
                        ]}
                        columns={['1/2', 'flex']}
                        alignContent="center"
                        justifyContent="between"
                        rows={['flex']}
                        gap="none"
                        background="#fff"
                        >
                        <Box gridArea="left" background="#fff" justify="center" alignSelf="center">
                            <HeadingDark textAlign="left" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Reclaim PKT</HeadingDark>
                            <StyledTextDark textAlign="left" style={{ paddingRight: "6vw" }}>If you sent your WPKT to the ODApp bridge, but failed to receive your PKT within 2 hours, use this process to reclaim your PKT. Enter the transaction hash you received when you sent your WPKT to the ODApp bridge, as well as your PKT recipient address.</StyledTextDark>
                        </Box>
                        <Box gridArea="right" background="#fff" justify="center" alignSelf="center" pad="0">
                            <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>
                            <Form name="ReceivePKT" id="ReceivePKT" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Your WPKT Transaction and PKT Recipient Hash</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="EthTxHash" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="EthTxHash" placeholder={<Text weight="normal" size="20px" color="#707070">WPKT Transaction Hash</Text>} />
                                </FormField>
                                <FormField name="PKTAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="PKTAddr" placeholder={<Text weight="normal" size="20px" color="#707070">PKT Recipient Hash</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                              <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                  <div hidden align="center" id="output2" style={{padding:'2%'}}>
                                  </div>  
                                  <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                                  <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                                      <ButtonForm size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
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
                        <Grid
                        fill
                        areas={[
                          { name: 'left', start: [0, 0], end: [0, 0] },
                          { name: 'right', start: [1, 0], end: [1, 0] },
                        ]}
                        columns={['1/2', 'flex']}
                        alignContent="center"
                        justifyContent="between"
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
                                <FormField name="EthTxHash" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="EthTxHash" placeholder={<Text weight="normal" size="24px" color="#707070">WPKT Transaction Hash</Text>} />
                                </FormField>
                                <FormField name="PKTAddr" required contentProps={{ border: false, margin: "20px 0 0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="PKTAddr" placeholder={<Text weight="normal" size="24px" color="#707070">PKT Recipient Hash</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "50px", horizontal: "auto"}} type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="outputCard2" style={{paddingTop: '2%'}}>
                              <Box id="outputCard2" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white', padding:'0%'}}>
                                  <div hidden align="center" id="output2" style={{padding:'2%'}}>
                                  </div>  
                                  <div id="spin" pad="medium" style={{padding:'2%'}}><Spinner size="medium" /></div>
                                  <div hidden align="center" id="recPKT" style={{padding:'2%'}}>
                                      <ButtonForm size='large' color='#F0B90C' label='Receive PKT' id='recPKT' onClick={navigateTo()}/> 
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

export default GetPKT;
