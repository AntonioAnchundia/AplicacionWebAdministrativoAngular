import { Injectable } from '@angular/core';
import {HumanResources} from './human-resources';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {
  private dbPath = '/UserReHum';
  humanRef: AngularFireList<HumanResources>; //Referencia a la lista de datos de Recursos Humanos

  constructor(private db: AngularFireDatabase, private auth: Auth, public storage: AngularFireStorage) { 
    this.humanRef = db.list(this.dbPath);
  }

  register(email: any, password: any){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  
  create(file: any, path: string, human: HumanResources){
    //https://github.com/angular/angularfire/blob/master/docs/storage/storage.md -> documentacion del storage
      return new Promise(resolve => {
          //Este proceso es para almacenar la imagen en el storage -> y obtener la url del storage
        const filePath = path + '/' + human.nombre;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file); //se sube el archivo y se guarda en una tarea
        task.snapshotChanges().pipe(
          finalize( () => {
            ref.getDownloadURL().subscribe( res => { //se obtiene la url del storage para ser almacenada en el realtimeDB
              const downloadURL = res;
              resolve(downloadURL);
                //se crea el registro
                this.register(human.correo, human.contraseña)
                .then((userCredential) => {
                  this.db.object(`${this.dbPath}/${userCredential.user.uid}`).set({
                    photo: downloadURL,
                    nombre: human.nombre,
                    apellido: human.apellido,
                    cedula: human.cedula,
                    correo: human.correo,
                    telefono: human.telefono,
                    direccion: human.direccion,
                    contraseña: human.contraseña,
                    repetirContraseña: human.repetirContraseña,
                  });
                }).catch((error) => {
                  console.log(error)
                });
              return;
            });
          })
        ).subscribe();
      });
  }
  getAll(): AngularFireList<HumanResources>{
    return this.humanRef;
  }



  eliminarHumano(key: string): Promise<any> {
    return this.humanRef.remove(key).then();
  }




  update(key: string, value: any): Promise<void>{
    return this.humanRef.update(key, value);
  }

}
