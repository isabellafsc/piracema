import React, { useState, useEffect } from 'react';
import { Divider, Stack, Box, Typography, TextField,  FormControlLabel, FormGroup, Switch, Button, Snackbar, Alert} from '@mui/material';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function StatusAntenas() {
    const [status,setStatus]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5050/statusantenas")
        .then(response => {
            return response.json();
        })
        .then( jsondata => setStatus(jsondata));
        console.log(status);
    },[]);

    const[statusAntena,setStatusAntena]=useState(false) 
    const{register,handleSubmit}=useForm();
    const [clearedDate, setClearedDate] = React.useState(null);

    const [openSucessSnackbar, setOpenSucessSnackbar]=useState(false)  
    const [openErrorSnackbar, setOpenErrorSnackbar]=useState(false)  

    const onSubmit=(e)=>{
        console.log(e);
        fetch("http://localhost:5050/statusantenas",{
            method: "POST",
            body: JSON.stringify(e),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((response) => {
            if (response.ok) { setOpenSucessSnackbar(true) }
            else { setOpenErrorSnackbar(true) }
          })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <Container>
                <Stack direction='row' margin={4}>              
                    <Stack direction='column' style ={{width: '70%'}}>
                        <center>                        
                            <Box
                                sx={{
                                    maxHeight: { xs: 240, md: 460 },
                                    maxWidth: { xs: 400, md: 600 },
                                }}
                                component="img"
                                alt="Imagem com localização das antenas."
                                src="/images/antenas.png"
                                border={1}
                            />
                        </center>
                    </Stack>
                        <Stack direction='column' spacing={2} style ={{width: '50%'}}>
                            <Typography 
                                        variant="h5" 
                                        color="textSecondary" 
                                        style={{margin: 10, marginTop: 20}}>
                                Dados de cadastro Status Antena
                            </Typography>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)} > 
                            <TextField
                                name='idAntena'
                                label="Id Antena"
                                type='number'
                                variant='outlined'
                                color='secondary'
                                style ={{width: '100%'}} 
                                required
                                {...register("idAntena")}
                            />
                            <FormGroup>
                                <FormControlLabel 
                                    label="Status" 
                                    style={{marginLeft: 1, marginBlock:15}}
                                    onChange  = { (e) => setStatusAntena(e.target.checked)} control={<Switch  
                                    color="secondary"/> } 
                                    {...register("status")}
                                /> 
                            </FormGroup>
                            {console.log(statusAntena)}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    name='dataMudancaStatus'
                                    label="Data da Mudança do Status"
                                    value={clearedDate}
                                    inputFormat="yyyy-MM-dd'T'HH:mm:ss"
                                    onChange={(newValue) => setClearedDate(newValue)}
                                    renderInput={(params) => (
                                        <TextField {...params} 
                                            style ={{width: '100%'}} 
                                            variant='outlined' 
                                            color='secondary' 
                                            required 
                                            {...register("dataMudancaStatus")}
                                        />
                                )}/>
                            </LocalizationProvider>
                            <div style={{ justifyContent:'center', textAlign: 'right', marginRight: 80, marginTop: 30}} >
                                <Button  
                                    size='large' 
                                    variant='contained' 
                                    color='secondary' 
                                    type='submit'
                                    style={{margin: '5px',}}
                                    >Salvar
                                </Button>
                                <Button 
                                    size='large' 
                                    variant='contained' 
                                    color='secondary' 
                                    type='reset'
                                    style={{margin: '5px'}} 
                                    >Cancelar
                                </Button>
                            </div>
                        </form>
                        <Snackbar open={openSucessSnackbar} 
                                  autoHideDuration={4000} 
                                  onClose={() => { setOpenSucessSnackbar(false) }} 
                                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }} >
                            <Alert onClose={() => { setOpenSucessSnackbar(false) }} 
                                variant="filled" 
                                severity="success" sx={{ width: "100%" }}
                                >Status cadastrado com sucesso
                            </Alert>
                        </Snackbar>

                        <Snackbar open={openErrorSnackbar} 
                                autoHideDuration={4000} 
                                onClose={() => { setOpenErrorSnackbar(false) }} 
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }} >
                            <Alert onClose={() => { setOpenErrorSnackbar(false) }} 
                                variant="filled" 
                                severity="error" 
                                sx={{ width: "100%" }}
                                > Houve um erro no seu cadastro
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Stack>
            </Container>
            <Divider />  

            {status.map((statusantenas) => (
            <div>
                <Container >
                    <Stack direction='row' margin={4}>              
                        <Stack direction='column' spacing={2} style ={{width: '50%'}}>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Id Antena:</Typography>
                                <Typography>{statusantenas.antena.id}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome:</Typography>
                                <Typography>{statusantenas.antena.nome}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Status:</Typography>
                                <Typography>{statusantenas.status ? "ON" : "OFF"}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data da Mudança:</Typography>
                                <Typography>{statusantenas.dataMudancaStatus}</Typography>
                            </Stack>                   
                        </Stack>
                        <Stack direction='column' spacing={2} style ={{width: '50%'}}>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Latitude:</Typography>
                                <Typography>{statusantenas.antena.latitude}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Longitude:</Typography>
                                <Typography>{statusantenas.antena.longitude}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data de Instalação:</Typography>
                                <Typography>{statusantenas.antena.dataInstalacao}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data Desativação:</Typography>
                                <Typography>{statusantenas.antena.dataDesativacao}</Typography>
                            </Stack>    
                        </Stack>
                    </Stack>
                </Container>
                <Divider/>          
            </div>
            ))
        }</div>  
    )
}