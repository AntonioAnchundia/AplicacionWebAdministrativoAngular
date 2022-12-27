import { Injectable } from '@angular/core';
import { Administrador } from './administrador';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AdministradorService {
  private dbPath = '/UserAdmin'; //Ruta de la bd
  adminsRef: AngularFireList<Administrador>; //Referencia a la lista de datos del administrador
  adminRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private auth: Auth, public storage: AngularFireStorage) {
    this.adminsRef = db.list(this.dbPath);
  }

  // Metodo de registro del authentication
  register(email: any, password: any){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  // Registro del campo de Firebase, authentication y storage
  create(file: any, path: string, admin: Administrador){
    //https://github.com/angular/angularfire/blob/master/docs/storage/storage.md -> documentacion del storage
      return new Promise(resolve => {
          //Este proceso es para almacenar la imagen en el storage -> y obtener la url del storage
        const filePath = path + '/' + admin.nombre;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file); //se sube el archivo y se guarda en una tarea
        task.snapshotChanges().pipe(
          finalize( () => {
            ref.getDownloadURL().subscribe( res => { //se obtiene la url del storage para ser almacenada en el realtimeDB
              const downloadURL = res;
              resolve(downloadURL);
                //se crea el registro
                this.register(admin.correo, admin.contraseña)
                .then((userCredential) => {
                  this.db.object(`${this.dbPath}/${userCredential.user.uid}`).set({
                    photo: downloadURL,
                    nombre: admin.nombre,
                    apellido: admin.apellido,
                    cedula: admin.cedula,
                    correo: admin.correo,
                    telefono: admin.telefono,
                    direccion: admin.direccion,
                    contraseña: admin.contraseña,
                    repetirContraseña: admin.repetirContraseña,
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

  // Metodo para obtener los datos
  getAll(): AngularFireList<Administrador>{
    return this.adminsRef;
  }

  // Metodo de eliminar 
  delete(key: string): Promise<void> {
    return this.adminsRef.remove(key);
  }

  // Metodo de Actualizar
  update(key: string, value: any): Promise<void>{
    return this.adminsRef.update(key, value);
  }

}