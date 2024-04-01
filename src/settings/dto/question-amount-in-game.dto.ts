import { IsNumber } from 'class-validator';

export class QuestionAmountInGameDto {
  @IsNumber()
  questionAmountInGame: number
}
