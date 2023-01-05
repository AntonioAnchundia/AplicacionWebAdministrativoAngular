import { Injectable } from '@angular/core';
import { Department } from './department';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private dbPath = '/departamento';

  departmentRef : AngularFireList<Department>; //Referencia a la lista de datos del departamento

  constructor(private db: AngularFireDatabase, public storage: AngularFireStorage) { 
    this.departmentRef = db.list(this.dbPath);
  }

  create(file: any, path: string,departamento: Department){
    //https://github.com/angular/angularfire/blob/master/docs/storage/storage.md -> documentacion del storage
      return new Promise(resolve => {
          //Este proceso es para almacenar la imagen en el storage -> y obtener la url del storage
        const filePath = path + '/' + departamento.nombre;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file); //se sube el archivo y se guarda en una tarea
        task.snapshotChanges().pipe(
          finalize( () => {
            ref.getDownloadURL().subscribe( res => { //se obtiene la url del storage para ser almacenada en el realtimeDB
              const downloadURL = res;
              resolve(downloadURL);
                //se crea el registro
              this.departmentRef.push({ 
                photo: downloadURL, 
                nombre: departamento.nombre,
                codigoDepa: departamento.codigoDepa,
                numeroPersonal: departamento.numeroPersonal, 
                linkReunion: departamento.linkReunion 
                })
              return;
            });
          })
        ).subscribe();
      });
  }

  getAll(): AngularFireList<Department>{
    return this.departmentRef;
  }

  update(key: string, value: any): Promise<void>{
    return this.departmentRef.update(key, value);
  }

  delete(key: string): Promise<void>{
    return this.departmentRef.remove(key);      
  }
}