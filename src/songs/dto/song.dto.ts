import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, Length, IsBoolean, IsJSON, IsArray } from 'class-validator';
import { User } from 'src/user/user.entity';
import { TomEnum } from '../enum/tom-enum';

export class SongDTO {
    @IsOptional()
    id?: string;

    @IsNotEmpty({ message: `infome o titulo!` })
    @IsString({ message: `o titulo deve ser de tipo textual!` })
    @Length(3, 100)
    title: string;

    @IsNotEmpty({ message: `infome o tom da musica!` })
    @IsString({ message: `o tom deve ser de tipo textual!` })
    @Length(3, 100)
    tonality: TomEnum;

    @IsOptional()
    @Type(() => User)
    user?: User;
}