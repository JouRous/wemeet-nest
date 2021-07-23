import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingStatus } from '../common/enums/meeting-status.enum';
import { MeetingRepository } from './meetings.repository';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingRepository)
    private meetingRepository: MeetingRepository,
  ) {}

  async getById(id: string) {
    const meeting = await this.meetingRepository.getById(id, {
      relations: ['participants'],
    });
    return meeting;
  }

  async createMeeting(createMeetingDto: CreateMeetingDto, creator: User) {
    const meeting = this.meetingRepository.create({ ...createMeetingDto });
    const { participantIds } = createMeetingDto;
    meeting.status = MeetingStatus.WAITING;
    meeting.creator = creator;
    meeting.participants = participantIds.map((id) => {
      const user = new User();
      user.id = id;
      return user;
    });

    await this.meetingRepository.save(meeting);

    return await this.getById(meeting.id);
  }

  async updateMeetingStatus(id: string, status: MeetingStatus) {
    const meetingToUpdate = await this.meetingRepository.getById(id);
    meetingToUpdate.status = status;

    await this.meetingRepository.save(meetingToUpdate);
    return meetingToUpdate;
  }

  async updateMeeting(id: string, updateMeetingDto: UpdateMeetingDto) {
    const { participantIds } = updateMeetingDto;
    let meetingToUpdate = await this.meetingRepository.getById(id);

    meetingToUpdate = {
      ...meetingToUpdate,
      ...updateMeetingDto,
      participants: participantIds.map((id) => {
        const participant = new User();
        participant.id = id;
        return participant;
      }),
    };

    await this.meetingRepository.save(meetingToUpdate);

    return await this.getById(meetingToUpdate.id);
  }
}
