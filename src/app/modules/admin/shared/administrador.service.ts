import { Injectable } from '@angular/core';
import { Administrador } from './administrador';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class AdministradorService {
  private dbPath = '/UserAdmin'; //Ruta de la bd
  adminsRef: AngularFireList<Administrador>; //Referencia a la lista de datos del administrador
  adminRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {
    this.adminsRef = db.list(this.dbPath);
  }

  // Metodo de Agregar Administrador BD
  addAdmin(admin: Administrador){
    this.adminsRef.push({
      nombre: admin.nombre,
      apellido: admin.apellido,
      cedula: admin.cedula,
      correo: admin.correo,
      telefono: admin.telefono,
      direccion: admin.direccion,
      contraseña: admin.contraseña,
      repetirContraseña: admin.repetirContraseña,
    }).catch((error) =>{
      console.log(error);
    })
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

  UpdateAdmin(id: any, admin: Administrador) {
    this.adminRef.update({
        nombre: admin.nombre,
        apellido: admin.apellido,
        cedula: admin.cedula,
        correo: admin.correo,
        telefono: admin.telefono,
        direccion: admin.direccion,
        contraseña: admin.contraseña,
        repetirContraseña: admin.repetirContraseña,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // deleteAdmin(key: string){
  //   this.adminRef = this.db.object('UserAdmin/' + key);
  //   this.adminRef.remove().catch((error => {
  //     console.log(error);
  //   }))
  // }
}
