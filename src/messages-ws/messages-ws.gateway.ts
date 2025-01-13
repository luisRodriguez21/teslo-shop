import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';


@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) { }


  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization as string;
    let payload: JwtPayload;

    try {

      payload = await this.jwtService.verify(token);
      this.messagesWsService.registerClient(client, payload.id);

    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('connected-clients', this.messagesWsService.getConnectedClients
      ());

    //client.join('room-1');
    //this.wss.to('room-1').emit('message-from-server');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('connected-clients', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {


    // ! emite solo al cliente que envió el mensaje
    /*client.emit('message-from-server', {
      fullName: 'Server',
      message: payload.message || 'Empty message'
    }); */

    // ! Emitir a todos menos al cliente inicial
    /* client.broadcast.emit('message-from-server', {
      fullName: 'Server',
      message: payload.message || 'Empty message'
    }); */

    // ! Emitir a todos los clientes conectados
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'Empty message'
    });
  }

}
