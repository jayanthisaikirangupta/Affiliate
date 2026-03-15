import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateRole(id: string, role: string) {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true },
    });
  }

  async resetPassword(id: string, newPassword: string) {
    await this.findById(id);
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({ where: { id }, data: { passwordHash } });
    return { message: 'Password updated successfully' };
  }

  async remove(id: string, requestingUserId: string) {
    if (id === requestingUserId) {
      throw new ForbiddenException('Cannot delete your own account');
    }
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }

  async getMe(userId: string) {
    return this.findById(userId);
  }
}
