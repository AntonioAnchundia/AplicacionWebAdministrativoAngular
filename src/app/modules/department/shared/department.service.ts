import { Injectable } from '@angular/core';
import { Department } from './department';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private dbPath = '/departamento';

  departmentRef : AngularFireList<Department>; //Referencia a la lista de datos del departamento

  constructor(private db: AngularFireDatabase) { 
    this.departmentRef = db.list(this.dbPath);
  }

  create(departamento: Department): any{
    return this.departmentRef.push(departamento);
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



  //SUBIR UNA IMAGEN -> FIREBASE ME DEVUELVE UNA URL DONDE PUEDA ENCONTRAR LA IMAGEN
  //private uploadImage()
}