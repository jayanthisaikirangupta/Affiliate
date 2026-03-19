import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';

class ContactSubmissionDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() subject: string;
  @ApiProperty() @IsString() message: string;
}

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form' })
  submit(@Body() dto: ContactSubmissionDto) {
    return this.contactService.submit(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List contact submissions (admin)' })
  findAll() {
    return this.contactService.findAll();
  }
}
