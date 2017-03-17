import React from 'react'
import axios from 'axios'
import {observable} from "mobx"
import {observer} from "mobx-react"

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const style = {
    drawer: {
        overlay: {
            backgroundColor: "rgba(255,0,0,0)"
        }
    },
    bar: {
        textAlign: "center",
    },
    menuItem: {
        fontSize: 13,
        lineHeight:"32px",
        minHeight:12
    },
    menu: {
        marginTop:15
    }
}

export default @observer class App extends React.Component {
    @observable data = {
        tableNames:[]
    }

    constructor(props){
        super(props)
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.state = {
            drawer: {
                open: false
            },
            container: {
                marginLeft: 0
            }
        }
    }

    componentDidMount(){
        axios.get("/api/database/")
            .then(response => {
                this.data.databaseName = response.data.database
                this.forceUpdate()
        })

        axios.get("/api/tables/")
            .then(response => {
                this.data.tableNames = response.data
                this.forceUpdate()
        })

    }

    handleDrawerToggle(){
        this.setState({
            drawer: {
                open: !this.state.drawer.open
            }
        })
    }

    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
        }
        if (this.state.drawer.open)
          contentStyle.marginLeft = 290;

        return(
         <div>
            <AppBar
             style= { style.bar }
             title="Database Management System"
             onLeftIconButtonTouchTap={ this.handleDrawerToggle } />

            <Drawer
             open={ this.state.drawer.open }
             docked={ false }
             onRequestChange={(open) => this.setState({drawer:{open}}) }
             zDepth={ 1 }
             overlayStyle ={ style.drawer.overlay }>

                <AppBar
                 title={ this.data.databaseName }
                 showMenuIconButton={ false } />
                <div style={ style.menu }>
                {this.data.tableNames.map( (tableName, index) => (
                    <MenuItem key={index} style={ style.menuItem } innerDivStyle={ style.menuItem }>
                        { tableName }
                    </MenuItem>
                ))}
                </div>
            </Drawer>

            <div style={ contentStyle }>
                <h2>{ this.data.databaseName }</h2>
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                    </TableBody>
              </Table>
            </div>

        </div>
         )
    }
}
