import { Button, ButtonGroup, Divider, Stack, TextField, Typography, Container} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useState, useEffect} from 'react';

export default function PeixesCadastrados( {handleTabs}) {
    const [peixe, setPeixe]=useState([{}]);
    const [input, setIntup]=useState('');

    // //GET PEIXES
    // useEffect(()=>{
    // fetch("http://localhost:5050/peixes")
    // .then(response => {
    //     return response.json();
    // })
    // .then( jsondata => setPeixe(jsondata));
    // },[]);
    useEffect(() => {
        (async () => {
            fetch("http://localhost:5050/peixes")
            .then(response => {
                return response.json();
            })
            .then( jsondata => setPeixe(jsondata));
        })();
    }, []);

    //DELETE
    function Deletar(peixe1, pittag){
        if(window.confirm("Excluir peixe com pittag " + pittag + "?") === true){
            var url = "http://localhost:5050/peixes/"+peixe1
            fetch(url, {
                method: "DELETE",
                body: JSON.stringify(peixe1),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));

            alert("Peixe excluído com sucesso!");
            window.location.reload(false);
        }
    }

    //LISTA DADOS PEIXES
    function list(peixe) {
        return(
        peixe.map((p)=>(
            <div>
                <Container >
                    <Stack direction='row' spacing={5} margin={4}>                   
                        <Stack flexdirection='column' spacing={2} style ={{width: '100%'}}fontSize={20}  >
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Identificador:</Typography>
                                <Typography>{p.id}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>PitTag:</Typography>
                                <Typography>{p.pittag}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome Científico da Espécie: </Typography>
                                <Typography>{p.nomeCientifico}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome Popular:</Typography>
                                <Typography>{p.nomePopular}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Local da Captura:</Typography>
                                <Typography>{p.localCaptura}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data da Soltura:</Typography>
                                <Typography>{p.dataSoltura}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Local da Soltura:</Typography>
                                <Typography>{p.localSoltura}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Código de Amostra do DNA:</Typography>
                                <Typography>{p.amostraDna}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Recaptura:</Typography>
                                <Typography>{p.recaptura ? "SIM" : "NÃO"}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Comentário:</Typography>
                                <Typography>{p.comentario}</Typography>
                            </Stack>                                        
                        </Stack>
                    
                        <Stack direction='column'>                   
                            <ButtonGroup size="small" aria-label=" small button group" variant='text' color="inherit">
                                <Button onClick={(e) => handleTabs(e, 4)}
                                        size='large' 
                                        variant='contained' 
                                        color='secondary' 
                                        type='submit' 
                                        style={{margin: '5px'}} 
                                        startIcon={<EditIcon/>}
                                        >Editar</Button>
                                <Button onClick={()=>Deletar(p.id, p.pittag)} 
                                        size='large' 
                                        variant='contained' 
                                        color='secondary' 
                                        type='submit' 
                                        style={{margin: '5px'}} 
                                        startIcon={<DeleteIcon />}
                                        >Excluir</Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>        
                </Container>
                <Divider/>
            </div>
            ))
        )
    }

    //FILTRA DADOS DA LISTA
    function filter(peixe) {
        let expressao = new RegExp(input, 'i')
        let resultado = peixe.filter(
            (peixe) => {
                if(
                    expressao.test(peixe.pittag) ||
                    expressao.test(peixe.nomeCientifico) ||
                    expressao.test(peixe.nomePopular) ||
                    expressao.test(peixe.localCaptura) ||
                    expressao.test(peixe.dataSoltura) ||
                    expressao.test(peixe.localSoltura) ||
                    expressao.test(peixe.amostraDna) ||
                    expressao.test(peixe.recaptura)
                ){
                return peixe }
            })
        return list(resultado)
    }
  
    return (
        <div>
            <center>
                <TextField
                    value={input}
                    onChange={(e) => {setIntup(e.target.value)}}
                    label="Digite para buscar um peixe"
                    variant='outlined'
                    color='secondary'
                    required
                    style ={{width: '60%', marginBottom:20, marginTop: 20}}  
                />
            </center>
            {console.log(input)}
            <Divider /> 
            {
                filter(peixe)
            } 
        </div>
    )
}