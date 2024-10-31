import { Component}  from '@angular/core';
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
  selectedFile!: File | null; // Variable to store the selected file

  constructor(private storage: AngularFireStorage) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUploadFile(){
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    } else {
      console.log('No file selected');
    }
  }

  uploadFile(file: File) {
    const filePath = `canciones/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    // Get the download URL once the upload is complete
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          console.log('File URL:', url);
          this.downloadURL$ = url; // store the download URL
        });
      })
    ).subscribe();
  }

}
