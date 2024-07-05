import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RealRestDto {
  @Expose()
  nombre: string;
}
