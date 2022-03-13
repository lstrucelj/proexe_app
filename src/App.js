import React, { useState, useEffect } from 'react';
import './App.css';

import Button from '@mui/material/Button';
import { Box, Container, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { useConfirm } from "material-ui-confirm";
import { connect } from 'react-redux'
import { fetchDeleteUser, fetchUsers, sortUsers } from './app/actions/actions';

import Form from './app/components/Form/Form'
import UserTable from './app/components/Table/Table'

function App({ dispatch, users }) {

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    const [currentlyEdit, setcurrentlyEdit] = useState(null);
    const confirm = useConfirm();
    const [sortDirection, setsortDirection] = useState('asc');

    const [open, setOpen] = React.useState(false);
    const handleOpen = (edit) => {
        setcurrentlyEdit(edit || null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleRemove = item => {
        confirm({ description: `This will permanently delete ${item.name}.` })
            .then(() => {
                dispatch(fetchDeleteUser(item));
            })
            .catch(() => console.log("Deletion cancelled."));
    };

    const handleSort = () => {
        let newSort = sortDirection == 'asc' ? 'desc' : 'asc';
        setsortDirection(newSort);
        dispatch(sortUsers(newSort));
    };


    return (
        <main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 350,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Form sortDirection={sortDirection} dispatch={dispatch} handleClose={handleClose} edit={currentlyEdit} />
                </Box>
            </Modal>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        fontFamily="none"
                    >
                        Dashboard
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md" style={{ border: "1px outset #00c7ff4d" }}>
                <div className="header-container">
                    <div className="header">
                        <h3>User list</h3>
                    </div>
                    <div className='add-btn'>
                        <Button color={"primary"} variant="contained" onClick={() => handleOpen()}>Add new</Button>
                    </div>

                </div>

                <UserTable users={users} sortDirection={sortDirection} handleSort={handleSort} handleOpen={handleOpen} handleRemove={handleRemove} />

            </Container >
        </main >
    );
}

const mapStateToProps = state => ({
    users: state.users,
})

export default connect(mapStateToProps)(App)
