import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesGateway } from './messages/messages.gateway';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ConversationsModule],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
