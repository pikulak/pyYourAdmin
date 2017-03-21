import React from 'react'
import axios from 'axios'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class DatabaseTable extends React.Component{
    constructor(props){
        super(props)
        this.match = props.match
        this.state = {}
        this.updateTableData = this.updateTableData.bind(this)
    }

    updateTableData(){
        axios.get("/api/tables/" + this.match.params.tableName)
                .then(response => {
                    this.setState({tableData:{
                        rowData: response.data.rows,
                        columnData: response.data.columns
                    }})
            })
    }

    componentDidMount(){
        this.updateTableData()
    }

    componentWillReceiveProps(nextProps){
        this.match = nextProps.match
        this.updateTableData()
    }

    render(){ return(
        <div>
            <h2>{ this.match.params.tableName }</h2>
            {this.state.tableData ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            {this.state.tableData.columnData.map( (columnName, indexColumn) =>
                                <TableHeaderColumn key={ indexColumn }>{ columnName } </TableHeaderColumn>
                            )}
                        </TableRow>
                    </TableHeader>
                    {(this.state.tableData.rowData.length > 0) ? (
                        <TableBody>
                            {this.state.tableData.rowData.map( (row, indexRow) =>
                                <TableRow key={ indexRow }>
                                {row.map( (cell, indexCell) =>
                                    <TableRowColumn key={ indexCell }>{ cell }</TableRowColumn>
                                )}
                                </TableRow>
                                )
                            }
                        </TableBody>)
                        :
                        (<TableBody>
                            <p> This table is empty </p>
                         </TableBody>)
                    }

                </Table>) : ( <p> Fetching data... </p> )
            }
        </div>
    )}
}
