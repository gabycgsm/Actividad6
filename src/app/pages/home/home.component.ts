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

  totalPages: number = 0;


  usersService = inject(UsersService);

  /*ngOnInit(){
    this.usersService.getAll(1)
    .then( (response) => {    
      console.log('response');
      console.log(response)  
      this.arrUser = response;               
    })
    .catch( (error) => {
      console.log(error);
    })

  }*/

  objectKeys(objeto: any) {
    const keys = Object.keys(objeto.results);
    console.log('object key');
    console.log(objeto.results);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
  }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.usersService.getAll(1);
      this.totalPages = response.total_pages;            
      
      this.arrUser = response.results;
    } catch (error) {
      console.log(error)
    }

  }

  /*ngOnInit(){
    this.usersService.getAllUser().subscribe( (data) => {
      this.arrUser = data;
    })

  }*/


}
