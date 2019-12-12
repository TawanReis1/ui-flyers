import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { Flier } from '../../../shared/classes/flier';
import { FlierService } from 'src/app/shared/services/flier.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-flier',
  templateUrl: './new-flier.component.html',
  styleUrls: ['./new-flier.component.scss']
})
export class NewFlierComponent implements OnInit {
  flier: Flier = new Flier();
  allClients: any = [];
  datePickerConfig: any;

  constructor(private router: Router ,private toastr: ToastrHelper ,private flierService: FlierService, private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  async getClients() {
    try {
      let filterFields = { page: 1, limit: 10 }

      let response;
      do {
        response = await this.clientService.get(filterFields);
        console.log('response :', response);
        this.allClients.push(...response.data);

        filterFields.page++;

      } while (response.data.length > 0)

    } catch (err) {
      this.toastr.showError('Erro ao listar as compras', 'Erro');
      throw err;
    }
  }

  async createFlier() {
    try {
      await this.flierService.create(this.flier);

      this.toastr.showSuccess('Panfleto cadastrado com sucesso!', 'Sucesso');
      this.router.navigate(['/fliers']);

      return;

    } catch (err) {
      this.toastr.showError('Erro ao cadastrar cliente', 'Erro')
      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/fliers']);
  }

}
