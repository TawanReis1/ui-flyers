import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../shared/classes/client';
import { ClientService } from '../../../shared/services/client.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import swal from 'sweetalert2';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  client: Client = new Client();
  id: String;
  isLoading: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private clientService: ClientService, private toastr: ToastrHelper) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getClientById();

  }

  async getClientById() {
    try {
      let response = await this.clientService.getById(this.id);

      this.client = response['data'];
      this.isLoading = false;

    } catch (err) {
      this.toastr.showError('Erro ao recuperar a compra', 'Erro');

      throw err;
    }
  }

  async deleteClient(id) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#6C757D',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#159588',
      confirmButtonText: 'Sim, apague!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.clientService.delete(id)
          .then(res => {
            this.router.navigate(['/clients']);
          });
        swal(
          'Apagado!',
          'O cliente foi apagado com sucesso.',
          'success'
        );
      }
    });
  }

  async updateClient() {
    try {
      let acumData = Object.assign({}, this.client);

      acumData.name = this.client.name;
      acumData.type = this.client.type;
      acumData.address = this.client.address;
      acumData.telephone = this.client.telephone;
      acumData.email = this.client.email;

      await this.clientService.update(acumData, this.id);

      this.toastr.showSuccess('Cliente atualizado com sucesso', 'Sucesso');
      this.router.navigate(['/clients'])

    } catch (err) {
      this.toastr.showError('Erro ao atualizar o cliente', 'Erro');

      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/clients']);
  }

}
