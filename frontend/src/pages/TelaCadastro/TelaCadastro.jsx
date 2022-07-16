import React, { useState } from 'react';
import {Tabs,Tab, Divider, AppBar, Typography, Box, Toolbar, Stack } from '@mui/material'
import CadastroPeixes from '../../components/CadastroPeixes';
import PeixesCadastrados from '../../components/PeixesCadastrados';


import './TelaCadastro.css'
import RegistroPassagens from '../../components/RegistroPassagens';
import StatusAntenas from '../../components/StatusAntenas';
import EditarPeixe from '../../components/EditarPeixe';

export default function TelaCadastro(){

  const [value, setValue] = useState(0)

  const handleTabs=(e,val)=>{
    setValue(val)
  }

  return(
    <div>
      <AppBar color='default' position="relative">
        <Toolbar disableGutters>
          <Stack direction='row' spacing={2} style ={{width: '26%'}}>
            <Box
             margin={2}
              sx={{maxHeight: {xs:30, md: 36 },maxWidth: {xs:30, md: 36 }}}
              component="img"
              src="/images/peixe.png"
            />
            <Typography
              style={{marginTop: 18}}
              variant="h6"
              noWrap
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'GrayText',
                textDecoration: 'none' }}
              >EQUIPE GIL
            </Typography> 
          </Stack>
          <Stack direction='row' justifyContent="flex-end">     
            <Tabs 
              value={value}
              onChange={handleTabs}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
            <Tab label="Cadastro de Peixes"/>
            <Tab label="Peixes Cadastrados"/>
            <Tab label="Registro Passagens"/>
            <Tab label="Status das Antenas"/>
            <Tab label="Editar Peixe"/>
          </Tabs>
          </Stack>
        </Toolbar>
      </AppBar>
      <Divider/>
        <TabPanel value={value} index={0}><CadastroPeixes/></TabPanel>
        <TabPanel value={value} index={1}><PeixesCadastrados handleTabs={handleTabs}/></TabPanel>
        <TabPanel value={value} index={2}><RegistroPassagens/></TabPanel>
        <TabPanel value={value} index={3}><StatusAntenas/></TabPanel> 
        <TabPanel value={value} index={4}><EditarPeixe /></TabPanel> 
    </div>   
  );
}

function TabPanel(props){
  const {children,value,index}=props;
  return(
    <div>
      {
        value===index &&(
          <h1>{children}</h1>
        )
      }
    </div>
  )
}

