import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { InversionModel } from '@core/models/inversion.model';
import { InversionService } from '@modules/inversion/services/inversion.service';
import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-inversion-page',
  templateUrl: './inversion-page.component.html',
  styleUrls: ['./inversion-page.component.css'],
  providers: [MessageService]
})
export class InversionPageComponent {

  @ViewChild('dt2')
  dt2!: Table;


    loading: boolean = true;
    catalogoRegistros: InversionModel[] = [];

  formRegistro!: FormGroup;
  formUpdateRegistro!: FormGroup;
  registroDialog: boolean = false;
  registroDialogUpdate: boolean = false;
  tipoCrud: string = '';

  formControlNames: string[] = ['id', 'Tipo', 'FechaCompra','FechaVencimiento','Propietario','Empresa','TasaInteres','Rendimiento','Capital','Retencion', 'Vendido', 'Expirado','Activo'];
  ControlValidadores: { [key: string]: any[] } = {
    'id': [Validators.required],
    'Tipo': [Validators.required],
    'FechaCompra': [Validators.required],
    'FechaVencimiento': [Validators.required],
    'Propietario': [Validators.required],
    'Empresa': [Validators.required],
    'TasaInteres': [Validators.required],
    'Rendimiento': [Validators.required],
    'Capital': [Validators.required],
    'Retencion': [Validators.required],
    'Vendido': [Validators.required],
    'Expirado': [Validators.required],
    'Activo': [Validators.required],
  };

  constructor ( public inversionService: InversionService,
    private messageService: MessageService,
    private formUpdateBuilder: FormBuilder) {}



    ngOnInit (): void{
      this.obtenerRegistrosRest();
      this.buildFormVariacion();
      this.buildformUpdateRegistro();

      this.loading = false;
   }

     onFilter(event: any): void {
      if (event.target instanceof HTMLInputElement) {
        const keyword = event.target.value;
        this.dt2.filterGlobal(keyword, 'contains');
      }
    }

   buildFormVariacion(): void {
      this.formRegistro = new FormGroup({
        id: new FormControl(0),
        Tipo: new FormControl('', [Validators.required]),
        FechaCompra: new FormControl('', [Validators.required]),
        FechaVencimiento:  new FormControl('', [Validators.required]),
        Propietario:  new FormControl('', [Validators.required]),
        Empresa:  new FormControl('', [Validators.required]),
        TasaInteres: new FormControl('', [Validators.required]),
        Rendimiento: new FormControl('', [Validators.required]),
        Capital: new FormControl('', [Validators.required]),
        Retencion: new FormControl('', [Validators.required]),
        Vendido: new FormControl('', [Validators.required]),
        Expirado: new FormControl('', [Validators.required]),
        Activo: new FormControl('', [Validators.required]),
       });

     }

   obtenerRegistrosRest(): void {
      this.inversionService.ObtenerRegistrosInversiones$().subscribe(
       (datos) => {
         //console.log('DATOS DESDE HTTP', datos);
         this.catalogoRegistros = datos;
       },
       (error) => {
         console.error('Error al cargar los datos:', error);
       }
      )
   }



 crearRegistro(): void {
   this.registroDialog=true;
   this.tipoCrud = 'C';

 }

   guardarRegistro(): void {
      const idRegistro = this.catalogoRegistros.length + 1;
      const auxRegistro: InversionModel = {
           id: idRegistro,
           Tipo: this.formRegistro.controls['Tipo'].value,
           FechaCompra: this.formRegistro.controls['FechaCompra'].value,
           FechaVencimiento: this.formRegistro.controls['FechaVencimiento'].value,
           Propietario: this.formRegistro.controls['Propietario'].value,
           Empresa: this.formRegistro.controls['Empresa'].value,
           TasaInteres: this.formRegistro.controls['TasaInteres'].value,
           Rendimiento: this.formRegistro.controls['Rendimiento'].value,
           Capital: this.formRegistro.controls['Capital'].value,
           Retencion: this.formRegistro.controls['Retencion'].value,
           Vendido: this.formRegistro.controls['Vendido'].value,
           Expirado: this.formRegistro.controls['Expirado'].value,
           Activo: this.formRegistro.controls['Activo'].value
      }

      this.catalogoRegistros.push(auxRegistro);
      this.catalogoRegistros = [...this.catalogoRegistros];


      this.inversionService.InsertarRegistrosInversiones$(auxRegistro).subscribe(
        (datos) => {
          console.log('DATOS DESDE HTTP - Guardar', datos);
          //this.catalogoRegistros = datos;
        },
        (error) => {
          console.error('Error al cargar los datos:', error);
        }
       )




     this.messageService.add(
      {
       severity: 'success',
       summary: 'Creación',
       detail: 'Se ha creado el registro exitosamente',
       id: 1
       });
       this.registroDialog = false;
     }



    public disableAction(): boolean {
        if (
            (this.formRegistro.invalid ||
             this.formRegistro.untouched ||
             this.formRegistro.dirty)
        ) { return true; }
         else {
           return false;
         }
       }


       buildformUpdateRegistro(): void {
         this.formUpdateRegistro = this.formUpdateBuilder.group({})
       }


       modificarRegistro( registro: InversionModel ): void {
         this.crearFormularioUpdate();

         this.registroDialogUpdate = true;
         this.tipoCrud = 'U';

         this.formUpdateRegistro.controls['id'].setValue(registro.id);
         this.formUpdateRegistro.controls['Tipo'].setValue(registro.Tipo);
         this.formUpdateRegistro.controls['FechaCompra'].setValue(registro.FechaCompra);
         this.formUpdateRegistro.controls['FechaVencimiento'].setValue(registro.FechaVencimiento);
         this.formUpdateRegistro.controls['Propietario'].setValue(registro.Propietario);
         this.formUpdateRegistro.controls['Empresa'].setValue(registro.Empresa);
         this.formUpdateRegistro.controls['TasaInteres'].setValue(registro.TasaInteres);
         this.formUpdateRegistro.controls['Rendimiento'].setValue(registro.Rendimiento);
         this.formUpdateRegistro.controls['Capital'].setValue(registro.Capital);
         this.formUpdateRegistro.controls['Retencion'].setValue(registro.Retencion);
         this.formUpdateRegistro.controls['Vendido'].setValue(registro.Vendido);
         this.formUpdateRegistro.controls['Expirado'].setValue(registro.Expirado);
         this.formUpdateRegistro.controls['Activo'].setValue(registro.Activo);
       }


       crearFormularioUpdate(): void {

         const formGroupConfig: { [key: string]: any } = {};
         console.log('aqui toy');


         for (const controlName of this.formControlNames) {
           if( controlName ==='id'){
             formGroupConfig[controlName] = [{value: null ,disabled: true},this.ControlValidadores[controlName] ];
           }
           else{
             formGroupConfig[controlName] = [null, this.ControlValidadores[controlName]]
           }

         }

         this.formUpdateRegistro = this.formUpdateBuilder.group(formGroupConfig);
       /*   this.formUpdateRegistro.addControl('idRegistroHistorialModel', this.formUpdateBuilder.control({ value: 0, disabled: true }, Validators.required ));
         this.formUpdateRegistro.addControl('nombre', this.formUpdateBuilder.control('', Validators.required));
         this.formUpdateRegistro.addControl('descripcion', this.formUpdateBuilder.control(''));
         this.formUpdateRegistro.addControl('fabricante', this.formUpdateBuilder.control(''));
         this.formUpdateRegistro.addControl('anio', this.formUpdateBuilder.control(0, Validators.required));
         this.formUpdateRegistro.addControl('precio', this.formUpdateBuilder.control(0, Validators.required));
         this.formUpdateRegistro.addControl('tipo', this.formUpdateBuilder.control([], Validators.required));
         this.formUpdateRegistro.addControl('plataformas', this.formUpdateBuilder.control([], Validators.required)); */


       }

       ngAfterViewInit(): void {
         this.formRegistro.valueChanges.subscribe(value => console.log('Valor actualizado:', value));
       }


       actualizarRegistro(): void {
        const auxRegistro: InversionModel = {
             id: this.formUpdateRegistro.controls['id'].value,
             Tipo: this.formUpdateRegistro.controls['Tipo'].value,
             FechaCompra: this.formUpdateRegistro.controls['FechaCompra'].value,
             FechaVencimiento: this.formUpdateRegistro.controls['FechaVencimiento'].value,
             Propietario: this.formUpdateRegistro.controls['Propietario'].value,
             Empresa: this.formUpdateRegistro.controls['Empresa'].value,
             TasaInteres: this.formUpdateRegistro.controls['TasaInteres'].value,
             Rendimiento: this.formUpdateRegistro.controls['Rendimiento'].value,
             Capital: this.formUpdateRegistro.controls['Capital'].value,
             Retencion: this.formUpdateRegistro.controls['Retencion'].value,
             Vendido: this.formUpdateRegistro.controls['Vendido'].value,
             Expirado: this.formUpdateRegistro.controls['Expirado'].value,
             Activo: this.formUpdateRegistro.controls['Activo'].value
        }

        //this.catalogoRegistros.push(auxRegistro);
        //this.catalogoRegistros = [...this.catalogoRegistros];




        this.inversionService.ActualizarRegistrosInversiones$(auxRegistro).subscribe(
          (datos) => {
            console.log('DATOS DESDE HTTP - Actualizar', datos);
            //this.catalogoRegistros = datos;

            this.messageService.add(
              {
               severity: 'success',
               summary: 'Creación',
               detail: 'Se ha actualizado el registro exitosamente',
               id: 1
               });
               this.registroDialog = false;


          },
          (error) => {
            console.error('Error al cargar los datos:', error);
          }
         )
        }


        eliminarRegistro( registro: InversionModel): void {
          console.log(registro)

          this.inversionService.EliminarRegistrosInversiones$(registro).subscribe(
           (datos) => {
             console.log('DATOS DESDE HTTP - Eliminar', datos);
             //this.catalogoRegistros = datos;


             this.messageService.add(
              {
               severity: 'success',
               summary: 'Creación',
               detail: 'Se ha eliminado el registro exitosamente',
               id: 1
               });
               this.registroDialog = false;



           },
           (error) => {
             console.error('Error al cargar los datos:', error);
           }
          )


        }



 }

