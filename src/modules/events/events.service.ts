import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventsRepository.create(createEventDto);
    return await this.eventsRepository.save(event);
  }

  async findAll() {
    const events = await this.eventsRepository.find();
    return events;
  }

  async findOne(id: string) {
    const events = await this.eventsRepository.find({
      where: {
        id: id,
      },
    });
    return events;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const events = await this.eventsRepository.update(id, updateEventDto);
    return events;
  }

  async remove(id: string) {
    const events = await this.eventsRepository.delete(id);
    return events;
  }
}
