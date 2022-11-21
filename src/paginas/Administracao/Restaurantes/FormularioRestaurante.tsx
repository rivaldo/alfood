import { Button, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http
                .get<IRestaurante>(`/restaurantes/${parametros.id}/`)
                .then((resposta) => {
                    setNomeRestaurante(resposta.data.nome);
                });
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http
                .put(`restaurantes/${parametros.id}/`, {
                    nome: nomeRestaurante,
                })
                .then(() => {
                    alert("Restaurante Atualizado com sucesso");
                });
        } else {
            http
                .post("restaurantes/", {
                    nome: nomeRestaurante,
                })
                .then(() => {
                    alert("Restaurante Cadastrado com sucesso!");
                });
        }
    };
    return (
        <>
            

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flexGrow: 1
                            }}
                        >
                            <Typography component="h1" variant="h6">
                                Formulário de Restaurantes
                            </Typography>
                            <Box component="form" sx = {{width: '100%'}} onSubmit={aoSubmeterForm}>
                                <TextField
                                    onChange={(evento) => setNomeRestaurante(evento.target.value)}
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button
                                    sx={{ marginTop: 2 }}
                                    type="submit"
                                    variant="outlined"
                                    fullWidth
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default FormularioRestaurante;
