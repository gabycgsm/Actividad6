import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  activedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  router = inject(Router);

  oneUser!: User | any;

  //observable
  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: any) => {
      let id = String(params.iduser);

      this.usersService.getById(id).subscribe((response) => {
        this.oneUser = response;        
      });


    })
  }

  //promesa
  /*ngOnInit(): void{

    this.activedRoute.params.subscribe((params: any) => {
      let id: string = String(params.iduser)
      this.oneUser = this.usersService.getByIdPromise(id);
    })    
  }*/

  async deleteUser(id: string): Promise<void> {

    let response = await this.usersService.delete(id);

    if (confirm("Deseas borrar el usuario ? " + response.first_name + " " + response.last_name)) {
            
      if (response) {
        alert('El usuario se borro correctamente');
        this.router.navigate(['/home'])
      }
    }


  }


}



