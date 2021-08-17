import React from 'react';

import { Box, Grommet, Header, Nav, Menu, ResponsiveContext, Button, Text} from 'grommet';
//import { grommet } from 'grommet/themes';
import { StyledButton2, Image2, ButtonCTA } from ".";
import logo from "../img/odapp-logo-new.png";
import "./random.css";
import { themefontNav } from ".";
import { Menu as Menu2 } from 'grommet-icons';
import { FormSearch } from 'grommet-icons';


function  Collapsible({btn}){
  

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Get WPKT', href: 'PreCommit' },
    { label: 'Get PKT', href: 'WPKTToPKT' },
    { label: 'FAQs', href: 'FAQ' },
  ];
 


  return (
    
    <Grommet theme={themefontNav}> 
      <Header pad="2rem 8rem 2rem 8rem" style={{background: '#222223'}}>
          <Box align="center" gap="small" >
              <Box gridArea='logo' direction="row" size="xxsmall"><Image2 src={logo} alt="react-logo"/></Box>
          </Box>
          <Box align="center" gap="small">  
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
                              <StyledButton2 style={{color: '#ffffff', valign: 'middle', fontWeight:"600", textDecoration:"none"}} href={item.href} label={item.label} key={item.label} />
                            ))]}
                          </Nav>
                        )
                      }
              </ResponsiveContext.Consumer>
          </Box>  
            <Box direction="row" size="xxsmall" align="center">
            <ButtonCTA label="Connect Wallet" color="#FFFFFF" hoverIndicator={{ color: "#FBA300", background: "#fff", border: "0" }} /><FormSearch color='#fff' size='large' />
          </Box>
      </Header>
    </Grommet>
  );
}

export default Collapsible;