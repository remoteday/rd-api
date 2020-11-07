import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(Team) private readonly teamRepository: Repository<Team>) {}

    findAll(): Promise<Team[]> {
        return this.teamRepository.find();
    }

    findOne(id: number): Promise<Team> {
        return this.teamRepository.findOne(id);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Team>> {
        return paginate<Team>(this.teamRepository, options);
    }
}
