import React from "react";
import {Grid,  Form, Box, Card, Text, CardBody, TextInput, Spinner, FormField, Heading, ResponsiveContext, Grommet } from "grommet";
import { HeadingDark, ButtonForm, StyledTextDark, customBreakpoints } from ".";
import { useHistory } from "react-router-dom";

var pairCode = "";
var dv, dv1, dv2, dv3;

var formWrapStyle = {
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)",
    width: "85%"
};

var formWrapStyleMed = {
    width: "80%"
};

var formWrapStyleMob = {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    minWidth: "50vw",
    width: "auto"
};

async function handleInput(e){
    dv = document.getElementById("output1");
    dv1 = document.getElementById("spin");
    dv2 = document.getElementById("div1");
    dv3 = document.getElementById("recWPKT");

    // Reset
    dv.style.display= 'none';
    dv1.style.display= 'none';
    dv2.style.display= 'none';
    dv3.style.display= 'none';

    e.preventDefault();
    pairCode = e.value.pairCode.trim();
    console.log("Pair Code:", pairCode);

    // Check that bridge has pkt.
    //var chkCmd = "https://obeah.odapp.io/api/v1/recommitAddresses/hashCode/"+pairCode+"/";
    var chkCmd = "https://obeahdev.odapp.io/api/v1/recommitAddresses/hashCode/"+pairCode+"/";
    //var chkCmd = "http://localhost:5000/api/v1/recommitAddresses/hashCode/"+pairCode+"/";

    dv.style.display= 'block';
    dv1.style.display= 'block';
    dv2.style.display= 'block';
    dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pending Pair Recommitment</h4>";

    fetch(chkCmd)
        .then((response) => response.json())
        .then(async (result) => {
            console.log('Result:', result);

            if (result.output === 'addressPairRemovedSuccess'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Successfully Invalidated</h4>";
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>This pair code is now invalid. To precommit a new pair again, use the button below.</h6>";
                dv3.style.display= 'block';
                dv1.style.display= 'none';
            }
            else if (result.output ==='pairNotChangedError'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Failed to Recommit</h4>";
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Pair could not be recommitted at this time.</h6>";
                dv1.style.display= 'none';
            }
            else if (result.output ==='pairNotFoundError'){
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Pair Not Found Error</h4>";
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>This is code is not associated with any pair. Check your pair code.</h6>";
                dv1.style.display= 'none';
            }
            else {
                dv.innerHTML = "<h4 style={{backgroundColor: '#2B2F36'}}>Unknown Error Occurred</h4>";
                dv.innerHTML += "<h6 style={{backgroundColor: '#2B2F36'}}>Please wait and try this recommit again.</h6>";
                dv1.style.display= 'none';
            }


        }).catch(function() {
            console.log('No data returned');
        });
}

function ReCommit() {
  const history = useHistory();
  const navigateTo = () => {
    console.log('Moving on to swapping...', history);
    history.push('/PreCommit');
  }

  return (
    <Grommet theme={customBreakpoints}>
    <ResponsiveContext.Consumer>
        {responsive => (responsive === 'smallmob') ? (
            <Box background="#fff" pad="none">
                <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                        <Box background="#fff" justify="center" alignSelf="center">
                            <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} level="2">Recommit</HeadingDark>
                            <StyledTextDark textAlign="center">If you previously committed a PKT sender and WPKT recipient address pair, you may swap the pair out here. To verify you are initiator of the pair, you will need to provide your unique pair code, provided to you when the pair was initialized. If you don’t have the pair code, you cannot recommit the pair.</StyledTextDark>
                        </Box>
                        <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                            <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Pair Code</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="pairCode" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="pairCode" placeholder={<Text weight="normal" size="18px" color="#707070">Pair Code</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="div1" style={{paddingTop: '2%', wordBreak: "break-all"}}>
                            <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                                <div hidden align="center" id="output1" style={{padding:'2%', wordBreak: "break-all"}}></div>
                                <div hidden align="center" id="recWPKT" style={{paddingBottom:'2%', wordBreak: "break-all"}}>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" label='Commit New Pair' onClick={navigateTo}/>
                                </div>
                                <div id="spin" align="center" pad="medium" style={{padding:'2%', wordBreak: "break-all"}}><Spinner size="large" /></div>
                            </Box>
                            </div>
                            </Box>
                        </Box>
                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'small') ? (
            <Box background="#fff" pad="none">
                <Card width="full" round="none" background="#fff" pad="75px 20px 100px">
                    <CardBody>
                        <Box background="#fff" justify="center" alignSelf="center">
                            <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} level="2">Recommit</HeadingDark>
                            <StyledTextDark textAlign="center">If you previously committed a PKT sender and WPKT recipient address pair, you may swap the pair out here. To verify you are initiator of the pair, you will need to provide your unique pair code, provided to you when the pair was initialized. If you don’t have the pair code, you cannot recommit the pair.</StyledTextDark>
                        </Box>
                        <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                            <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "20px" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Pair Code</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="pairCode" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="pairCode" placeholder={<Text weight="normal" size="18px" color="#707070">Pair Code</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="div1" style={{paddingTop: '2%'}}>
                            <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                                <div hidden align="center" id="output1" style={{padding:'2%'}}></div>
                                <div hidden align="center" id="recWPKT" style={{paddingBottom:'2%'}}>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" label='Commit New Pair' onClick={navigateTo}/>
                                </div>
                                <div id="spin" align="center" pad="medium" style={{padding:'2%'}}><Spinner size="large" /></div>
                            </Box>
                            </div>
                            </Box>
                        </Box>
                    </CardBody>
                </Card>
            </Box>
        ) : (responsive === 'tablet') ? (
            <Box background="#fff" pad="none">
                <Card width="full" round="none" background="#fff" pad="75px 50px 100px">
                    <CardBody>
                        <Box background="#fff" justify="center" alignSelf="center">
                            <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} level="2">Recommit</HeadingDark>
                            <StyledTextDark textAlign="center">If you previously committed a PKT sender and WPKT recipient address pair, you may swap the pair out here. To verify you are initiator of the pair, you will need to provide your unique pair code, provided to you when the pair was initialized. If you don’t have the pair code, you cannot recommit the pair.</StyledTextDark>
                        </Box>
                        <Box background="#fff" justify="center" alignSelf="center" pad="50px 0 0">
                            <Box background="#f9f9f9" pad={{ top: "40px", bottom: "50px", horizontal: "large" }} round="23px" justify="center" alignSelf="center" style={formWrapStyleMob}>
                            <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="18px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Pair Code</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="pairCode" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "18px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="pairCode" placeholder={<Text weight="normal" size="18px" color="#707070">Pair Code</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="div1" style={{paddingTop: '2%', wordBreak: "break-all"}}>
                            <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                                <div hidden align="center" id="output1" style={{padding:'2%', wordBreak: "break-all"}}></div>
                                <div hidden align="center" id="recWPKT" style={{paddingBottom:'2%', wordBreak: "break-all"}}>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" label='Commit New Pair' onClick={navigateTo}/>
                                </div>
                                <div id="spin" align="center" pad="medium" style={{padding:'2%', wordBreak: "break-all"}}><Spinner size="large" /></div>
                            </Box>
                            </div>
                            </Box>
                        </Box>
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
                        <Box gridArea="left" background="#fff" justify="center" alignSelf="start">
                            <HeadingDark textAlign="start" margin={{ bottom: "35px", top: "0" }} weight="bold" color="#222323" level="2">Recommit</HeadingDark>
                            <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>If you previously committed a PKT sender and WPKT recipient address pair, you may swap the pair out here. To verify you are initiator of the pair, you will need to provide your unique pair code, provided to you when the pair was initialized. If you don’t have the pair code, you cannot recommit the pair.</StyledTextDark>
                        </Box>
                        <Box gridArea="right" background="#fff" justify="center" alignSelf="center" pad="0">
                            <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "large" }} round="25px" justify="center" alignSelf="center" style={formWrapStyleMed}>
                            <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="20px" margin={{ bottom: "35px", top: "0" }}  textAlign="center">Enter Pair Code</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="pairCode" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "20px", fontWeight: "normal", borderRadius: "6px", height: "50px" }} name="pairCode" placeholder={<Text weight="normal" size="20px" color="#707070">Pair Code</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "35px", horizontal: "auto"}} size='large' color="#fff" type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="div1" style={{paddingTop: '2%'}}>
                            <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                                <div hidden align="center" id="output1" style={{padding:'2%'}}></div>
                                <div hidden align="center" id="recWPKT" style={{paddingBottom:'2%'}}>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" label='Commit New Pair' onClick={navigateTo}/>
                                </div>
                                <div id="spin" align="center" pad="medium" style={{padding:'2%'}}><Spinner size="large" /></div>
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
                        <Box gridArea="left" background="#fff" height={{ min: "85vh" }} justify="center" alignSelf="start">
                            <HeadingDark textAlign="start" margin={{ bottom: "50px", top: "0" }} size="4xl" weight="bold" color="#222323" level="2">Recommit</HeadingDark>
                            <StyledTextDark textAlign="start" style={{ paddingRight: "6vw" }}>If you previously committed a PKT sender and WPKT recipient address pair, you may swap the pair out here. To verify you are initiator of the pair, you will need to provide your unique pair code, provided to you when the pair was initialized. If you don’t have the pair code, you cannot recommit the pair.</StyledTextDark>
                        </Box>
                        <Box gridArea="right" background="#fff" height="large" justify="center" alignSelf="center" pad="0">
                            <Box background="#f9f9f9" pad={{ vertical: "large", horizontal: "xlarge" }} round="25px" justify="center" alignSelf="center" style={formWrapStyle}>
                            <Form name="Commitment" id="Commitment" onSubmit={handleInput}>
                            <Heading style={{ fontWeight: "normal"}} color="#222323" level="3" size="24px" margin={{ bottom: "50px", top: "0" }}  textAlign="center">Enter Pair Code</Heading>
                            <Box justify="center" alignSelf="center">
                                <FormField name="pairCode" required contentProps={{ border: false, margin: "0" }}>
                                    <TextInput style={{background: 'white', color: '#222323', fontSize: "24px", fontWeight: "normal", borderRadius: "6px", height: "60px" }} name="pairCode" placeholder={<Text weight="normal" size="24px" color="#707070">Pair Code</Text>} />
                                </FormField>
                                <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} margin={{top: "50px"}} size='large' color="#fff" type="submit" label="Submit"/>
                            </Box>
                            </Form>
                            <div hidden id="div1" style={{paddingTop: '2%'}}>
                            <Box id="box1" width="100%" responsive round="small" style={{backgroundColor:'#2B2F36', color:'white',  padding:'0%'}}>
                                <div hidden align="center" id="output1" style={{padding:'2%'}}></div>
                                <div hidden align="center" id="recWPKT" style={{paddingBottom:'2%'}}>
                                    <ButtonForm hoverIndicator={{background: "#222323", boxShadow: "0"}} size='large' color="#fff" label='Commit New Pair' onClick={navigateTo}/>
                                </div>
                                <div id="spin" align="center" pad="medium" style={{padding:'2%'}}><Spinner size="large" /></div>
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

export default ReCommit;
