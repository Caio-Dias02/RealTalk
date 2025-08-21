import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(userId: string, conversationId: string, content: string) {
    return this.prisma.message.create({
      data: {
        content,
        senderId: userId,
        conversationId,
      },
      include: {
        sender: true,
        conversation: true,
      },
    });
  }

  // Buscar mensagens de uma conversa
  async findByConversation(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Buscar mensagem específica
  async findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
      include: { sender: true, conversation: true },
    });
  }
}
