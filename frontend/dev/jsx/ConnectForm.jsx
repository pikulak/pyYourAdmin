import React from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import App from './App.jsx'

const style = {
    paper: {
        height: 200
    }
}
export default class ConnectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    //componentWillMount(){
     //   axios.get("/api/user/is_authenticated/")
     //       .then(response => {
      //          this.setState({isLoggedIn: response.data.is_authenticated});
       //     })
  //  }


    render(){
        return(
        <Grid>
            <Row>
                <Col md={6}>
                    <Paper zDepth={1} style={ style.paper } />
                 </Col>
            </Row>
        </Grid>
    )}
}
