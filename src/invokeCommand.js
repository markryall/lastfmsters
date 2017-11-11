const commandHandlers = {};

commandHandlers[ 'countdown' ] = ( handler, { args } ) => {
    let time = parseInt( args.shift() || 0 );
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
};

commandHandlers[ 'help' ] = ( handler ) => {
    handler.completeCommand( [
        "countdown <seconds>: counts down seconds",
        "ls: list files",
    ] );
};

commandHandlers[ 'ls' ] = ( handler ) => {
    handler.completeCommand( "README.md node_modules package.json public src".split(" ") );
};

const defaultHandler = ( handler, { command } ) => {
    handler.completeCommand( [ `Unknown command "${command}"` ] );
};

export default ( line, handler ) => {
    const args = line.split( " " );
    const command = args.shift();
    const commandHandler = commandHandlers[ command ] || defaultHandler;
    setTimeout( () => commandHandler( handler, { args, command } ), 0 );
}
