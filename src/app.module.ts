import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './common/database/database.module';
import { TeamModule } from './team/team.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    DatabaseModule,
    RoomModule,
    HealthModule,
    TeamModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
