import React from "react";
import { ResponsiveContext, Grommet, Box } from "grommet";
import { HeadingDark, StyledTextDark, customBreakpoints } from ".";

function NotFound() {
 
  return (
    <Grommet theme={customBreakpoints}>
      <ResponsiveContext.Consumer>
          {responsive => (responsive === 'smallmob') ? (
            <Box pad={{horizontal:"25px", vertical: "20vh"}}>
              <Box background="#f9f9f9" pad="xlarge" round="23px" justify="center" alignSelf="center" style={{boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)"}}>       
                <HeadingDark textAlign="center" margin={{ bottom: "25px", top: "0" }} level="1">404 Page Not Found</HeadingDark>
                <StyledTextDark textAlign="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Oops, not sure where you were going, but you shouldn't be here.</StyledTextDark>   
              </Box>  
            </Box>
          ) : (responsive === 'small') ? (
            <Box pad="30vh 0">
              <Box background="#f9f9f9" pad="xlarge" round="23px" justify="center" alignSelf="center" style={{boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)"}}>       
                <HeadingDark textAlign="center" margin={{ bottom: "25px", top: "0" }} level="1">404 Page Not Found</HeadingDark>
                <StyledTextDark textAlign="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Oops, not sure where you were going, but you shouldn't be here.</StyledTextDark>   
              </Box>  
            </Box>
          ) : (responsive === 'tablet') ? (
            <Box pad="20vh 0">
              <Box background="#f9f9f9" pad="xlarge" round="23px" justify="center" alignSelf="center" style={{boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)"}}>       
                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} level="1">404 Page Not Found</HeadingDark>
                <StyledTextDark textAlign="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Oops, not sure where you were going, but you shouldn't be here.</StyledTextDark>   
              </Box>  
            </Box>
          ) : (responsive === 'medium') ? (
            <Box pad="25vh 0">
              <Box background="#f9f9f9" pad="xlarge" round="23px" justify="center" alignSelf="center" style={{boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)"}}>       
                <HeadingDark textAlign="center" margin={{ bottom: "35px", top: "0" }} level="1">404 Page Not Found</HeadingDark>
                <StyledTextDark textAlign="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Oops, not sure where you were going, but you shouldn't be here.</StyledTextDark>   
              </Box>  
            </Box>
          ) : (
            <Box pad="30vh 0">
              <Box background="#f9f9f9" pad="xlarge" round="23px" justify="center" alignSelf="center" style={{boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.161)"}}>       
                <HeadingDark textAlign="center" margin={{ bottom: "50px", top: "0" }} level="1">404 Page Not Found</HeadingDark>
                <StyledTextDark textAlign="center" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>Oops, not sure where you were going, but you shouldn't be here.</StyledTextDark>   
              </Box>  
            </Box>
          )}
      </ResponsiveContext.Consumer>
    </Grommet>  
  );
}

export default NotFound;
