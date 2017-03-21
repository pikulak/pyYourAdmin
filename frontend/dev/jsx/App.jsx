import React from 'react'
import axios from 'axios'
import {observable} from "mobx"
import {observer} from "mobx-react"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import DatabaseTable  from './Table.jsx'

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
            marginLeft: 30
        }
        if (this.state.drawer.open)
          contentStyle.marginLeft = 286;

        return(
         <Router>
            <div>
                <AppBar
                 style= { style.bar }
                 title="pyYourAdmin"
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
                        <Link to={"/tables/" + tableName } key={index}>
                            <MenuItem style={ style.menuItem } innerDivStyle={ style.menuItem }>
                                { tableName }
                            </MenuItem>
                         </Link>
                    ))}
                    </div>
                </Drawer>
                <div style={ contentStyle }>
                    <Route path="/tables/:tableName" component={ DatabaseTable }/>
                </div>
            </div>
         </Router>
         )
    }
}
