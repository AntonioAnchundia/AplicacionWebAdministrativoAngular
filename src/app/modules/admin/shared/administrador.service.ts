import { Injectable } from '@angular/core';
import { Administrador } from './administrador';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class AdministradorService {
  private dbPath = '/UserAdmin';
  adminsRef: AngularFireList<Administrador>; //Referencia a la lista de datos del administrador

  constructor(private db: AngularFireDatabase) {
    this.adminsRef = db.list(this.dbPath);
  }

  // Create admin
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

  getAll(): AngularFireList<Administrador>{
    return this.adminsRef;
  }

  Delete(key: string): Promise<void> {
    return this.adminsRef.remove(key);
  }

  update(key: string, value: any): Promise<void>{
    return this.adminsRef.update(key, value);
  }
}
