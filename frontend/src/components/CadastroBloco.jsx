import { Button, Container, Divider, FormControlLabel, FormGroup, Switch, TextField, InputAdornment, Typography, Fab, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react'; 
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function CadastroBloco(){
  
  const[recaptura,setRecaptura]=useState(false)  
  const[addBloco,setAddBloco]=useState(false)  
  const{register,handleSubmit}=useForm();

  const [clearedDate, setClearedDate] = React.useState(null);

  const onSubmit=(e)=>{
    console.log(e);
    fetch("http://localhost:5050/peixes/bloco",{
      method: "POST",
      body: JSON.stringify(e),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  }

  function refreshPage() {
    window.location.reload(false);
  }

 return (
  <Container>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Typography variant="h5" 
                  color="textSecondary" 
                  style={{margin: 20, marginTop: 50}}
                  >Dados de cadastro dos peixes por bloco
      </Typography>      
      <Divider />

      <Typography variant="h6" 
                  color="textSecondary" 
                  style={{marginLeft: 20, marginTop: 20}}
                  >Dados repetíveis:
      </Typography>
      <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
        <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
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
        </Grid>   
        <Grid item xs={5}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
          >
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
              inputFormat="yyyy-MM-dd'T'hh:mm:ss"
              // mask="___/__/__ __:__:__"
              onChange={(newValue) => setClearedDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} style ={{width: '100%'}} variant='outlined' color='secondary' required 
                {...register("dataSoltura")}/>
              )}/>
          </LocalizationProvider>
          <TextField
            name="localSoltura"
            label="Local da Soltura"
            variant='outlined'
            color='secondary'
            style ={{width: '100%'}} 
            required
            {...register("localSoltura")}
          />
        </Grid>
      </Grid>
      <Divider/>
      <Typography variant="h6" 
                  color="textSecondary" 
                  style={{marginLeft: 20, marginTop: 20}}
                  >Dados únicos:
      </Typography>
      <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
      <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
          <TextField
            name='pittag'
            label="PitTag"
            variant='outlined'
            color='secondary'
            style ={{width: '100%'}} 
            required
            {...register("pittag")}
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
            type='number'
            variant='outlined'
            color='secondary'
            style ={{width: '100%'}} 
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            required
            {...register("pesoSoltura")}
          />
        </Grid>       
        <Grid item xs={5}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
          >
          <TextField
            name='amostraDna'
            label="Código da Amostra de DNA"
            variant='outlined'
            color='secondary'
            style ={{width: '100%'}} 
            required 
            {...register("amostraDna")}
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

      <Divider/>

      <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
        <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
            <TextField
              name='pittag'
              label="PitTag"
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              required
              {...register("pittag")}
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
              type='number'
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
              required
              {...register("pesoSoltura")}
            />
          </Grid>       
          <Grid item xs={5}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              autoComplete="off"
            >
            <TextField
              name='amostraDna'
              label="Código da Amostra de DNA"
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              required 
              {...register("amostraDna")}
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
            <FormGroup>
              <FormControlLabel 
                style={{marginLeft: 440}}
                onChange  = { (e) => setAddBloco(e.target.checked)}  control={<Switch  color="secondary"/> }  />
                </FormGroup>
            {console.log(addBloco)}
        </Grid>
      </Grid>
    </div>
    
    {addBloco&&(
    <div>
          <Grid container spacing={2} style={{ justifyContent:'center', textAlign: 'center', margin: 10}} >
        <Grid item xs={5} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} autoComplete="off" >
            <TextField
              name='pittag'
              label="PitTag"
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              required
              {...register("pittag")}
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
              type='number'
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
              required
              {...register("pesoSoltura")}
            />
          </Grid>       
          <Grid item xs={5}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              autoComplete="off"
            >
            <TextField
              name='amostraDna'
              label="Código da Amostra de DNA"
              variant='outlined'
              color='secondary'
              style ={{width: '100%'}} 
              required 
              {...register("amostraDna")}
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
            <FormGroup>
              <FormControlLabel 
                style={{marginLeft: 440}}
                onChange  = { (e) => setAddBloco(e.target.checked)}  control={<Switch  color="secondary"/> }  />
                </FormGroup>
            {console.log(addBloco)}
        </Grid>
      </Grid>
    </div>
    )}

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
              type='reset'
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
export default CadastroBloco;