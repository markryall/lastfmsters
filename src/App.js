import React, { Component } from 'react';
import './App.css';

const invokeCommand = ( command, handler ) => {
    const commands = command.split( " " );
    switch( commands[0] ) {
        case "help":
            setTimeout( () => { handler.completeCommand( [ "help", "ls" ] ); }, 0);
            break;
        case "ls":
            setTimeout( () => { handler.completeCommand( [ "README.md    node_modules package.json public       src" ] ) }, 1000);
            break;
        case "countdown":
            let time = parseInt( commands[1] );
            const tick = () => {
                if ( time <= 0 ) {
                    handler.completeCommand( [] );
                } else {
                    handler.appendContent( [ time ] );
                }
                time = time - 1;
                if ( time >= 0 ) setTimeout( tick, 1000 );
            };
            setTimeout( tick, 0 );
            break;
        default:
            setTimeout( () => { handler.completeCommand( [ `Unknown command "${command}"` ] ); }, 0 );
    }
}

class App extends Component {
    state = {
        executingCommand: false,
        content: [],
        command: ''
    }

    reset = () => {
        this.setState( { content: [], executingCommand: false } );
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
        if ( command === 'clear' ) {
            this.reset();
        } else {
            this.appendContent( [ `> ${command}` ] );
            invokeCommand( command, this );
        }
    }

    onChange = ( event ) => {
        this.setState( { command: event.target.value } );
    }

    handleKeyDown = ( event ) => {
        if ( event.key === 'ArrowUp' ) {
            this.setState( { command: 'ls' } );
            event.preventDefault();
        }
        if ( event.key === 'l' && event.ctrlKey ) {
            this.reset();
        }
    }

    handleKeyPress = ( event ) => {
        if ( event.key === 'Enter' ){
            const { command } = this.state;
            this.setState( { command: '', executingCommand: true } );
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
