import {
    Paper,
    TableContainer,
    Table as MTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material"
import { Column, useTable } from "react-table"

const Table = <D extends {}>({
    columns,
    data,
}: {
    columns: Column<D>[]
    data: D[]
}) => {
    const ti = useTable({ columns, data })

    return (
        <TableContainer component={Paper}>
            <MTable {...ti.getTableProps()}>
                <TableHead>
                    {ti.headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody {...ti.getTableBodyProps()}>
                    {ti.rows.map((row, i) => {
                        ti.prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MTable>
        </TableContainer>
    )
}

export default Table
