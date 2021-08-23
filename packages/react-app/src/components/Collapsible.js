import React from 'react';
import { Box, Grommet, Header, Nav, Menu, ResponsiveContext, Button, Text} from 'grommet';
//import { grommet } from 'grommet/themes';
import { StyledButton2, Image2, ButtonCTA, ImageLogoMobile } from ".";
import logo from "../img/odapp-logo-new.png";
import "./random.css";
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
    
    <Grommet>
      <ResponsiveContext.Consumer>
      {responsive => (responsive === 'small') ? (
      <Header pad="18px 25px" style={{background: '#222223'}}>
        <Box align="center" gap="small" >
            <Box gridArea='logo' direction="row" size="xxsmall"><ImageLogoMobile src={logo} alt="react-logo"/></Box>
        </Box>
        <Box align="center" gap="small">  
          <Menu icon={<Menu2/>} color="#fff" dropProps={{round: 'none'}} dropAlign={{right: 'right', top: 'top'}} dropBackground={{ color: "#fff", opacity: "none" }} size='large' margin='xsmall' items={items} />
        </Box>
      </Header>
      ) : (responsive === 'medium') ? (
        <Header pad="25px" style={{background: '#222223'}}>
          <Box align="center" gap="small" >
              <Box gridArea='logo' direction="row" size="xxsmall"><Image2 src={logo} alt="react-logo"/></Box>
          </Box>
          <Box align="center" gap="small">  
            <Nav direction="row">{[items.map(item => (
                <StyledButton2 style={{color: '#ffffff', valign: 'middle', fontWeight:"600", textDecoration:"none", fontFamily: "'Poppins', sans-serif" }} href={item.href} label={item.label} key={item.label} />
              ))]}
            </Nav>   
          </Box>  
          <Box direction="row" size="xxsmall" align="center">
            {btn}<FormSearch color='#fff' size='large' />
          </Box>
        </Header>
      ) : (
      <Header pad="2rem 8rem 2rem 8rem" style={{background: '#222223' }}>
          <Box align="center" gap="small" >
              <Box gridArea='logo' direction="row" size="xxsmall"><Image2 src={logo} alt="react-logo"/></Box>
          </Box>
          <Box align="center" gap="small">  
            <Nav direction="row">{[items.map(item => (
              <StyledButton2 style={{color: '#ffffff', valign: 'middle', fontWeight:"600", textDecoration:"none", fontFamily: "'Poppins', sans-serif" }} href={item.href} label={item.label} key={item.label} plain="true" />
              ))]}
            </Nav>   
          </Box>  
          <Box direction="row" size="xxsmall" align="center">
            {btn}<FormSearch color='#fff' size='large' />
          </Box>
      </Header>
      )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default Collapsible;