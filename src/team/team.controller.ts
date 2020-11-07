import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { NotFoundInterceptor } from '../common/interceptors/not-found.interceptor';
import { CreateTeamDTO } from './team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
@ApiTags('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get('')
    @ApiQuery({name: 'page', type: 'number'})
    @ApiQuery({name: 'limit', type: 'number'})
    list(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ): Promise<Pagination<Team>> {
        return this.teamService.paginate({
            page, limit
        })
    }

    @Get(':id')
    @ApiParam({name: 'id'})
    @UseInterceptors(NotFoundInterceptor)
    @ApiOkResponse({type: Team})
    findOne(@Param('id') id) {
        return this.teamService.getOne(id);
    }

    @Post()
    create(@Body() createDto: CreateTeamDTO) {
        return this.teamService.create(createDto)
    }

    @Delete(':id')
    @ApiParam({name: 'id'})
    @ApiNoContentResponse()
    @HttpCode(204)
    delete(@Param('id') id) {
        return this.teamService.delete(id);
    }
}
