import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flier } from '../../../shared/classes/flier';
import { FlierService } from '../../../shared/services/flier.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-flier-list',
  templateUrl: './flier-list.component.html',
  styleUrls: ['./flier-list.component.scss']
})
export class FlierListComponent implements OnInit {
  flier: Flier = new Flier();
  isLoading: Boolean;
  allFliers: any = {
    data: [],
    meta: {}
  };
  page: Number = 1;
  filterFields: any = {};
  filterCode: string;
  filterPurchaseDate: string;
  filterCashbackPercentage: string;
  filterStatus: string;
  datePickerConfig: any;

  constructor(private router: Router, private flierService: FlierService, private toastr: ToastrHelper) { }

  async ngOnInit() {
    await this.getFliers()
  }

  async getFliers(filterFields = {}) {
    try {
      this.isLoading = true;
      if (Object.keys(filterFields).length === 0) {
        filterFields = { page: this.page, limit: 10 }
      }

      let response = await this.flierService.get(filterFields);

      this.allFliers.data = response['data'];
      this.allFliers.meta = response['meta'];

      this.isLoading = false;

    } catch (err) {
      this.toastr.showError('Erro ao listar as compras', 'Erro');
      throw err;
    }
  }

  applyFilter() {
    try {
      this.filterFields = {
        filter_code: this.filterCode,
        filter_purchaseDate: this.filterPurchaseDate ? moment(this.filterPurchaseDate).format('YYYY-MM-DD') : "",
        filter_cashbackPercentage: this.filterCashbackPercentage,
        filter_status: this.filterStatus
      }

      this.formatFilterFields();
      this.getFliers(this.filterFields);
    } catch (err) {
      this.toastr.showError('Erro ao filtrar as compras', 'Erro');
      throw err;
    }

  }

  clearFilter() {
    try {
      this.filterCode = "";
      this.filterPurchaseDate = "";
      this.filterStatus = "";
      this.getFliers();
    } catch (err) {
      this.toastr.showError('Erro ao limpar os campos do filtro', 'Erro');
      throw err;
    }
  }

  async changePage(page) {
    try {
      this.page = page;
      this.filterFields['page'] = this.page;

      this.formatFilterFields();
      await this.getFliers(this.filterFields)

    } catch (err) {
      this.toastr.showError('Erro ao acessar outra página', 'Erro');
      throw err;
    }
  }

  changeScreen(screen, id) {
    try {
      if (screen === 'new') {
        this.router.navigate(['/fliers/new/flier']);
      } else {
        this.router.navigate(['/fliers/', id]);
      }

    } catch (err) {
      this.toastr.showError('Erro ao acessar outra tela', 'Erro');
      throw err;
    }
  }

  formatFilterFields() {
    for (let key in this.filterFields) {
      if (!this.filterFields[key]) delete this.filterFields[key]
    }
  }

  async deleteFlier(id, i) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#6C757D',
      confirmButtonColor: '#159588',
      confirmButtonText: 'Sim, apague!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.flierService.delete(id)
          .then(res => {
            this.allFliers.data.splice(i, 1);
            // this.allFliers.meta.totalItems =- 1;
          });
        swal(
          'Apagado!',
          'O Panfleto foi apagado com sucesso.',
          'success'
        );
      }
    });
  }

  enterDetails(id) {
    this.router.navigate(['/fliers', id]);
  }
}
