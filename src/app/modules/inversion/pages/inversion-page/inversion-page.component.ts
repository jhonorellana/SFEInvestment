import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InversionModel } from '@core/models/inversion.model';
import { InversionService } from '@modules/inversion/services/inversion.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-inversion-page',
  templateUrl: './inversion-page.component.html',
  styleUrls: ['./inversion-page.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class InversionPageComponent implements OnInit, OnDestroy {
  @ViewChild('dt2') dt2!: Table;

  // Datos
  inversiones: InversionModel[] = [];
  inversionSeleccionada: InversionModel | null = null;

  // Estados
  cargando = false;
  mostrarDialogo = false;
  esNuevoRegistro = false;

  // Formulario
  formInversion: FormGroup;

  // Opciones para selects
  tiposInversion = [
    { label: 'Certificado de Inversión', value: 1 },
    { label: 'Factura Comercial', value: 2 },
    { label: 'Papel Comercial', value: 3 },
    { label: 'Bono del Estado', value: 4 },
    { label: 'Obligación', value: 5 },
    { label: 'Acciones', value: 73 },
    { label: 'Genérico', value: 74 },
    { label: 'Titularizacion', value: 75 }
  ];

  calificacionesRiesgo = [
    'AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-',
    'BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'BB-',
    'B+', 'B', 'B-', 'CCC+', 'CCC', 'CCC-', 'CC', 'C', 'D'
  ];

  constructor(
    private inversionService: InversionService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.formInversion = this.crearFormulario();
  }

  // Métodos para el diálogo de confirmación
  accept(): void {
    if (this.inversionSeleccionada) {
      this.eliminarInversion(this.inversionSeleccionada);
    }
  }

  reject(): void {
    this.messageService.add({ severity: 'info', summary: 'Operación cancelada', detail: 'La eliminación fue cancelada', life: 3000 });
  }

  ngOnInit(): void {
    this.cargarInversiones();
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones si es necesario
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      // Identificación
      id: [null],
      inv_tipo: [null, [Validators.required]],
      inv_propietario: ['', [Validators.required, Validators.minLength(3)]],
      inv_liquidacion: [''],

      // Fechas
      inv_fecha_compra: [null, [Validators.required]],
      inv_fecha_emision: [null],
      inv_fecha_vencimiento: [null],
      inv_fecha_venta: [null],

      // Información de la inversión
      inv_emisor: ['', [Validators.required]],
      inv_calificacion_riesgo: [null],  // Changed from [''] to [null] to properly handle the dropdown
      inv_valor_nominal: [null],
      inv_monto_a_negociar: [null],
      inv_capital_invertido: [0, [Validators.required, Validators.min(0.01)]],
      inv_precio: [null],

      // Tasas y rendimientos
      inv_tasa_interes: [0, [Validators.required, Validators.min(0)]],
      inv_rendimiento_nominal: [0, [Validators.required, Validators.min(0)]],
      inv_rendimiento_efectivo: [null],
      inv_valor_efectivo: [null],
      inv_valor_interes: [null],

      // Comisiones e impuestos
      inv_comision_bolsa: [null],
      inv_comision_operador: [null],
      inv_retencion: [null],

      // Estados
      inv_expirado: [false],
      inv_pagada: [false],
      is_active: [true],
      is_deleted: [false]
    });
  }

  cargarInversiones(): void {
    this.cargando = true;
    this.inversionService.ObtenerRegistrosInversiones$()
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (inversiones) => {
          this.inversiones = inversiones;
        },
        error: (error) => {
          console.error('Error al cargar las inversiones:', error);
          this.mostrarError('Error al cargar las inversiones');
        }
      });
  }

  onFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dt2?.filterGlobal(value, 'contains');
  }

  abrirDialogoNuevo(): void {
    this.esNuevoRegistro = true;
    this.formInversion.reset({
      is_active: true,
      is_deleted: false,
      inv_expirado: false,
      inv_pagada: false
    });
    this.mostrarDialogo = true;
  }

  guardarInversion(): void {
    if (this.formInversion.invalid) {
      this.mostrarError('Por favor complete todos los campos requeridos');
      Object.values(this.formInversion.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const inversion: InversionModel = this.formInversion.getRawValue();
    this.cargando = true;

    const operacion = inversion.id
      ? this.inversionService.ActualizarRegistrosInversiones$(inversion)
      : this.inversionService.InsertarRegistrosInversiones$(inversion);

    operacion.pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: () => {
          this.mostrarExito(`Inversión ${inversion.id ? 'actualizada' : 'creada'} correctamente`);
          this.cargarInversiones();
          this.cerrarDialogo();
        },
        error: (error) => {
          console.error('Error al guardar la inversión:', error);
          this.mostrarError(`Error al ${inversion.id ? 'actualizar' : 'crear'} la inversión`);
        }
      });
  }

  editarInversion(inversion: InversionModel): void {
    this.inversionSeleccionada = { ...inversion };

    // Asegurar que las fechas sean objetos Date válidos
    const valoresFormulario = { ...inversion };

    // Convertir fechas de string a Date si es necesario
    if (typeof valoresFormulario.inv_fecha_compra === 'string') {
      valoresFormulario.inv_fecha_compra = new Date(valoresFormulario.inv_fecha_compra);
    }
    if (valoresFormulario.inv_fecha_vencimiento && typeof valoresFormulario.inv_fecha_vencimiento === 'string') {
      valoresFormulario.inv_fecha_vencimiento = new Date(valoresFormulario.inv_fecha_vencimiento);
    }
    if (valoresFormulario.inv_fecha_emision && typeof valoresFormulario.inv_fecha_emision === 'string') {
      valoresFormulario.inv_fecha_emision = new Date(valoresFormulario.inv_fecha_emision);
    }
    if (valoresFormulario.inv_fecha_venta && typeof valoresFormulario.inv_fecha_venta === 'string') {
      valoresFormulario.inv_fecha_venta = new Date(valoresFormulario.inv_fecha_venta);
    }

    this.formInversion.patchValue(valoresFormulario);
    this.esNuevoRegistro = false;
    this.mostrarDialogo = true;
  }

  confirmarEliminar(inversion: InversionModel): void {
    if (!inversion.id) return;

    this.inversionSeleccionada = inversion;

    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar esta inversión?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.accept(),
      reject: () => this.reject()
    });
  }

  private eliminarInversion(inversion: InversionModel): void {
    if (!inversion.id) return;

    this.cargando = true;
    this.inversionService.EliminarRegistrosInversiones$(inversion)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: () => {
          this.mostrarExito('Inversión eliminada correctamente');
          this.cargarInversiones();
        },
        error: (error) => {
          console.error('Error al eliminar la inversión:', error);
          this.mostrarError('Error al eliminar la inversión');
        }
      });
  }

  private mostrarExito(mensaje: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: mensaje,
      life: 3000
    });
  }

  private mostrarError(mensaje: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
      life: 5000
    });
  }

  cerrarDialogo(): void {
    this.mostrarDialogo = false;
    this.formInversion.reset({
      inv_tasa_interes: 0,
      inv_rendimiento_nominal: 0,
      inv_capital_invertido: 0,
      is_active: true,
      is_deleted: false
    });
    this.inversionSeleccionada = null;
  }

  obtenerNombreTipo(tipoId: number): string {
    const tipo = this.tiposInversion.find(t => t.value === tipoId);
    return tipo ? tipo.label : 'Desconocido';
  }
}
