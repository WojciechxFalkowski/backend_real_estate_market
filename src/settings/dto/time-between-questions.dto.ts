import { IsNumber } from 'class-validator';

export class TimeBetweenQuestionsDto {
  @IsNumber()
  timeBetweenQuestions: number
}
