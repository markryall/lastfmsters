import React, { Component } from 'react';
import './App.css';

const max = 40;

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

const newContent = ( previousContent, command ) => {
    if ( command === 'clear' ) return [];
    const content = previousContent.slice(0);
    content.push( `> ${command}` );
    commandResponse( command ).forEach( ( line ) => { content.push( line ); } );
    return content.length > max ? content.slice( content.length - max ) : content;
}

class App extends Component {
    state = {
        content: [],
        command: ''
    }

    onChange = ( event ) => {
        this.setState( { command: event.target.value } );
    }

    handleKeyPress = ( event ) => {
        if ( event.key === 'Enter' ){
            const { content, command } = this.state;
            this.setState( {
                content: newContent( content, command ),
                command: ''
            } );
        }
    }

    componentDidMount() {
        this.nameInput.focus();
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
        const { content } = this.state;
        return (
            <div className="App">
                <div className="App-header">
                    <h2>here you are</h2>
                </div>
                <p className="App-intro">
                    to get started, try the 'help' command
                </p>
                <div>{ content.map( ( line ) => <div>{ line }</div> ) }</div>
                <span id="PS1">&gt; </span>
                <input
                    id="input"
                    ref={(input) => { this.nameInput = input; }} 
                    onKeyUp={this.handleKeyUp}
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
