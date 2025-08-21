import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { MessagesService } from './messages.service';


@WebSocketGateway({
  cors: {
    credentials: true,
  },
})
export class MessagesGateway implements OnGatewayConnection {
  constructor(private messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
    } catch (error) {
      client.disconnect(true);
    }
  }

  @SubscribeMessage('message.create')
  async handleMessageCreate(client: Socket, payload: { conversationId: string, content: string }) {
    const message = await this.messagesService.createMessage(
      client.data.user.id,
      payload.conversationId,
      payload.content,
    );
    client.to(payload.conversationId).emit('message.create', message);

    return message;
  }
}
