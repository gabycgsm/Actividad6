import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
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

  constructor() {
    this.userForm = new FormGroup({
      _id: new FormControl("", []),
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", []),
    }, [])
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(async (params: any) => {
      let id: string = String(params.iduser);
      
      if (id !== undefined) {
        let response = await this.usersService.getByIdPromise(id);

        this.userForm = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          email: new FormControl(response.email, []),
          image: new FormControl(response.image, []),
        }, [])

      }

    })

  }

  async getDataForm(): Promise<void> {

    if (this.userForm.value._id) {
      //actualizar
      let response = await this.usersService.update(this.userForm.value)

      if (response._id) {
        alert('Usuario insertado correctamente');
        this.router.navigate(['/home']);
      } else {
        alert('Error al actualizar el usuario');
      }



    } else {
      //insertar
      let response = await this.usersService.insert(this.userForm.value);

      if (response._id) {
        alert('Usuario insertado correctamnet');
        this.router.navigate(['/home']);
      } else {
        alert('Ha habido un error, intentalo de nuevo');
      }

    }


  }

}
