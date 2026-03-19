import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

export interface CreateContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async submit(dto: CreateContactDto) {
    await this.prisma.contactSubmission.create({ data: dto });
    return { message: 'Your message has been received. We will be in touch within 2 business days.' };
  }

  async findAll() {
    return this.prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
