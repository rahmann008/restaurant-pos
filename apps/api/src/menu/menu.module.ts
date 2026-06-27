import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';      // ⭐
import { MenuController } from './menu.controller'; // ⭐

@Module({
  imports: [],
  controllers: [MenuController], // ⭐ IMPORTANT
  providers: [MenuService],      // ⭐ IMPORTANT
})
export class MenuModule {}