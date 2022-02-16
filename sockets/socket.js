const {io} = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Heroes del silencio'));

// sockets messages
io.on('connection', (client) =>{
    console.log('client connect');
    client.emit('active-bands', bands.getBands());
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('disconnect', () => {
        console.log('client desconnect');
    });

    client.on('message', ( payload ) => {
        console.log('message ' + payload.name);
        io.emit( 'message', { admin: 'New message'});
    });

    client.on('emit-message', (payload) => {
        client.broadcast.emit('new-message', payload); // all except one emit
        // io.emit('new-message', payload); //emit all
    });
});
