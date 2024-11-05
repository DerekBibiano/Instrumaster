import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;
  selectedFile!: File | null;
  fileName: string = ''; // Propiedad para almacenar el nombre del archivo

  constructor(private storage: AngularFireStorage) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
    const filePath = `canciones/${name}`; // Usar el nombre ingresado para la ruta del archivo
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Obtener la URL de descarga una vez que se complete la carga
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL$ = url; // almacenar la URL de descarga
        });
      })
    ).subscribe();
  }
}
