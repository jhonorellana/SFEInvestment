import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { VariationsModel } from '@core/models/variations.model';



@Injectable({
  providedIn: 'root'
})
export class VariationregisterService {

  private readonly URL = environment.api2;
  constructor( private httpClient: HttpClient) { }


    ObtenerRegistrosVariaciones$(): Observable<any>{
      return this.httpClient.get(`${this.URL}variation`);
    }

    InsertarRegistrosVariaciones$(variations: VariationsModel): Observable<any>{
      console.log('--------');
      console.log(variations);
      console.log('--------');
      return this.httpClient.post(`${this.URL}variation`, variations);
    }


    public getErrors(control: AbstractControl, controlName: string): string[] {
      const errors: string[] = [];

      if (control.touched && control.invalid != null) {
        for (const auxError in control.errors) {
          if (control.errors[auxError]) {
            switch (auxError) {
              case 'required': {
                errors.push(controlName + ' es obligatorio');
                break;
              }
              case 'pattern': {
                errors.push(' No se cumple con el patrón establecido');
                break;
              }
              case 'email': {
                errors.push(' Ingrese un correo electrónico válido');
                break;
              }
              case 'minlength': {
                errors.push(' longitud mínima no válida');
                break;
              }
              case 'maxlength': {
                errors.push(' longitud máxima no válida');
                break;
              }
               case 'max':{
                errors.push('No cumple con el valor máximo permitido');
                break;
              }
              case 'min':{
                errors.push('No cumple con el valor mínimo permitido');
                break;
              }
              default: {
                errors.push(controlName + ' Error desconocido');
                break;
              }
            }
          }
        }
      }
      return errors;
    }

  }
