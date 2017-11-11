import React, { Component } from 'react';
import './App.css';

const max = 40;

const newHistory = ( previousHistory, command ) => {
    if ( command === 'clear' ) return [];
    const history = previousHistory.slice(0);
    history.push( `> ${command}` );
    commandResponse( command ).forEach( ( line ) => { history.push( line ); } );
    return history.length > max ? history.slice( history.length - max ) : history;
}

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

class App extends Component {
    state = {
        history: [],
        command: ''
    }

    onChange = (event) => {
        this.setState({command: event.target.value});
    }

    handleKeyPress = ( event ) => {
        if ( event.key === 'Enter' ){
            const { history, command } = this.state;
            this.setState( {
                history: newHistory( history, command ),
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
        const history = this.state.history.map( ( entry ) => {
            return (
                <div>{ entry }</div>
            );
        });
    return (
        <div className="App">
            <div className="App-header">
                <h2>here you are</h2>
            </div>
            <p className="App-intro">
                to get started, try the 'help' command
            </p>
            <div>{ history }</div>
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
