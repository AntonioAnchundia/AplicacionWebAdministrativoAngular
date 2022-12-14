import { Carrera } from "./carrera";
import { Universidad } from "./universidad";

export interface Facultad {
    nombreFacultad:String;
    correoFacultad: String;
    telefonoFacultad:String;
    nombreDecanoFacultad:String;
    correoDecanoFacultad:String;
    telefonoDecanoFacultad:String;
    direccionFacultad:String;
    // carrera: {
    //     [key: string]: Carrera;
    // }
}