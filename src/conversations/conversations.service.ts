import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async createConversation(createConversationDto: CreateConversationDto) {
    const { name, userIds } = createConversationDto;
    return this.prisma.conversation.create({
      data: {
        name,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
      include: {
        users: true,
      },
    });
  }

  async findByConversationId(conversationId: string) {
    return this.prisma.conversation.findMany({
      where: { id: conversationId },
      include: {
        users: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
