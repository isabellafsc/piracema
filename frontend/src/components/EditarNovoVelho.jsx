import { Button, Container, Divider, FormControlLabel, FormGroup, Switch, TextField, InputAdornment, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react'; 
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function EditarPeixe(){
  
  const[recaptura,setRecaptura]=useState(false)  
  const{register,handleSubmit}=useForm();

  const [clearedDate, setClearedDate] = React.useState(null);

  const onSubmit = async (data, e) => {
    try {
      console.log(data);
      data.recapture = recaptura;
      const response = await fetch(`http://localhost:5050/peixes/${data.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      console.log(response.json());
    } catch (e) {
      console.log(e);
    }
    window.location.reload(false);
  };

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
                      >Dados de atualização do peixe
          </Typography>        
          <Divider />
          
          <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
            <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
              <TextField
                name='id'
                label="ID"
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
                {...register("id")}
              />
              <TextField
                name='pittag'
                label="PitTag"
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
                {...register("pittag")}
              />
              <TextField
                name='nomeCientifico'
                label="Nome Científico da Espécie"
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
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
                    <TextField {...params} style ={{width: '100%'}} 
                                          variant='outlined' 
                                          color='secondary' 
                                          {...register("dataSoltura")}/>
                  )}/>
              </LocalizationProvider>
              <TextField
                name='amostraDna'
                label="Código da Amostra de DNA"
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}}
                {...register("amostraDna")}
                />
            </Grid>         
            <Grid item xs={5}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
              >
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
                {...register("comprimentoTotal")}
              />

              <TextField
                name='pesoSoltura'
                label="Peso na Soltura"
                type='number'
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>
                }}
                {...register("pesoSoltura")}
              />

              <TextField
                name="localSoltura"
                label="Local da Soltura"
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
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

              {console.log(recaptura)}

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
export default EditarPeixe;