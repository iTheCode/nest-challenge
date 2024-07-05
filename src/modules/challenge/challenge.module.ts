import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChallengeService } from "./application/services/challenge.service";
import { ChallengeController } from "./infrastructure/controllers/challenge.controller";

@Module({
  imports: [ConfigModule],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
