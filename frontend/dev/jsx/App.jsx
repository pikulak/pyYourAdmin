import React from 'react'
import axios from 'axios'


import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const style = {
    drawer: {
        overlay: {
            backgroundColor: "rgba(255,0,0,0)"
        }
    },
    bar: {
        textAlign: "center",
    }
}

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.state = {
            drawer: {
                open: false
            },
            container: {
                marginLeft: 0
            },
            data: {
                databaseName: ""
            }
        }
    }
    componentWillMount(){
        axios.get("/api/databases/")
            .then(response => {
                this.setState( {data: {databaseName: response.data.database} } );
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
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
        }

        if (this.state.drawer.open)
          contentStyle.marginLeft = 256;

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
                 title={ this.state.data.databaseName }
                 showMenuIconButton={ false } />

                <MenuItem>Menu item </MenuItem>
            </Drawer>

            <div style={ contentStyle }>
                <h2>{ this.state.data.databaseName }</h2>
            </div>

        </div>
         )
    }
}
