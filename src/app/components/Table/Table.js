import React from 'react'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { Delete, Edit, ArrowUpwardSharp, ArrowDownward } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    customHoverFocusEdit: {
        "&:hover, &.Mui-focusVisible": { backgroundColor: "#ffd99394" }
    },
    customHoverFocusDelete: {
        "&:hover, &.Mui-focusVisible": { backgroundColor: "#fc6b6b47" }
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1a2754e0",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function UserTable({ handleSort, sortDirection, users, handleOpen, handleRemove }) {

    const classes = useStyles();

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell sortDirection='asc'>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            onClick={() => handleSort()}
                        >
                            <span>Username</span>
                            {sortDirection === "asc" ? (
                                <ArrowUpwardSharp />
                            ) : (
                                    <ArrowDownward />
                                )
                            }
                        </div>
                    </StyledTableCell>
                    <StyledTableCell>City</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Edit</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users ? (
                        users.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <IconButton className={classes.customHoverFocusEdit} onClick={() => handleOpen(row)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton className={classes.customHoverFocusDelete} onClick={() => handleRemove(row)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )

                        )) : (
                            <TableRow
                                key={0}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <td>No data to show</td>
                            </TableRow>

                        )
                }
            </TableBody>
        </Table>

    )
}

