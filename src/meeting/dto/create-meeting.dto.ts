import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsArray()
  participantIds: string[];
}
