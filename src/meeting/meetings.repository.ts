import { NotFoundException } from '@nestjs/common';
import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { Meeting } from './meeting.entity';

@EntityRepository(Meeting)
export class MeetingRepository extends Repository<Meeting> {
  async getById(id: string, options?: FindOneOptions<Meeting>) {
    const meeting = await this.findOne(id, { ...options });
    if (!meeting) {
      throw new NotFoundException();
    }

    return meeting;
  }
}
