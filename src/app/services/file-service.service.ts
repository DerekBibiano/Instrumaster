import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private storage: AngularFireStorage) {}

  // Método para obtener la lista de archivos
  getFiles(): Observable<{ name: string, url: string }[]> {
    const filesRef = this.storage.ref('canciones');
    return filesRef.listAll().pipe(
      mergeMap(result => from(result.items)),
      mergeMap(item =>
        from(item.getDownloadURL()).pipe(
          map(url => ({ name: item.name, url }))
        )
      ),
      toArray()
    );
  }

  // Método para obtener el contenido de un archivo
  getFileContent(url: string): Observable<string> {
    return from(fetch(url, { mode: 'cors' }).then(response => response.text()));
  }
  
}
