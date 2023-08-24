const app = require('./server');
const https = require('https');
const http = require('http');
const fs = require('fs');

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {

    socket.on('join_room', (roomName) => {
        // Rejoindre une salle spécifique en utilisant le nom de la salle (paramètre personnalisé)
        socket.join(roomName);
        console.log(`Client a rejoint la salle : ${roomName}`);

        // Écoute de l'événement lorsque le conducteur partage sa position
        socket.on('position_update', (position) => {
            console.log("Postion on position_update: ", position);
            // Diffuser la mise à jour de position à tous les utilisateurs de confiance
            socket.to(roomName).emit('driver_position_update', position);
        });

        // Écoute de l'événement lorsque le conducteur arrête le partage
        socket.on('stop_sharing', () => {
            // Informer les utilisateurs de confiance que le partage de position a été arrêté
            socket.to(roomName).emit('driver_stopped_sharing');
        });
    });

    socket.on('disconnect', () => {});
});

server.listen(process.env.PORT);