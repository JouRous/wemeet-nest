import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authService.login(loginDto);
    const accessToken = await this.authService.genetateJwtToken(user);

    return {
      user,
      accessToken,
    };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.authService.register(registerDto);
    const accessToken = await this.authService.genetateJwtToken(user);

    return {
      user,
      accessToken,
    };
  }
}
