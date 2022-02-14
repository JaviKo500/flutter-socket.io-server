const {io} = require('../index');
// sockets messages
io.on('connection', (client) =>{
    console.log('client connect');
    client.on('disconnect', () => {
        console.log('client desconnect');
    });

    client.on('message', ( payload ) => {
        console.log('message ' + payload.name);
        io.emit( 'message', { admin: 'New message'});
    });
});
