import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { OthervalueModel } from '@core/models/othervalue.model';

@Injectable({
  providedIn: 'root'
})
export class OthervalueService {

  private readonly URL = environment.api2;
  constructor( private httpClient: HttpClient) { }


  ObtenerRegistrosOtrosvalores$(): Observable<any>{
    return this.httpClient.get(`${this.URL}othervalue`);
  }

  InsertarRegistrosOtrosvalores$(othervalues: OthervalueModel): Observable<any>{
    //console.log('--------');
    //console.log(othervalues);
    //console.log('--------');
    return this.httpClient.post(`${this.URL}othervalue`, othervalues);
  }

  ActualizarRegistrosOtrosvalores$(othervalues: OthervalueModel): Observable<any>{
    //console.log('--------');
    //console.log(othervalues.id);
    //console.log('--------');
    return this.httpClient.put(`${this.URL}othervalue/${othervalues.id}`, othervalues);
  }


  EliminarRegistrosOtrosvalores$(othervalues: OthervalueModel): Observable<any>{
    //console.log('--------');
    //console.log(othervalues.id);
    //console.log('--------');
    return this.httpClient.delete(`${this.URL}othervalue/${othervalues.id}`);
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
