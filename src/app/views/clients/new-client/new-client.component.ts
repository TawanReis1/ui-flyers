import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/classes/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  client = new Client();

  constructor(private clientService: ClientService, private toastr: ToastrHelper, private router: Router) { }

  ngOnInit() {
  }

  async createClient() {
    try {
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
