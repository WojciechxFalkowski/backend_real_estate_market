import { IsBoolean } from 'class-validator';

export class TrackTimeDto {
  @IsBoolean()
  isTimeTrack: boolean
}
