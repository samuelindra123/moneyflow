import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly usersService: UsersService) {}

  async getDashboard(username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User '${username}' not found`);
    }

    return {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      age: user.age,
      reason_using: user.reason_using,
      member_since: user.created_at,
    };
  }
}
