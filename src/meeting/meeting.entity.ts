import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MeetingStatus } from '../common/enums/meeting-status.enum';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: MeetingStatus;

  @ManyToOne(() => User, (user) => user.meetings)
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}
