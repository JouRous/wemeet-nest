import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MeetingController } from './meetings.controller';
import { MeetingRepository } from './meetings.repository';
import { MeetingService } from './meetings.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingRepository]), AuthModule],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
