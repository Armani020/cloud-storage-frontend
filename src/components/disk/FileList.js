import React from 'react';
import {Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import File from "./File";

const FileList = () => {

    const columns = [
        {id: 'icon', label: 'Icon', align: 'center'},
        {id: 'name', label: 'Name'},
        {
            id: 'date',
            label: 'Date',
            minWidth: 170,
            align: 'left',
            format: value => value.toLocaleString('date'),
        },
        {
            id: 'size',
            label: 'Size',
            minWidth: 170,
            align: 'right',
        },
        {id: 'delete', label: 'Delete', align: 'center'},
        {id: 'download', label: 'Download', align: 'center'},

    ];

    const rows = [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const files = useSelector(state => state.files.files)
    files.map(file => rows.push(file))//<File file={file} key={file.id}/>)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 'calc(100% - 96px)'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {files.map(file =>
                        <File key={file.id} file={file}/>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default FileList;