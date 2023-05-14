import { User } from '@app/entities';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Session {
  constructor(userAgent: string, ipAddress: string, user: User, token: string) {
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
    this.user = user;
    this.token = token;
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userAgent: string;
  @Column()
  ipAddress: string;
  @Column({ type: 'text', nullable: true })
  token: string;
  @Column({ default: false })
  isExpired: boolean;
  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt!: Date;
}
