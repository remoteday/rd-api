import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDTO {
    @ApiProperty()
    readonly name: string;
}

export class UpdateTeamDTO {
    @ApiProperty()
    readonly name: string;
}