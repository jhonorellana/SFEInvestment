import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InversionModel } from '@core/models/inversion.model';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  private readonly URL = environment.api2;

  constructor(private http: HttpClient) { }

  // Obtener todas las inversiones
  obtenerTodas(): Observable<InversionModel[]> {
    return this.http.get<InversionModel[]>(`${this.URL}inversion`).pipe(
      catchError(this.manejarError)
    );
  }

  // Obtener una inversión por ID
  obtenerPorId(id: number): Observable<InversionModel> {
    return this.http.get<InversionModel>(`${this.URL}inversion/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  // Formatear fechas al formato YYYY-MM-DD
  private formatearFechas(inversion: InversionModel): any {
    const formattedInversion = { ...inversion };

    // Formatear fechas al formato YYYY-MM-DD
    const formatDate = (date: Date | string | null): string | null => {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    };

    formattedInversion.inv_fecha_compra = formatDate(inversion.inv_fecha_compra) as string;
    if (inversion.inv_fecha_emision) formattedInversion.inv_fecha_emision = formatDate(inversion.inv_fecha_emision);
    if (inversion.inv_fecha_vencimiento) formattedInversion.inv_fecha_vencimiento = formatDate(inversion.inv_fecha_vencimiento);
    if (inversion.inv_fecha_venta) formattedInversion.inv_fecha_venta = formatDate(inversion.inv_fecha_venta);

    return formattedInversion;
  }

  // Crear una nueva inversión
  crear(inversion: InversionModel): Observable<InversionModel> {
    const formattedInversion = this.formatearFechas(inversion);
    return this.http.post<InversionModel>(`${this.URL}inversion`, formattedInversion).pipe(
      catchError(this.manejarError)
    );
  }

  // Actualizar una inversión existente
  actualizar(id: number, inversion: InversionModel): Observable<InversionModel> {
    const formattedInversion = this.formatearFechas(inversion);
    return this.http.put<InversionModel>(`${this.URL}inversion/${id}`, formattedInversion).pipe(
      catchError(this.manejarError)
    );
  }

  // Eliminar una inversión (borrado lógico)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}inversion/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  // Obtener inversiones por propietario
  obtenerPorPropietario(propietario: string): Observable<InversionModel[]> {
    return this.http.get<InversionModel[]>(`${this.URL}inversion/propietario/${propietario}`).pipe(
      catchError(this.manejarError)
    );
  }

  // Obtener inversiones activas
  obtenerActivas(): Observable<InversionModel[]> {
    return this.http.get<InversionModel[]>(`${this.URL}inversion/activas`).pipe(
      catchError(this.manejarError)
    );
  }

  // Métodos de compatibilidad con código existente (pueden ser eliminados una vez actualizado todo el código que los usa)
  ObtenerRegistrosInversiones$(): Observable<InversionModel[]> {
    return this.obtenerTodas();
  }

  InsertarRegistrosInversiones$(inversion: InversionModel): Observable<InversionModel> {
    return this.crear(inversion);
  }

  ActualizarRegistrosInversiones$(inversion: InversionModel): Observable<InversionModel> {
    if (!inversion.id) {
      return throwError(() => new Error('ID de inversión no proporcionado'));
    }
    return this.actualizar(inversion.id, inversion);
  }

  EliminarRegistrosInversiones$(inversion: InversionModel): Observable<void> {
    if (!inversion.id) {
      return throwError(() => new Error('ID de inversión no proporcionado'));
    }
    return this.eliminar(inversion.id);
  }

  // Manejo de errores
  private manejarError(error: any): Observable<never> {
    console.error('Error en el servicio de inversiones:', error);
    let mensajeError = 'Ocurrió un error en el servicio de inversiones';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      mensajeError = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      mensajeError = `Código: ${error.status}\nMensaje: ${error.message}`;
    }

    return throwError(() => new Error(mensajeError));
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
