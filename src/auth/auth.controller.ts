import {
	Get,
	Body,
	Post,
	Request,
	HttpCode,
	HttpStatus,
	UseGuards,
	Controller
} from '@nestjs/common';
import {
	ApiTags,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; // Ensure this is your JWT guard

// Add this interface
interface RequestWithUser extends Request {
	user: any;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'User login' })
	@ApiResponse({ status: 200, description: 'Successfully logged in' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				username: { type: 'string', example: 'username' },
				password: { type: 'string', example: 'password' },
			},
		},
	})
	@Post('login')
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@ApiBearerAuth() // Add this line to secure the endpoint with Bearer token
	@ApiOperation({ summary: 'Get user profile' })
	@ApiResponse({ status: 200, description: 'Successfully retrieved user profile' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@UseGuards(AuthGuard) // Ensure this is your JWT guard
	@Get('profile')
	getProfile(@Request() req: RequestWithUser) {
		return req.user;
	}
}
