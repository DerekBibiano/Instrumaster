import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file-service.service';


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

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadFiles();
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

}
