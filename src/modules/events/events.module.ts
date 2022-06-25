import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SessionRefreshToken } from '../auth/entities/session-refresh-tokens.entity';
import { Event } from '../../entities/event.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventsModule {}
