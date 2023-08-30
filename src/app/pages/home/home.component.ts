import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  arrUser: User[] = [];


  usersService = inject(UsersService);

  ngOnInit(){
    this.usersService.getAll()
    .then( (response) => {      
      this.arrUser = response;               
    })
    .catch( (error) => {
      console.log(error);
    })

  }

  objectKeys(objeto: any) {
    const keys = Object.keys(objeto.results);
    console.log('object key');
    console.log(objeto.results);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
  }

  /*async ngOnInit(): Promise<void> {
    try {
      this.arrUser = await this.usersService.getAll();
    } catch (error) {
      console.log(error)
    }

  }*/


}
