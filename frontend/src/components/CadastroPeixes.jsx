import { Button, Container, Divider, FormControlLabel, FormGroup, Switch, TextField, InputAdornment, Typography, Snackbar, Alert} from '@mui/material';
import React, { useState } from 'react'; 
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function CadastroPeixes(){

  const[recaptura,setRecaptura]=useState(false)  
  const{register,handleSubmit}=useForm();
  const [clearedDate, setClearedDate] = React.useState(null);

  const [openSucessSnackbar, setOpenSucessSnackbar]=useState(false)  
  const [openErrorSnackbar, setOpenErrorSnackbar]=useState(false)  
  

  const onSubmit=(e)=>{
    fetch("http://localhost:5050/peixes",{
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
  
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <Typography variant="h5" 
                      color="textSecondary" 
                      style={{margin: 20, marginTop: 50}}
                      >Dados de cadastro dos peixes
          </Typography>
          <Divider />
          <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
            <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
              <TextField
                        name='pittag'
                        label="PitTag"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}}
                        InputProps={{
                        endAdornment: <InputAdornment position="end">hex</InputAdornment>
                        }} 
                        required
                        {...register("pittag")}
              />
              <TextField
                        name='nomeCientifico'
                        label="Nome Científico da Espécie"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        required
                        {...register("nomeCientifico")}
              />
              <TextField
                        name='nomePopular'
                        label="Nome Popular"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        {...register("nomePopular")}
              />
              <TextField
                        name='localCaptura:'
                        label="Local de Captura"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        required
                        {...register("localCaptura")}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                              color='secondary'
                              name='dataSoltura'
                              label="Data de Soltura"
                              value={clearedDate}
                              inputFormat="yyyy-MM-dd'T'HH:mm:ss"
                              onChange={(newValue) => setClearedDate(newValue)}
                              renderInput={(params) => (
                              <TextField {...params} style ={{width: '100%'}} variant='outlined' color='secondary' required 
                              {...register("dataSoltura")}/>
                )}/>
              </LocalizationProvider>
              <TextField
                        name='amostraDna'
                        label="Código da Amostra de DNA"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        required 
                        {...register("amostraDna")}
              />
            </Grid>

            <Grid item xs={5}
                  sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off">
              <TextField
                        name='comprimentoPadrao'
                        label="Comprimento Padrão"
                        type='number'
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        required
                        {...register("comprimentoPadrao")}
              />
              <TextField
                        name='comprimentoTotal'
                        label="Comprimento Total"
                        type='number'
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        required
                        {...register("comprimentoTotal")}
              />
              <TextField
                        name='pesoSoltura'
                        label="Peso na Soltura"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>
                        }}
                        required
                        {...register("pesoSoltura")}
              />
              <TextField
                        name="localSoltura"
                        label="Local da Soltura"
                        variant='outlined'
                        color='secondary'
                        style ={{width: '100%'}} 
                        required
                        {...register("localSoltura")}
              />
              <TextField
                        id="outlined-multiline-static"
                        name='comentario'
                        label="Comentário"
                        variant='outlined'
                        color='secondary'
                        aria-label="minimum height"
                        multiline
                        rows={4}
                        style ={{width: '100%'}} 
                        {...register("comentario")}
              />
              <FormGroup>
                <FormControlLabel 
                        label="Recaptura" 
                        style={{marginLeft: 1}}
                        onChange  = { (e) => setRecaptura(e.target.checked)} control={<Switch  
                        color="secondary"/> }  
                        {...register("recaptura")}/> 
              </FormGroup>
              {/* {console.log(recaptura)} */}
              <Snackbar open={openSucessSnackbar} 
                          autoHideDuration={4000} 
                          onClose={() => { setOpenSucessSnackbar(false) }} 
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} >
                        <Alert onClose={() => { setOpenSucessSnackbar(false) }} 
                               variant="filled" 
                               severity="success" sx={{ width: "100%" }}
                               >Peixe cadastrado com sucesso
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
            </Grid>
          </Grid>
        </div>
        <br/>
        <div style={{ justifyContent:'center', textAlign: 'right', marginRight: 80}} >
          <Button size='large' 
                  variant='contained' 
                  color='secondary' 
                  type='submit' 
                  style={{margin: '5px',}} 
                  >Salvar
          </Button>
          <Button size='large' 
                  variant='contained' 
                  color='secondary' 
                  style={{margin: '5px'}}
                  onClick={refreshPage}
                  >Cancelar
          </Button>
        </div>
        <br/>
      </form>
    </Container>
  );   
}
export default CadastroPeixes;