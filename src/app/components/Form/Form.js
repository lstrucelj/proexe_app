import React, { useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { fetchCreateUser, fetchUpdateUser, sortUsers } from '../../actions/actions';
import Button from '@mui/material/Button';

export default function Form({ handleClose, edit, dispatch, sortDirection }) {
    const [data, setdata] = useState(edit || {
        id: "",
        name: "",
        username: "",
        city: "",
        email: "",
    });
    const [validate, setvalidate] = useState({
        name: "",
        username: "",
    });

    const change = e => {
        setdata(prev => {
            let result = Object.assign({}, prev);
            result[e.target.name] = e.target.value;
            return result;
        });
    };

    const validateInput = () => {
        let isError = false;

        if (!data.name) {
            isError = true;
            setvalidate(prev => {
                let result = Object.assign({}, prev);
                result.name = "Is required!";
                return result;
            });
        }

        if (!data.username) {
            isError = true;
            setvalidate(prev => {
                let result = Object.assign({}, prev);
                result.username = "Is required!";
                return result;
            });
        }

        return isError;
    }

    const onSave = (edit) => {
        const err = validateInput();
        if (err) return;
        if (edit) {
            dispatch(fetchUpdateUser(data));
        } else {
            dispatch(fetchCreateUser(data));
        }
        dispatch(sortUsers(sortDirection));

        handleClose();
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
            >
                {
                    edit ? 'Edit user' : 'Add new user'
                }
            </Typography>
            <TextField
                name="name"
                required
                id="outlined-required"
                label="Name"
                fullWidth
                value={data.name}
                onChange={change}
                error={!!validate.name}

            />
            <TextField
                name="username"
                required
                id="outlined-required"
                label="Username"
                fullWidth
                value={data.username}
                onChange={change}
                error={!!validate.username}
            />
            <TextField
                name="city"
                id="outlined-required"
                label="City"
                fullWidth
                value={data.city}
                onChange={change} />
            <TextField
                name="email"
                id="outlined-required"
                label="Email"
                fullWidth
                value={data.email}
                onChange={change} />
            <Stack spacing={2} direction="row" alignItems='center' justifyContent='center' marginTop={5} >
                {
                    edit ?
                        <Button onClick={() => onSave(true)} variant="contained" color="success">Edit</Button> :
                        <Button onClick={() => onSave()} variant="contained" color="success">Save</Button>
                }
                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
            </Stack>
        </Box>
    )
};