import React, { Component } from 'react';
import './App.css';

const commandResponse = ( command ) => {
    switch( command ) {
        case "help":
            return ["help", "ls"];
        case "ls":
            return [ "README.md    node_modules package.json public       src" ];
        default:
            return [ `Unknown command "${command}"` ];
    }
}

const handleCommand = ( command, component ) => {
    if ( command === 'clear' ) {
        component.reset();
    } else {
        component.appendContent( [ `> ${command}` ] );
        setTimeout( () => { component.appendContent( commandResponse( command ) ) }, 1000 );
    }
}

class App extends Component {
    state = {
        content: [],
        command: ''
    }

    reset = () => {
        this.setState( { content: [] } );
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

    onChange = ( event ) => {
        this.setState( { command: event.target.value } );
    }

    handleKeyPress = ( event ) => {
        if ( event.key === 'Enter' ){
            const { content, command } = this.state;
            this.setState( { command: '' } );
            handleCommand( command, this );
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
        const { command, content } = this.state;
        return (
            <div className="App">
                <div className="App-header">
                    <h2>here you are</h2>
                </div>
                <p className="App-intro">
                    to get started, try the 'help' command
                </p>
                <div>{ content.map( ( line, index ) => <div key={ index }>{ line }</div> ) }</div>
                <span id="PS1">&gt; </span>
                <input
                    id="input"
                    ref={ (input) => { this.nameInput = input; } } 
                    onKeyUp={ this.handleKeyUp }
                    onKeyPress={ this.handleKeyPress }
                    onChange={ this.onChange }
                    value={ command }
                    type="text"
                    className="cmdline"
                    autoComplete="off"
                />
            </div>
        );
    }
}

export default App;
