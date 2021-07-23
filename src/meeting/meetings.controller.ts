import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingStatus } from '../common/enums/meeting-status.enum';
import { MeetingService } from './meetings.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleType } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('meetings')
@UseGuards(AuthGuard())
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.meetingService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleType.LEADER)
  @Post()
  async createMeeting(
    @Body() createMeetingDto: CreateMeetingDto,
    @GetUser() user: User,
  ) {
    return this.meetingService.createMeeting(createMeetingDto, user);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @Put('/:id/status')
  async updateMeetingStatus(
    @Param('id') id: string,
    @Body('status') status: MeetingStatus,
  ) {
    return this.meetingService.updateMeetingStatus(id, status);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleType.LEADER)
  @Put('/:id')
  async updateMeetingParticipants(
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingService.updateMeeting(id, updateMeetingDto);
  }
}
