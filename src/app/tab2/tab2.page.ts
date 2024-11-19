import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file-service.service';
import { ToastController } from '@ionic/angular'; // Para notificaciones
import { AuthService } from '../services/auth.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  files: { name: string, url: string }[] = [];
  filteredFiles: { name: string, url: string }[] = [];
  fileContent: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  searchTerm: string = ''; // Término de búsqueda
  userId: string | null = null;

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private toastController: ToastController,
    private favoritesService : FavoritesService
  ) {}

  ngOnInit() {
    this.loadFiles();
    this.authService.getUser().subscribe((user) => {
      this.userId = user?.uid || null;
    });
  }

  loadFiles(event?: any) {
    this.fileService.getFiles(this.currentPage, this.pageSize).subscribe(newFiles => {
      this.files = [...this.files, ...newFiles];
      // Si no hay término de búsqueda, mostramos todos los archivos
      this.filteredFiles = this.searchTerm ? this.filterFiles(this.searchTerm) : this.files;
      this.currentPage++;
      if (event) {
        event.target.complete();
      }
    });
  }

  // Método para filtrar los archivos basados en el término de búsqueda
  filterFiles(searchTerm: string): { name: string, url: string }[] {
    return this.files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro insensible a mayúsculas
    );
  }

  loadFileContent(url: string) {
    this.fileService.getFileContent(url).subscribe(content => {
      this.fileContent = content;
    });
  }

  // Método para actualizar la búsqueda en tiempo real
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    // Si la búsqueda está vacía, mostramos todos los archivos
    this.filteredFiles = this.searchTerm ? this.filterFiles(this.searchTerm) : this.files;
  }

  async addToFavorites(file: { name: string; url: string }) {
    if (!this.userId) {
      this.presentToast('Debes iniciar sesión para agregar favoritos.');
      return;
    }

    const favorite = {
      songId: file.name,
      songName: file.name,
      filePath: file.url,
    };

    try {
      await this.favoritesService.addToFavorites(this.userId, favorite);
      this.presentToast('Canción agregada a favoritos.');
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      this.presentToast('Error al agregar la canción a favoritos.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

}
