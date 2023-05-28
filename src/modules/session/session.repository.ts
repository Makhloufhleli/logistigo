import { Session } from '@app/entities/Session';
import { ISessionsRepository } from '@app/modules/session/session.repository.interface';
import { BaseRepository } from '@app/shared/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SessionRepository extends BaseRepository<Session> implements ISessionsRepository {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource);
  }
  async createSession(session: Session): Promise<Session> {
    return this.save(session);
  }
  async updateSession(id: number, refreshToken: string): Promise<Session> {
    const queryBuilder = this.createQueryBuilder('session');
    await queryBuilder
      .update()
      .set({
        token: refreshToken,
        isExpired: false,
      })
      .where('session.id = :id', { id })
      .execute();
    return await queryBuilder.where('session.id = :id', { id }).getOne();
  }
  async getSessionByUserIdAndUserAgent(userId: number, userAgent: string): Promise<Session> {
    return await this.createQueryBuilder('session')
      .leftJoinAndSelect('session.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('session.userAgent = :userAgent', { userAgent })
      .getOne();
  }
  async expireSession(id: number): Promise<boolean> {
    return (
      (
        await this.createQueryBuilder('session')
          .update()
          .set({ isExpired: true })
          .where('session.id = :id', { id })
          .execute()
      ).affected > 0
    );
  }
  async isAlreadyHaveSession(userId: number, userAgent: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('session')
        .leftJoinAndSelect('session.user', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('session.userAgent = :userAgent', { userAgent })
        .getCount()) > 0
    );
  }
  async isValidSession(userId: number, userAgent: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('session')
        .leftJoinAndSelect('session.user', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('session.userAgent = :userAgent', { userAgent })
        .andWhere('session.isExpired = :isExpired', { isExpired: false })
        .getCount()) > 0
    );
  }
  async expireSessionByUserAgent(userId: number, userAgent: string): Promise<boolean> {
    return (
      (
        await this.createQueryBuilder('session')
          .leftJoinAndSelect('session.user', 'user')
          .where('user.id = :id', { id: userId })
          .andWhere('session.userAgent = :userAgent', { userAgent })
          .update()
          .set({ isExpired: true })
          .execute()
      ).affected > 0
    );
  }
  async expireSessionById(idSession: number): Promise<boolean> {
    return (
      (
        await this.createQueryBuilder('session')
          .delete()
          .where('session.id = :id', { id: idSession })
          .execute()
      ).affected > 0
    );
  }
}
