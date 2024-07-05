import { Exclude, Expose, Transform } from "class-transformer";

const mailName = (mail: string): string => {
  return mail.split("@")[0] || "";
};

@Exclude()
export class EasyResDto {
  @Expose()
  @Transform(({ obj }) =>
    obj.ses.receipt.spamVerdict.status == "PASS" ? true : false
  )
  spam: boolean;

  @Expose()
  @Transform(({ obj }) =>
    obj.ses.receipt.virusVerdict.status == "PASS" ? true : false
  )
  virus: boolean;

  @Expose()
  @Transform(({ obj }) =>
    obj.ses.receipt.spfVerdict.status == "PASS" &&
    obj.ses.receipt.dkimVerdict.status == "PASS" &&
    obj.ses.receipt.dmarcVerdict.status == "PASS"
      ? true
      : false
  )
  dns: boolean;

  @Expose()
  @Transform(({ obj }) =>
    new Date(obj.ses.mail.timestamp).toLocaleString("default", {
      month: "long",
    })
  )
  mes: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.ses.receipt.processingTimeMillis > 1000 ? true : false
  )
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }) => mailName(obj.ses.mail.source))
  emisor: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.ses.mail.destination.map((dest: string) => mailName(dest))
  )
  receptor: string[];
}
