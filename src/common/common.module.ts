import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: 'APP_GUARD', useClass: ApiKeyGuard }],
})
export class CommonModule {}
