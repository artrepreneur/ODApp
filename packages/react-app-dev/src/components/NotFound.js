import React from "react";
import { Card, CardBody } from "grommet";
import { BodyCentered } from ".";
//import { useHistory } from "react-router-dom";

function NotFound() {
 
  return (
    <BodyCentered>
      <Card height="80%" width="large" background="light-1" >       
              <CardBody pad="large" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>  
              <h2 align="center">404 Page Not Found</h2> 
              <p align="center">
                <Card pad="medium" style={{backgroundColor: '#2B2F36'}}>
                    <CardBody>
                    <h4 style={{color: '#F0B90C'}}>Oops, not sure where you were going, but you shouldn't be here. </h4>
                    </CardBody>
                </Card>
              </p>     
              </CardBody>
        </Card>  
    </BodyCentered>
    
      
  );
}

export default NotFound;
