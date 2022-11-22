import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {

    const [pratos, setPrato] = useState<IPrato[]>([])

    useEffect( () => {
        http.get<IPrato[]>('pratos/')
        .then (resposta => setPrato(resposta.data))
    }, [])

    const excluir = (pratoASerExcluido: IPrato) => {
        http.delete(`pratos/${pratoASerExcluido.id}/`)
        .then(()=> {
            const listaPrato = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
            setPrato([...listaPrato])
        })
    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { pratos.map(prato => <TableRow key = {prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            [<Link to = {`/admin/pratos/${prato.id}`}>Editar</Link>]
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' color='error' onClick={()=> excluir(prato)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}                    
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos;