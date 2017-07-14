import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            history: [],
            command: ''
        };
        this.onChange = (event) => {
            this.setState({command: event.target.value});
        }
        this.handleKeyPress = (event) => {
            if(event.key === 'Enter'){
                const history = this.state.history.slice(0);
                history.push({
                    command: `> ${this.state.command}`,
                    response: this.state.command
                });
                this.setState({
                    history: history,
                    command: ''
                });
            }
        }
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render() {
        const history = this.state.history.map((entry, index) => {
            return (
                <div>
                    <div>{ entry.command }</div>
                    <div>{ entry.response }</div>
                </div>
            );
        });
    return (
        <div className="App">
            <div className="App-header">
                <h2>Lastfmsters</h2>
            </div>
            <p className="App-intro">
                To get started, try the 'help' command
            </p>
            <div>{ history }</div>
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
