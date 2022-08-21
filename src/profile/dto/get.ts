import { PickType } from '@nestjs/mapped-types';

import { EditProfileDto } from './edit';

export class ProfileIdDto extends PickType(EditProfileDto, ['operatorPID']) {}
