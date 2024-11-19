import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FavoritesService } from '../services/favorites.service';
import { FileService } from '../services/file-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor( 
    private favoritesService: FavoritesService, 
    private authService: AuthService, 
    private router: Router, 
    private firestore : AngularFirestore,
    private fileService : FileService  
  ) {}
  
  favoriteSongs: { songName: string; filePath: string }[] = [];
  fileContent: string = '';
  searchTerm: string = '';
  userId: string | null = null;

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.userId = user?.uid || null;
      if (this.userId) {
        this.loadFavorites();
      }
    });
  }

  loadFavorites() {
    if (!this.userId) return;

    this.favoritesService.getFavorites(this.userId).subscribe((songs) => {
      this.favoriteSongs = songs as { songName: string; filePath: string }[];
    });
  }

  loadFileContent(url: string) {
    this.fileService.getFileContent(url).subscribe(content => {
      this.fileContent = content;
    });
  }
  async logOut() {
    try {
      localStorage.clear();
      await this.authService.logout();
      this.router.navigateByUrl('/auth');
    } catch (err) {
      console.log(err);
    }
  }
}
