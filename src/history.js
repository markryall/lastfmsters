const get = () => {
    return JSON.parse( global.localStorage.getItem( 'history' ) || "[]" );
};

const append = ( command ) => {
    const history = get();
    history.push( command );
    global.localStorage.setItem( 'history', JSON.stringify( history ) );
};

export default { get, append };
