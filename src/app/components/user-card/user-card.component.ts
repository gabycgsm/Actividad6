import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() miUser!: User | any;

  usersService = inject(UsersService);
  router = inject(Router);

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
