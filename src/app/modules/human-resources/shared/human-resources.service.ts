import { Injectable } from '@angular/core';
import {HumanResources} from './human-resources';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';




@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {
  private dbPath = '/UserReHum';
  humanRef: AngularFireList<HumanResources>; //Referencia a la lista de datos de Recursos Humanos

  constructor(private db: AngularFireDatabase) { 
    this.humanRef = db.list(this.dbPath);
  }

  //Creación de usuario Humano
  addHuman(human: HumanResources){
    this.humanRef.push({
      nombre: human.nombre,
      apellido: human.apellido,
      cedula: human.cedula,
      correo: human.correo,
      telefono: human.telefono,
      direccion: human.direccion,
      contraseña: human.contraseña,
      repetirContraseña: human.repetirContraseña,
    }).catch((error) =>{
      console.log(error);
    })
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
