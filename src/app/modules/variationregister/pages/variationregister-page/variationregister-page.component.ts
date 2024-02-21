import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { VariationsModel } from '@core/models/variations.model';
import { VariationregisterService } from '@modules/variationregister/services/variationregister.service';


@Component({
  selector: 'app-variationregister-page',
  templateUrl: './variationregister-page.component.html',
  styleUrls: ['./variationregister-page.component.css'],
  providers: [MessageService]
})
export class VariationregisterPageComponent {


  catalogoRegistros: VariationsModel[] = [];

  formRegistro!: FormGroup;
  formUpdateRegistro!: FormGroup;
  registroDialog: boolean = false;
  registroDialogUpdate: boolean = false;
  tipoCrud: string = '';

  formControlNames: string[] = ['id', 'Fecha', 'Jaime','Argentina','Cristian','SaldoTotal','SaldoPropio','Importacion','TotalPropio'];
  ControlValidadores: { [key: string]: any[] } = {
    'id': [Validators.required],
    'Fecha': [Validators.required],
    'Jaime': [Validators.required],
    'Argentina': [Validators.required],
    'Cristian': [Validators.required],
    'SaldoTotal': [Validators.required],
    'SaldoPropio': [Validators.required],
    'Importacion': [Validators.required],
    'TotalPropio': [Validators.required],
  };

  constructor ( public variationregisterService: VariationregisterService,
    private messageService: MessageService,
    private formUpdateBuilder: FormBuilder) {}



    ngOnInit (): void{
      this.obtenerRegistrosRest();
      this.buildFormVariacion();
      this.buildformUpdateRegistro();
   }


   buildFormVariacion(): void {
      this.formRegistro = new FormGroup({
        id: new FormControl(0),
        Fecha: new FormControl('', [Validators.required]),
        Jaime:  new FormControl('', [Validators.required]),
        Argentina:  new FormControl('', [Validators.required]),
        Cristian:  new FormControl('', [Validators.required]),
        SaldoTotal: new FormControl('', [Validators.required]),
        SaldoPropio: new FormControl('', [Validators.required]),
        Importacion: new FormControl('', [Validators.required]),
        TotalPropio: new FormControl('', [Validators.required]),
       });

     }

   obtenerRegistrosRest(): void {
      this.variationregisterService.ObtenerRegistrosVariaciones$().subscribe(
       (datos) => {
         //console.log('DATOS DESDE HTTP', datos);
         this.catalogoRegistros = datos;
       },
       (error) => {
         console.error('Error al cargar los datos:', error);
       }
      )
   }


   eliminarRegistro( registro: VariationsModel): void {
     console.log(registro)
   }


 crearRegistro(): void {
   this.registroDialog=true;
   this.tipoCrud = 'C';

 }

   guardarRegistro(): void {
      const idRegistro = this.catalogoRegistros.length + 1;
      const auxRegistro: VariationsModel = {
           id: idRegistro,
           Fecha: this.formRegistro.controls['Fecha'].value,
           Jaime: this.formRegistro.controls['Jaime'].value,
           Argentina: this.formRegistro.controls['Argentina'].value,
           Cristian: this.formRegistro.controls['Cristian'].value,
           SaldoTotal: this.formRegistro.controls['SaldoTotal'].value,
           SaldoPropio: this.formRegistro.controls['SaldoPropio'].value,
           Importacion: this.formRegistro.controls['Importacion'].value,
           TotalPropio: this.formRegistro.controls['TotalPropio'].value
      }

      this.catalogoRegistros.push(auxRegistro);
      this.catalogoRegistros = [...this.catalogoRegistros];


      this.variationregisterService.InsertarRegistrosVariaciones$(auxRegistro).subscribe(
        (datos) => {
          console.log('DATOS DESDE HTTP', datos);
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


       modificarRegistro( registro: VariationsModel ): void {
         this.crearFormularioUpdate();

         this.registroDialogUpdate = true;
         this.tipoCrud = 'U';

         this.formUpdateRegistro.controls['id'].setValue(registro.id);
         this.formUpdateRegistro.controls['Fecha'].setValue(registro.Fecha);
         this.formUpdateRegistro.controls['Jaime'].setValue(registro.Jaime);
         this.formUpdateRegistro.controls['Argentina'].setValue(registro.Argentina);
         this.formUpdateRegistro.controls['Cristian'].setValue(registro.Cristian);
         this.formUpdateRegistro.controls['SaldoTotal'].setValue(registro.SaldoTotal);
         this.formUpdateRegistro.controls['SaldoPropio'].setValue(registro.SaldoPropio);
         this.formUpdateRegistro.controls['Importacion'].setValue(registro.Importacion);
         this.formUpdateRegistro.controls['TotalPropio'].setValue(registro.TotalPropio);
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


 }
