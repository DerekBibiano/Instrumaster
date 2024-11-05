import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  files: { name: string, url: string }[] = [];
  fileContent: string = ''; // Variable para almacenar el contenido del archivo seleccionado

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.fileService.getFiles().subscribe(files => {
      this.files = files;
    });
  }

  loadFileContent(url: string) {
    this.fileService.getFileContent(url).subscribe(content => {
      this.fileContent = content;
    });
  }

}
