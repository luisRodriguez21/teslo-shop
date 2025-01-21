import { MinLength } from "class-validator";

export class NewMessageDto {
  id?: string;

  @MinLength(1)
  message: string;
}