import { Body, Controller, HttpCode, HttpStatus, Post, Redirect } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}
    
    @Post("signup")
    @Redirect("/user/create")
    async signup() {}

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    async signin(@Body() dto: AuthDto) {
        return this.service.signin(dto);
    }
}
