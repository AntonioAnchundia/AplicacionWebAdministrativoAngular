import { Carrera } from "./carrera";
import { Facultad } from "./facultad";

export interface Universidad{
    nombre_Universidad: String;
    nombreCorto_Universidad: String;
    correo_Universidad: String;
    telefono_Universidad: String;
    direccion_Universidad: String;
    url_Universidad: String;
    director_Universidad: String;
    // Facultad: Facultad[];
}
