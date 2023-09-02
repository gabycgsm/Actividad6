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
  pages: number = 0;
  currentPage: number = 0;

  usersService = inject(UsersService);

  /*ngOnInit(){
    this.usersService.getAll(1)
    .then( (response) => {         
      this.arrUser = response;               
    })
    .catch( (error) => {
      console.log(error);
    })

  }*/

  async ngOnInit(): Promise<void> {
    this.verDatosPaginados(this.currentPage);

  }

  async verDatosPaginados(page: number): Promise<void> {
    try {
      let response = await this.usersService.getAll(page);
      this.arrUser = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;      
    } catch (error) {
      console.log(error)
    }

  }

}
