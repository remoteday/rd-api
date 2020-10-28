import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    RoomModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
