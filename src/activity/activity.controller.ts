import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivityService } from './activity.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async createActivity(
    @Body() body: { latitude: number; longitude: number; timestamp: string }, // Menangani data GPS dan timestamp
    @UploadedFile() file: Express.Multer.File, // Menangani file foto yang diupload
  ) {
    try {
      const { latitude, longitude, timestamp } = body;
      const photoPath = file ? file.filename : null;

      // Simpan data ke database menggunakan ActivityService
      const result = await this.activityService.saveActivity({
        latitude,
        longitude,
        timestamp,
        photoPath,
      });

      return { message: 'Data berhasil diterima', data: result };
    } catch (error) {
      console.error('Error saat menerima data:', error);
      return { message: 'Gagal menyimpan data', error: error.message };
    }
  }
}
