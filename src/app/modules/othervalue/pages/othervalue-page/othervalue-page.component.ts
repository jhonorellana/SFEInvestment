import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { OthervalueModel } from '@core/models/othervalue.model';
import { OthervalueService } from '@modules/othervalue/services/othervalue.service';
import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-othervalue-page',
  templateUrl: './othervalue-page.component.html',
  styleUrls: ['./othervalue-page.component.css'],
  providers: [MessageService]
})
export class OthervaluePageComponent {

  @ViewChild('dt2')
  dt2!: Table;

  // Opciones para el dropdown de estado
  estados = [
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 }
  ];

  loading: boolean = true;
  catalogoRegistros: OthervalueModel[] = [];

  formRegistro!: FormGroup;
  formUpdateRegistro!: FormGroup;
  registroDialog: boolean = false;
  registroDialogUpdate: boolean = false;
  tipoCrud: string = '';

  formControlNames: string[] = ['id', 'Descripcion', 'Valor','Activo'];
  ControlValidadores: { [key: string]: any[] } = {
    'id': [Validators.required],
    'Descripcion': [Validators.required],
    'Valor': [Validators.required],
    'Activo': [Validators.required],
  };


  constructor ( public othervalueService: OthervalueService,
    private messageService: MessageService,
    private formUpdateBuilder: FormBuilder) {}


    ngOnInit (): void{
      this.obtenerRegistrosRest();
      this.buildFormRegistro();
      this.buildformUpdateRegistro();

      this.loading = false;
   }

   onFilter(event: any): void {
    if (event.target instanceof HTMLInputElement) {
      const keyword = event.target.value;
      this.dt2.filterGlobal(keyword, 'contains');
    }
  }
   buildFormRegistro(): void {
      this.formRegistro = new FormGroup({
        id: new FormControl(0),
        Descripcion: new FormControl('', [Validators.required]),
        Valor:  new FormControl('', [Validators.required]),
        Activo:  new FormControl('', [Validators.required]),
       });

     }

   obtenerRegistrosRest(): void {
      this.othervalueService.ObtenerRegistrosOtrosvalores$().subscribe(
       (datos) => {
         console.log('DATOS DESDE HTTP', datos);
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
      const auxRegistro: OthervalueModel = {
           id: idRegistro,
           Descripcion: this.formRegistro.controls['Descripcion'].value,
           Valor: this.formRegistro.controls['Valor'].value,
           Activo: this.formRegistro.controls['Activo'].value
      }

      //this.catalogoRegistros.push(auxRegistro);
      //this.catalogoRegistros = [...this.catalogoRegistros];


      this.othervalueService.InsertarRegistrosOtrosvalores$(auxRegistro).subscribe(
        (datos) => {
          console.log('DATOS DESDE HTTP - Guardar', datos);
          //this.catalogoRegistros = datos;
          this.obtenerRegistrosRest();
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
         this.formUpdateRegistro = this.formUpdateBuilder.group({
           id: [''],
           Descripcion: ['', [Validators.required]],
           Valor: ['', [Validators.required]],
           Activo: [1, [Validators.required]]  // Valor por defecto: 1 (Activo)
         });
       }


       modificarRegistro(registro: any) {
         this.formUpdateRegistro.patchValue({
           id: registro.id,
           Descripcion: registro.Descripcion,
           Valor: registro.Valor,
           Activo: registro.Activo  // Esto debería ser 0 o 1
         });
         this.registroDialogUpdate = true;
         this.tipoCrud = 'U';
       }

  // Método para manejar cambios en el checkbox de Activo
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    // Asegurarse de que el valor sea 1 (true) o 0 (false)
    this.formUpdateRegistro.patchValue({
      Activo: isChecked ? 1 : 0
    });
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
        const auxRegistro: OthervalueModel = {
             id: this.formUpdateRegistro.controls['id'].value,
             Descripcion: this.formUpdateRegistro.controls['Descripcion'].value,
             Valor: this.formUpdateRegistro.controls['Valor'].value,
             Activo: this.formUpdateRegistro.controls['Activo'].value,
        }

        //this.catalogoRegistros.push(auxRegistro);
        //this.catalogoRegistros = [...this.catalogoRegistros];




        this.othervalueService.ActualizarRegistrosOtrosvalores$(auxRegistro).subscribe(
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
               this.obtenerRegistrosRest();

          },
          (error) => {
            console.error('Error al cargar los datos:', error);
          }
         )
        }


        eliminarRegistro( registro: OthervalueModel): void {
          console.log(registro)

          this.othervalueService.EliminarRegistrosOtrosvalores$(registro).subscribe(
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
