import { Injectable } from '@nestjs/common';
import db from '../knexfile';  // Impor file knexfile yang telah dibuat

@Injectable()
export class ActivityService {
  // Simpan data aktivitas (GPS dan foto) ke database
  async saveActivity(data: { latitude: number; longitude: number; timestamp: string; photoPath: string }) {
    try {
      const [insertedId] = await db('activities').insert({
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
        photo_path: data.photoPath,
      }).returning('id'); // Mengembalikan id yang disisipkan

      return { id: insertedId, message: 'Data berhasil disimpan' };
    } catch (error) {
      console.error('Error saat menyimpan data ke database:', error);
      throw new Error('Gagal menyimpan data');
    }
  }
}
