import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './common/database/database.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    DatabaseModule,
    RoomModule,
    TeamModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
