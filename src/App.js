import React, { Component } from 'react';
import './App.css';
import invokeCommand from './invokeCommand';

class App extends Component {
    state = {
        executingCommand: false,
        content: [],
        command: '',
        history: [],
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
        const { history } = this.state;
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
            const { command, history } = this.state;
            const newHistory = history.slice(0);
            newHistory.push( command );
            this.setState( { command: '', executingCommand: true, history: newHistory, offset: 0 } );
            this.handleCommand( command );
        }
    }

    componentDidMount() {
        this.nameInput.focus();
        global.component = this;
        /* axios.get(
         *     "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying=true&user=mryall&api_key=21f8c75ad38637220b20a03ad61219a4&format=json&limit=50&extended=1"
         * ).then(
         *     (result) => {
         *         result.data.recenttracks.track.map(
         *             (track) => {
         *                 console.log(track.name)
         *                 track.image.map(
         *                     (image) => {
         *                         console.log(`  ${image['#text']} (${image.size})`)
         *                     }
         *                 );
         *             }
         *         );
         *     }
         * );*/
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
