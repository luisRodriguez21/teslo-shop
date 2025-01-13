import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnectedClients {
  [key: string]: {
    socket: Socket,
    user: User
  };
}

@Injectable()
export class MessagesWsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  private connectedClients: ConnectedClients = {};


  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User is not active');

    this.checkUserConnection(userId);

    this.connectedClients[client.id] = {
      socket: client,
      user
    };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }


  getUserFullName(socketId: string): string {
    return this.connectedClients[socketId].user.fullName;
  }

  private checkUserConnection(userId: string) {
    // Check if the user is connected

    for (const clientId of Object.keys(this.connectedClients)) {
      const connectClient = this.connectedClients[clientId];

      if (connectClient.user.id === userId) {
        connectClient.socket.disconnect();
        break;
      }
    }
  }

} 
