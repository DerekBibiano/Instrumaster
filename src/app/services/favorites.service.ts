import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private firestore: AngularFirestore) {}

  addToFavorites(userId: string, song: any) {
    return this.firestore
    .collection('favorites')
    .doc(userId)
    .collection('songs')
    .doc(song.songId)
    .set({ ...song, addedAt: new Date() })
    .catch((error) => {
      console.error('Error al agregar favorito:', error);
      throw error;
    });
  }

  getFavorites(userId: string) {
    return this.firestore
    .collection('favorites')
    .doc(userId)
    .collection('songs')
    .valueChanges()
  }

  removeFromFavorites(userId: string, songId: string) {
    return this.firestore
    .collection('favorites')
    .doc(userId)
    .collection('songs')
    .doc(songId)
    .delete()
    .catch((error) => {
      console.error('Error al eliminar favorito:', error);
      throw error;
    });
  }
}
