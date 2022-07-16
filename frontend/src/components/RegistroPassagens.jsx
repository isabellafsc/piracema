import { useState, useEffect, React } from 'react';
import { Divider, Stack, Typography, Button, Container, Snackbar, Alert} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function RegistroPassagens() {

    const [passagens,setPassagens]=useState([])

    const Input = styled("input")({ display: "none" });

    const [openSucessSnackbar, setOpenSucessSnackbar]=useState(false)  
    const [openErrorSnackbar, setOpenErrorSnackbar]=useState(false)  

    //UPLOADO DO CSV
    const csvSubmit = (e) => {
        const csvData=new FormData();
        csvData.append("csvFile", e.target.files[0])

        console.log(e.target.files[0])

        fetch("http://localhost:5050/passagens/upload",{
            method: "POST",
            body: csvData
        })
        .then((response) => {
            if (response.ok) { setOpenSucessSnackbar(true) }
            else { setOpenErrorSnackbar(true) }
        });
    }

    //GET PASSAGENS
    useEffect(()=>{
        fetch("http://localhost:5050/passagens")
        .then(response => {
            return response.json();
        })
        .then( jsondata => setPassagens(jsondata));
    },[]);

    //DELETE
    function deletar(passagem1){
        if(window.confirm("Deseja excluir esta passagem? ") === true){
            var url = "http://localhost:5050/passagens/"+passagem1
            fetch(url, {
                method: "DELETE",
                body: JSON.stringify(passagem1),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(jsondata => setPassagens(jsondata))
            .catch(err => console.log(err));

            alert("Passagem excluída com sucesso!");
        }
    }

    return (
        <div>
            <Container >
                <Snackbar open={openSucessSnackbar} 
                          autoHideDuration={4000} 
                          onClose={() => { setOpenSucessSnackbar(false) }} 
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} >
                        <Alert onClose={() => { setOpenSucessSnackbar(false) }} 
                               variant="filled" 
                               severity="success" sx={{ width: "100%" }}
                               >Passagem cadastrada com sucesso
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

                <Stack direction='row'>  
                    <Stack style ={{width: '75%'}}> 
                        <Typography variant="h5" 
                                    color="textSecondary" 
                                    style={{margin: 20, marginTop: 50}}
                                    >Dados de cadastro de passagem
                        </Typography>
                    </Stack>                    
                    <Stack style ={{width: '25%'}}> 
                        <label htmlFor="csvFile">
                            <Input accept=".csv" 
                                   type="file" 
                                   id="csvFile" 
                                   onChange={csvSubmit} 
                            />
                            <Button style={{margin: 20, marginTop: 46}}
                                    size='large' 
                                    variant='contained' 
                                    color='secondary'  
                                    component="span" 
                                    startIcon={<AttachFileIcon />}
                                    >Carregar
                            </Button>
                        </label>
                    </Stack>
                </Stack>
                <Divider />
            </Container>

            {passagens.map((passagens)=>(
            <div>
                <Container >
                    <Stack direction='row' margin={4}>
                        <Stack direction='column' spacing={2} style ={{width: '50%'}}>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Identificador Peixe:</Typography>
                                <Typography>{passagens.peixe.id}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1}>
                                <Typography style={{fontWeight: 700}}>PitTag:</Typography>
                                <Typography>{passagens.peixe.pittag}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome Científico da Espécie:</Typography>
                                <Typography>{passagens.peixe.nomeCientifico}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome Popular:</Typography>
                                <Typography>{passagens.peixe.nomePopular}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Comprimento Padrão (cm):</Typography>
                                <Typography>{passagens.peixe.comprimentoPadrao}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Comprimento Total (cm):</Typography>
                                <Typography>{passagens.peixe.comprimentoTotal}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data da Soltura:</Typography>
                                <Typography>{passagens.peixe.dataSoltura}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='column' spacing={2} style ={{width: '50%'}}>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Local da Soltura:</Typography>
                                <Typography>{passagens.peixe.localSoltura}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Recaptura:</Typography>
                                <Typography>{passagens.peixe.recaptura ? "SIM" : "NÃO"}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Identificador Antena:</Typography>
                                <Typography>{passagens.antena.id}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Nome da Antena: </Typography>
                                <Typography>{passagens.antena.nome}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} >
                                <Typography style={{fontWeight: 700}}>Data e Hora do Registro: </Typography>
                                <Typography>{passagens.dataRegistro}</Typography>
                            </Stack> 
                            <div style={{ textAlign: 'right', marginRight: 80,}} >
                                <Button onClick={()=>deletar(passagens.id)}  
                                        size='large' 
                                        variant='contained' 
                                        color='secondary' 
                                        type='submit' 
                                        style={{width: '30%', margin: '5px', marginTop:'20px'}} 
                                        startIcon={<DeleteIcon />}
                                        >Excluir
                                </Button>                      
                            </div>
                        </Stack>
                    </Stack>
                </Container>
                <Divider/>
            </div>
            ))
        }</div>
    )
}