const countdownHandler = ( handler, args ) => {
    let time = parseInt( args.shift() );
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

const helpHandler = ( handler ) => {
    handler.completeCommand( [ "help", "ls" ] );
};

const lsHandler = ( handler ) => {
    handler.completeCommand( "README.md node_modules package.json public src".split(" ") );
};

const commandHandlers = {
    countdown: countdownHandler,
    help: helpHandler,
    ls: lsHandler,
};

export default ( line, handler ) => {
    const args = line.split( " " );
    const command = args.shift();
    const commandHandler = commandHandlers[ command ];
    if ( commandHandler ) {
        setTimeout( () => commandHandler( handler, args ), 0 );
        return;
    }
    setTimeout( () => { handler.completeCommand( [ `Unknown command "${command}"` ] ); }, 0 );
}
