import React from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import App from './App.jsx'

const style = {
    row: {
        marginTop: "20vh",
    },
    buttonDiv: {
        marginTop: 20,
        float: "right"
    }
}

export default class ConnectForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this)
        this.listenEnterKeyPress = this.listenEnterKeyPress.bind(this)
    }

    componentWillMount(){
        document.addEventListener("keypress", this.listenEnterKeyPress, false)
    }

    componentWillUnmount(){
        document.removeEventListener("keypress", this.listenEnterKeyPress, false)
    }


    handleTouchTap(){
        const database_props = {
            host: this.refs.host.getValue(),
            port: this.refs.port.getValue(),
            database: this.refs.database.getValue(),
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        }
        console.log(database_props)
        axios.post("/api/database/connect/", database_props)
            .then(response => {
                const status = response.data.status
                if (status == "success")
                    window.location.reload()
            })
    }

    listenEnterKeyPress(event){
        if (event.keyCode == 13)
            this.handleTouchTap()
    }

    render(){
        return(
            <Grid>
                <Row style={ style.row } >
                    <Col md={6} lg={6} xs={12} lgOffset={3} mdOffset={3}>
                        <h1> Connect </h1>
                         <TextField
                          ref="host"
                          floatingLabelText="Host"
                          fullWidth={ true }/> <br />

                         <TextField
                          ref="port"
                          floatingLabelText="Port"
                          fullWidth={ true }/> <br />

                         <TextField
                          ref="database"
                          floatingLabelText="Database name"
                          fullWidth={ true }/> <br />

                         <TextField
                          ref="username"
                          floatingLabelText="Username"
                          fullWidth={ true }/> <br />

                         <TextField
                          ref="password"
                          floatingLabelText="Password"
                          type="password"
                          fullWidth={ true } /> <br />

                           <div style={ style.buttonDiv }>
                                <RaisedButton
                                 label="Zaloguj się"
                                 primary={true}
                                 onTouchTap={this.handleTouchTap}/>
                           </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
