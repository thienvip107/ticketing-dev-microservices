import { randomBytes } from 'crypto'
import nats from 'node-nats-streaming'
import { TicketCreatedListener } from './events/ticket-created-listener'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

stan.on('connect',async () => {
    console.log('Listener connected to NATS');
    const publisher = new TicketCreatedPublisher(stan)
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        })
    } catch(err) {
        console.error(err);
        
    }
    stan.on('close',  () => {
        console.log('NATS connection closed!');
        process.exit()
    })

    new TicketCreatedListener(stan).listen()
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())