import {
  Body,
  Controller,
  Header,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { ChallengeService } from "../../application/services/challenge.service";

@ApiTags("challenge")
@Controller("challenge")
export class ChallengeController {
  constructor(private readonly _challengeService: ChallengeService) {}

  @Post("/easy")
  @Header("content-type", "application/json")
  async easy(@Body() body: Object) {
    return await this._challengeService.easy(body);
  }
  @Post("/real")
  @Header("content-type", "application/json")
  @UseInterceptors(FileInterceptor("file"))
  async real(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return await this._challengeService.real(body, file);
  }
}
