import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Criar nova mensagem (opcional, WebSocket é principal)
  @Post()
  create(
    @Body() body: { senderId: string; conversationId: string; content: string },
  ) {
    return this.messagesService.createMessage(
      body.senderId,
      body.conversationId,
      body.content,
    );
  }

  // Buscar mensagens de uma conversa
  @Get('conversation/:conversationId')
  findByConversation(@Param('conversationId') conversationId: string) {
    return this.messagesService.findByConversation(conversationId);
  }

  // Buscar mensagem específica
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
