import { FormGroup, FormControl } from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession:boolean = false
  formLogin: FormGroup = new FormGroup({});

 constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.formLogin = new UntypedFormGroup(
      {
        email: new UntypedFormControl('jhon.orellana@gmail.com', [
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('password',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }

  sendLogin(): void {
    //const body = this.formLogin.value;
      //console.log('😍😎😎',body);

    const{email, password} = this.formLogin.value;
    this.authService.sendCredentials(email,password)
    .subscribe(responseOk => {
    console.log('Sesion iniciada correctamente')
    },
    err=> {
      this.errorSession = true
      console.log('Error ocurrido con tu email o password')
    })

  }

}
