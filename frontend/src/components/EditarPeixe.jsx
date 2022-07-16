import { Button, Container, Divider, FormControlLabel, FormGroup, Switch, TextField, InputAdornment, Typography} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'; 
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

import axios from 'axios';

function EditarPeixe(){
  const[recaptura,setRecaptura]=useState(false)  
  const{register,handleSubmit}=useForm();

  const[id, setId]=useState();
  let [peixe, setPeixe] = useState('');

  useEffect(()=>{
    axios.get(`http://localhost:5050/peixes/${id}`)
    .then((response) => {
      console.log(response.data);
      setPeixe(response.data);
    })
    .catch(err => console.log(err));
  },[]);

  const ref = useRef(null);

  const findElement = (e) => { 
    axios.get(`http://localhost:5050/peixes/${e.currentTarget.value}`)
    .then((response) => {
      console.log(response.data);
      setPeixe(response.data);
    })
    .catch(err => console.log(err));
  }

  const onSubmit = async (data, e) => {
    try {
      console.log(data)
      console.log(peixe);
      data.recapture = recaptura;
      const response = await fetch(`http://localhost:5050/peixes/${peixe.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      console.log(response.json());
    } catch (e) {
      console.log(e);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }
  let handleUpdateForm = (e) => {
    if (e.currentTarget.name == "id") {
      findElement(e) 
    }
    peixe[e.currentTarget.name] = e.currentTarget.value;
    setPeixe({...peixe});
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
              <Typography color="textSecondary" 
                          style={{justifyContent:'center', textAlign: 'start', marginLeft:10}}
                          >Id
              </Typography>
              <TextField
                name='id'
                variant='outlined'
                color='secondary'
                style ={{width: '100%'}} 
                value={peixe.id}
                type='Number'
                onChange={handleUpdateForm}
              />
              <Typography color="textSecondary" 
                          style={{justifyContent:'center', textAlign: 'start', marginLeft:10}}
                          >PitTag
              </Typography>
              <TextField
                name='pittag'
                variant='outlined'
                color='secondary'
                defaultValue={peixe.pittag}
                style ={{width: '100%'}} 
                ref={ref}
                value={peixe.pittag}   
                disabled
                onChange={handleUpdateForm}
              />
              <Typography color="textSecondary" 
                          style={{justifyContent:'center', textAlign: 'start', marginLeft:10}}
                          >Nome Científico da Espécie
              </Typography>
              <TextField
                name='nomeCientifico'
                variant='outlined'
                color='secondary'
                defaultValue={peixe.nomeCientifico}
                style ={{width: '100%'}} 
                ref={ref}
                value={peixe.nomeCientifico}         
                required
                onChange={handleUpdateForm}
              />
              <Typography color="textSecondary" 
                          style={{justifyContent:'center', textAlign: 'start', marginLeft:10}}
                          >Nome Popular
              </Typography>
              <TextField
                id='nomePopular'
                name='nomePopular'
                variant='outlined'
                color='secondary'
                defaultValue={peixe.nomePopular}
                style ={{width: '100%'}} 
                ref={ref}
                onChange={handleUpdateForm}
                value={peixe.nomePopular}
              />
              <Typography color="textSecondary" 
                          style={{justifyContent:'center', textAlign: 'start', marginLeft:10}}
                          >Local de Captura
              </Typography>
              <TextField
                name='localCaptura:'
                variant='outlined'
                color='secondary'
                defaultValue={peixe.localCaptura}
                style ={{width: '100%'}} 
                ref={ref}
                onChange={handleUpdateForm}
                value={peixe.localCaptura}
                required
              />                  
              <Typography color="textSecondary" 
                          style={{textAlign: 'start', marginLeft:10}}
                          >Data de Soltura
              </Typography>       
              <TextField
                name="dataSoltura"
                variant='outlined'
                color='secondary'
                defaultValue={peixe.dataSoltura}
                style ={{width: '100%'}} 
                ref={ref}
                onChange={handleUpdateForm}
                value={peixe.dataSoltura}
                required
              />
              <Typography color="textSecondary" 
                          style={{textAlign: 'start', marginLeft:10}}
                          >Código da Amostra de DNA
              </Typography>  
              <TextField
                name='amostraDna'
                variant='outlined'
                color='secondary'
                defaultValue={peixe.amostraDna}
                style ={{width: '100%'}} 
                ref={ref}
                onChange={handleUpdateForm}
                value={peixe.amostraDna}
                required 
              />
            </Grid>         
            <Grid item xs={5}
                  sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
            >
            <Typography color="textSecondary" 
                        style={{textAlign: 'start', marginLeft:10}}
                        >Comprimento Padrão
            </Typography>  
            <TextField
              name='comprimentoPadrao'
              type='number'
              variant='outlined'
              color='secondary'
              defaultValue={peixe.comprimentoPadrao}
              style ={{width: '100%'}} 
              ref={ref}
              onChange={handleUpdateForm}
              value={peixe.comprimentoPadrao}
              InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>
              }}
              required                
            />
            <Typography color="textSecondary" 
                        style={{textAlign: 'start', marginLeft:10}}
                        >Comprimento Total
            </Typography>  
            <TextField
              name='comprimentoTotal'
              type='number'
              variant='outlined'
              color='secondary'
              defaultValue={peixe.comprimentoTotal}
              style ={{width: '100%'}} 
              ref={ref}
              value={peixe.comprimentoTotal}
              InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>
              }}
              required
            />
            <Typography color="textSecondary" 
                        style={{textAlign: 'start', marginLeft:10}}
                        >Peso na Soltura
            </Typography> 
            <TextField
              name='pesoSoltura'
              variant='outlined'
              color='secondary'
              defaultValue={peixe.pesoSoltura}
              style ={{width: '100%'}} 
              ref={ref}
              value={peixe.pesoSoltura}
              InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
              required
            />
            <Typography color="textSecondary" 
                        style={{textAlign: 'start', marginLeft:10}}
                        >Local da Soltura
            </Typography> 
            <TextField
              name="localSoltura"
              variant='outlined'
              color='secondary'
              defaultValue={peixe.localSoltura}
              style ={{width: '100%'}} 
              ref={ref}
              value={peixe.localSoltura}
              required
            />
            <Typography color="textSecondary" 
                        style={{textAlign: 'start', marginLeft:10}}
                        >Comentário
            </Typography> 
            <TextField
              id="outlined-multiline-static"
              name='comentario'
              label="Comentário"
              variant='outlined'
              color='secondary'
              aria-label="minimum height"
              multiline
              rows={4}
              defaultValue={peixe.comentario}
              style ={{width: '100%'}} 
              ref={ref}
              value={peixe.comentario ? peixe.comentario : '' }
            />
            <FormGroup>
              <FormControlLabel 
                label="Recaptura" 
                style={{marginLeft: 1}}
                onChange  = { (e) => setRecaptura(e.target.checked)} control={<Switch  
                color="secondary"/> }  
                value={peixe.recaptura}
              />                
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