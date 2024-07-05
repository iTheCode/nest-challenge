import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { isEmpty } from "class-validator";
import { simpleParser } from "mailparser";
import {
  findUrl,
  getContentFromJsonUrl,
  getContentFromUrl,
} from "../../../../shared/domain/helpers/utils";
import { EasyResDto } from "../../domain/dto/easy/easy-res.dto";
import { JsonMail } from "../../infrastructure/data/entity/json.entity";

@Injectable()
export class ChallengeService {
  constructor() {}

  async easy(body: Object) {
    // Convert the json to instance class.
    const instanceClass = plainToInstance(JsonMail, body);

    //returning the record parsed as requested.
    return plainToInstance(EasyResDto, instanceClass.Records[0]);
  }
  async real(body: any, file?: any) {
    let mailContent;
    if (file?.originalname) {
      // Validate if has file sent and get content.
      mailContent = file.buffer.toString();
    } else {
      // Get content from url.
      mailContent = await getContentFromUrl(body.url);
    }
    // Parsing mail file.
    const eml = await simpleParser(mailContent);
    // Find json file attachments
    const jsonAttachment = eml.attachments.find(
      (attachment: any) => attachment.contentType == "application/json"
    );

    //returning the json found in each case requested.
    return !isEmpty(jsonAttachment)
      ? jsonAttachment.content.toString()
      : await getContentFromJsonUrl(findUrl(eml.text));
  }
}
