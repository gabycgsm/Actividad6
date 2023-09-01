import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  userForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  activedRoute = inject(ActivatedRoute);
  nombreFormulario: string = 'NUEVO USUARIO'
  nombreBoton: string = 'Guardar';

  constructor() {    
    
    this.userForm = new FormGroup({
      _id: new FormControl("", []),
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      image: new FormControl("", [Validators.required]),
    }, [])
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(async (params: any) => {
      let id: string = String(params.iduser);      

      if (id !== undefined) {
        this.nombreFormulario = 'ACTUALIZAR FORMULARIO'
        this.nombreBoton = 'Actualizar'
        let response = await this.usersService.getByIdPromise(id);

        this.userForm = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, [Validators.required]),
          last_name: new FormControl(response.last_name, [Validators.required]),
          email: new FormControl(response.email, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
          username: new FormControl(response.username, [Validators.required]),
          password: new FormControl(response.password, [Validators.required, Validators.minLength(8)]),
          image: new FormControl(response.image, [Validators.required]),
        }, [])        

      }      

    })

  }

  checkControl(formControlName: string, validator: string) {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched
  }

  async getDataForm(): Promise<void> {

    if (this.userForm.value._id) {
      //actualizar      
      let response = await this.usersService.update(this.userForm.value)

      if (response._id) {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/home']);
      } else {
        alert('Error al actualizar el usuario');
      }



    } else {
      //insertar      
      let response = await this.usersService.insert(this.userForm.value);
      console.log(response)

      if (response._id) {
        alert('Usuario insertado correctamente');
        this.router.navigate(['/home']);
      } else {
        alert('Ha habido un error, intentalo de nuevo');
      }

    }


  }

}
