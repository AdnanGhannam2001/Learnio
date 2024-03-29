import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { DatabaseModule } from '@database';

@Module({
  imports: [DatabaseModule],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
