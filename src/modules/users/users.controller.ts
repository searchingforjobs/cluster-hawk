import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdentity } from '../auth/decorators/user-identity.decorator';
import { UpdateUserUsernameDto } from './dto/update-user-username.dto';
import { IUserIdentity, UserStatus } from './interfaces';
import { AuthRequired } from '../auth/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';

//TODO: admin required
//TODO: filter readable data fields
//TODO: implement pagination
//TODO: implement sort
//TODO: implement filtering
//TODO: api documenting
//TODO: service implementation
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users list' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number, optional, 1 by default',
    required: false,
  })
  @ApiQuery({
    name: 'items',
    type: Number,
    description: 'Items amount, optional, 10 by default',
    required: false,
  })
  @ApiQuery({
    name: 'query',
    type: String,
    description: 'Search query, optional',
    required: false,
  })
  @Get('/?')
  findAll(
    @Query('page') page?: number,
    @Query('items') items?: number,
    @Query('query') searchQuery?: string,
  ) {
    return this.usersService.findAll(
      page,
      items,
      searchQuery,
      UserStatus.ACTIVE,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async findOne(@Param('id') id: string) {
    return new UserDto(await this.usersService.findOne(id));
  }

  @Patch('/email')
  @AuthRequired()
  @UsePipes(ValidationPipe)
  updateEmail(
    @Body() updateUserEmailDto: UpdateUserEmailDto,
    @UserIdentity() userIdentity: IUserIdentity,
  ) {
    return this.usersService.updateEmail(updateUserEmailDto, userIdentity.id);
  }

  @Patch('/username')
  @AuthRequired()
  @UsePipes(ValidationPipe)
  updateUsername(
    @Body() updateUserUsernameDto: UpdateUserUsernameDto,
    @UserIdentity() userIdentity: IUserIdentity,
  ) {
    return this.usersService.updateUsername(
      updateUserUsernameDto,
      userIdentity.id,
    );
  }

  @Patch('password')
  @AuthRequired()
  @UsePipes(ValidationPipe)
  updatePassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @UserIdentity() userIdentity: IUserIdentity,
  ) {
    return this.usersService.updatePassword(
      updateUserPasswordDto,
      userIdentity.id,
    );
  }

  @Patch()
  @AuthRequired()
  @UsePipes(ValidationPipe)
  update(
    @Body() updateUserDto: UpdateUserDto,
    @UserIdentity() userIdentity: IUserIdentity,
  ) {
    return this.usersService.update(updateUserDto, userIdentity.id);
  }

  @Delete()
  @AuthRequired()
  remove(@UserIdentity() userIdentity: IUserIdentity) {
    return this.usersService.remove(userIdentity.id);
  }
}
