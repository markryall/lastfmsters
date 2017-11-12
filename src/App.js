import React, { Component } from 'react';
import './App.css';
import invokeCommand from './invokeCommand';
import historyStore from './history';

class App extends Component {
    state = {
        executingCommand: false,
        content: [],
        command: '',
        offset: 0,
    }

    reset = () => {
        this.setState( { content: [], executingCommand: false } );
        this.nameInput.focus();
    }

    appendContent = ( newContent ) => {
        const max = 40;
        let content = this.state.content.slice(0);
        newContent.forEach( ( line ) => { content.push( line ); } );
        if ( content.length > max ) {
            content = content.slice( content.length - max );
        }
        this.setState( { content } );
    }

    completeCommand = ( newContent ) => {
        this.appendContent( newContent );
        this.setState( { executingCommand: false } );
        this.nameInput.focus();
    }

    handleCommand = ( command ) => {
        this.appendContent( [ `> ${command}` ] );
        invokeCommand( command, this );
    }

    onChange = ( event ) => {
        this.setState( { command: event.target.value } );
    }

    switchCommand = ( offset ) => {
        if ( offset === 0 ) {
            this.setState( { command: '', offset: 0 } );
            return;
        }
        const history = historyStore.get();
        const command = history[ history.length - offset ];
        const state = {}
        if ( command ) state[ 'command' ] = command;
        if ( offset > 0 && offset <= history.length ) state[ 'offset' ] = offset;
        this.setState( state );
    }

    handleKeyDown = ( event ) => {
        const { offset } = this.state;
        if ( event.key === 'ArrowUp' ) {
            this.switchCommand( offset + 1 );
            event.preventDefault();
        }
        if ( event.key === 'ArrowDown' ) {
            this.switchCommand( offset - 1 );
            event.preventDefault();
        }
        if ( event.key === 'l' && event.ctrlKey ) {
            this.reset();
        }
    }

    handleKeyPress = ( event ) => {
        if ( event.key === 'Enter' ){
            const { command } = this.state;
            historyStore.append( command );
            this.setState( { command: '', executingCommand: true, offset: 0 } );
            this.handleCommand( command );
        }
    }

    componentDidMount() {
        this.nameInput.focus();
        global.component = this;
    }

    render() {
        const { command, content, executingCommand } = this.state;
        const prompt = (
            <div>
                <span id="PS1">&gt; </span>
                <input
                    id="input"
                    ref={ (input) => { this.nameInput = input; } }
                    onKeyDown={ this.handleKeyDown }
                    onKeyPress={ this.handleKeyPress }
                    onChange={ this.onChange }
                    value={ command }
                    type="text"
                    className="cmdline"
                    autoComplete="off"
                />
            </div>
        );
        return (
            <div className="App">
                <div className="App-header">
                    <h2>here you are</h2>
                </div>
                <p className="App-intro">
                    to get started, try the 'help' command
                </p>
                <div>{ content.map( ( line, index ) => <div key={ index }>{ line }</div> ) }</div>
                { ! executingCommand && prompt }
            </div>
        );
    }
}

export default App;
