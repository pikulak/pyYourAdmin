import React from 'react'
import axios from 'axios'
import App from './App.jsx'

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }
    componentWillMount(){
        axios.get("/api/user/is_authenticated/")
            .then(response => {
                this.setState({isLoggedIn: response.data.is_authenticated});
            })
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn
        return (
            <div>
                {isLoggedIn ? (
                    <App />
                ) : (
                    null
                )}
            </div>
        )
    }
}
