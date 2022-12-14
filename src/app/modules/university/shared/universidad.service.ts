import { Injectable } from '@angular/core';
import { Universidad } from './universidad';
import { Facultad } from './facultad';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { getDatabase,ref, push, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Carrera } from './carrera';

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {
  dbPathUni = '/Universidad';
  dbPathFacu = '/Facultad';


  universidadListRef: AngularFireList<any>; //Reference to student data list,, its an Observable
  facultadListRef: AngularFireList<any>; 
  // universidadRef: AngularFireObject<any>; //Refrence to student object, its an Observable too

  constructor(private db: AngularFireDatabase) { 
    this.universidadListRef = db.list(this.dbPathUni);
    this.facultadListRef = db.list(this.dbPathFacu);
  }

  agregarUsuario(universidad: Universidad, facultad: Facultad, carrera: Carrera){
    let listadoU = this.universidadListRef.push({
      nombre_Universidad: universidad.nombre_Universidad,
      nombreCorto_Universidad: universidad.nombre_Universidad,
      correo_Universidad: universidad.nombre_Universidad,
      telefono_Universidad: universidad.nombre_Universidad,
      direccion_Universidad: universidad.nombre_Universidad,
      url_Universidad: universidad.nombre_Universidad,
      director_Universidad: universidad.nombre_Universidad,
    }).child("Facultad").push({
      nombreFacultad: facultad.nombreFacultad,
      correoFacultad: facultad.correoFacultad,
      telefonoFacultad: facultad.telefonoFacultad,
      nombreDecanoFacultad: facultad.nombreDecanoFacultad,
      correoDecanoFacultad:facultad.correoDecanoFacultad,
      telefonoDecanoFacultad: facultad.telefonoDecanoFacultad,
      direccionFacultad: facultad.direccionFacultad,
    }).child("Carrera").push({
      nombreCarrera: carrera.nombreCarrera,
      CorreoCarrera: carrera.CorreoCarrera,
      telefonoCarrera: carrera.telefonoCarrera,
      nombreDirectorCarrera: carrera.nombreDirectorCarrera,
      correoDirectorCarrera: carrera.correoDirectorCarrera,
      telefonoDirectorCarrera: carrera.telefonoDirectorCarrera,
    })
    
  }

}


    //*****  NO LEE EN LA BD 
  // agregarUsuario(universidad: Universidad){
  //   let db = getDatabase();
  //   set(ref(db, 'universidad/'), {
  //     nombre_Universidad: universidad.nombre_Universidad,
  //     nombreCorto_Universidad: universidad.nombre_Universidad,
  //     correo_Universidad: universidad.nombre_Universidad,
  //     telefono_Universidad: universidad.nombre_Universidad,
  //     direccion_Universidad: universidad.nombre_Universidad,
  //     url_Universidad: universidad.nombre_Universidad,
  //     director_Universidad: universidad.nombre_Universidad,
  //   })
  // }
