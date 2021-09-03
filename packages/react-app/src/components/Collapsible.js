import React from 'react';

import { Box, Grommet, Header, Nav, Menu, ResponsiveContext, Text} from 'grommet';
import { grommet } from 'grommet/themes';
import { StyledButton2, Image2 } from ".";
import logo from "../img/odapp-logo-footer.b00a6f36b.png";
import "./random.css";

import { Menu as Menu2 } from 'grommet-icons';

function  Collapsible({btn}){
  

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Get WPKT', href: 'PreCommit' },
    { label: 'Get PKT', href: 'WPKTToPKT' },
    { label: 'FAQs', href: 'FAQ' },
  ];
 


  return (
    
    <Grommet theme={grommet}> 
      <Header pad="small" height="xsmall" style={{background: 'linear-gradient(110deg, #666699 50%, #282c34 10%)'}}>
          <Box align="center" gap="small" >
              <Box gridArea='logo' direction="row" size="xxsmall"><Image2 src={logo} alt="react-logo"/>
              <Box gridArea='nameTxt' direction="row" align="center" pad="small"><Text color="#ffffff">ODApp</Text></Box></Box>
             
          </Box>
          <Box direction="row">{btn}</Box>

          <Box align="end" gap="small">  
              <ResponsiveContext.Consumer>
                      {responsive =>
                        (responsive === 'small') ? (
                          <Menu
                            icon={<Menu2/>}
                            dropProps={{round: 'none', fontWeight: 'bold', background: '#7d4cdb', width: 'small'}}
                            dropAlign={{right: 'right', top: 'top'}} 
                            size='medium'
                            margin='xsmall'
                            items={items}
                          />
                        ) : (
                          <Nav direction="row">
                            {[items.map(item => (
                              <StyledButton2 style={{color: '#ffffff', valign: 'bottom', fontWeight:"bold", textDecoration:"none"}} href={item.href} label={item.label} key={item.label} />
                            ))]}
                          </Nav>
                        )
                      }
              </ResponsiveContext.Consumer>
          </Box>  
          
      </Header>
    </Grommet>
  );
}

export default Collapsible;