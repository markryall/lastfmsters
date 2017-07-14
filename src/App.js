import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            command: ''
        };
        this.onChange = (event) => {
            this.setState({command: event.target.value});
        }
        this.handleKeyPress = (event) => {
            if(event.key === 'Enter'){
                console.log('enter press here! ')
            }
        }
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render() {
    return (
        <div className="App">
            <div className="App-header">
                <h2>Lastfmsters</h2>
            </div>
            <p className="App-intro">
                To get started, try the 'help' command
            </p>
            <span id="PS1">&gt; </span>
            <input
                id="input"
                ref={(input) => { this.nameInput = input; }} 
                onKeyPress={this.handleKeyPress}
                onChange={this.onChange}
                value={ this.state.command }
                type="text"
                className="cmdline"
                autoComplete="off"
            />
        </div>
    );
  }
}

export default App;
