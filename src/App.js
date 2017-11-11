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
        const newHistory = ( previousHistory, command ) => {
            if ( command === 'clear' ) return [];
            const history = previousHistory.slice(0);
            history.push( `> ${command}` );
            commandResponse( command ).forEach( ( line ) => { history.push( line ); } );
            return history;
        }
        this.handleKeyPress = ( event ) => {
            if ( event.key === 'Enter' ){
                const { history, command } = this.state;
                this.setState( {
                    history: newHistory( history, command ),
                    command: ''
                } );
            }
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
