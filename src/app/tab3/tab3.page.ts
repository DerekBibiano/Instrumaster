import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;
  selectedFile!: File | null;
  fileName: string = ''; // Nombre de la canción
  selectedFileName: string = ''; // Para mostrar el nombre del archivo seleccionado

  constructor(private storage: AngularFireStorage) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name; // Actualiza el nombre del archivo seleccionado
    }
  }

  onUploadFile() {
    if (this.selectedFile) {
      if (this.fileName.trim()) {
        this.uploadFile(this.selectedFile, this.fileName);
      } else {
        console.log('Please enter a file name');
      }
    } else {
      console.log('No file selected');
    }
  }

  uploadFile(file: File, name: string) {
    const filePath = `canciones/${name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL$ = url; // URL de descarga
        });
      })
    ).subscribe();
  }
}
