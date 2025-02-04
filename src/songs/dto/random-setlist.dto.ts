import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, Length, IsBoolean, IsJSON, IsArray } from 'class-validator';
import { User } from 'src/user/user.entity';
import { TomEnum } from '../enum/tom-enum';

export class RandomSetlistDTO {
    @IsNotEmpty({ message: `infome o tom da musica!` })
    tonality: TomEnum;

    @IsOptional()
    @Type(() => User)
    user?: User;

    amountSongs: number;
}