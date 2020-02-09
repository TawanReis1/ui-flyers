import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/classes/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  client = new Client();
  allUsers: any = [];
  isLoading: Boolean = true;
  selectedUser: any;

  constructor(private clientService: ClientService, private userService: UserService, private toastr: ToastrHelper, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  setClientEmail(user) {
    this.client.email = user.email;
  }

  async getUsers() {
    try {
      let filterFields = { page: 1, limit: 10 }

      let response;
      do {
        response = await this.userService.get(filterFields);
        this.allUsers.push(...response.data);

        filterFields.page++;

      } while (response.data.length > 0)

      this.isLoading = false;

    } catch (err) {
      this.toastr.showError('Erro ao listar os usuários', 'Erro');
      throw err;
    }
  }

  async createClient() {
    try {
      this.client.userId = this.selectedUser._id;
      await this.clientService.create(this.client);

      this.toastr.showSuccess('Cliente cadastrado com sucesso!', 'Sucesso');
      this.router.navigate(['/clients']);

      return;

    } catch (err) {
      this.toastr.showError('Erro ao cadastrar cliente', 'Erro')
      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/clients']);
  }

}
