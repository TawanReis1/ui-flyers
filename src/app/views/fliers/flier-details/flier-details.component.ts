import { Component, OnInit } from '@angular/core';
import { Flier } from 'src/app/shared/classes/flier';
import { ActivatedRoute, Router } from '@angular/router';
import { FlierService } from 'src/app/shared/services/flier.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import * as moment from 'moment';
import { stringify } from 'querystring';

@Component({
  selector: 'app-flier-details',
  templateUrl: './flier-details.component.html',
  styleUrls: ['./flier-details.component.scss']
})
export class FlierDetailsComponent implements OnInit {
  datePickerConfig: any;
  flier: Flier = new Flier();
  flierInformations: any;
  id: String;
  clientName: any;
  isLoading: Boolean = true;
  clickedSetHour = {
    retirada: false,
    inicio_distribuicao: false,
    termino_distribuicao: false,
  };
  
  constructor(private route: ActivatedRoute, private router: Router, private flierService: FlierService, private toastr: ToastrHelper) {
    this.datePickerConfig = {
      firstDayOfWeek: 'su',
      monthFormat: 'MMM, YYYY',
      disableKeypress: false,
      allowMultiSelect: false,
      onOpenDelay: 0,
      weekDayFormat: 'ddd',
      appendTo: document.body,
      drops: 'down',
      opens: 'right',
      showNearMonthDays: true,
      showWeekNumbers: false,
      enableMonthSelector: true,
      format: "DD/MM/YYYY HH:mm",
      yearFormat: 'YYYY',
      showGoToCurrent: true,
      dayBtnFormat: 'DD',
      monthBtnFormat: 'MMM',
      hours12Format: 'hh',
      hours24Format: 'HH',
      meridiemFormat: 'A',
      minutesFormat: 'mm',
      minutesInterval: 1,
      secondsFormat: 'ss',
      secondsInterval: 1,
      showSeconds: false,
      showTwentyFourHours: true,
      timeSeparator: ':',
      multipleYearsNavigateBy: 10,
      showMultipleYearsNavigation: false,
      locale: 'pt-BR',
    }
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    await this.getFlierInformations(this.id)
  }

  async getFlierInformations(id) {
    try {
      let response = await this.flierService.getById(id);

      // let treatedDate = moment(response['data'].withdrawDate).format('DD/MM/YYYY HH:mm');

      this.flier = response['data'];
      // this.flier.withdrawDate = treatedDate
      this.clientName = this.flier.clientId['name'];

      this.isLoading = false;


    } catch (err) {
      this.toastr.showError('Erro ao recuperar o panfleto', 'Erro');
      throw err;
    }
  }

  async updateFlier() {
    try {
      let acumData = Object.assign({}, this.flier);

      if (this.flier.withdrawDate && (!this.flier.quantityFlier || !this.flier.responsible)) {
        throw ({treated_error: true, message: "Dados de retirada estão incompletos!"});
      }

      acumData.quantityFlier = this.flier.quantityFlier;
      acumData.responsible = this.flier.responsible;
      acumData.observation = this.flier.observation;
      acumData.withdrawDate = this.flier.withdrawDate;
      acumData.startingDistributionDate = this.flier.startingDistributionDate;
      acumData.endingDistributionDate = this.flier.endingDistributionDate;

      await this.flierService.update(acumData, this.id);

      this.toastr.showSuccess('Panfleto atualizado com sucesso', 'Sucesso');
      this.router.navigate(['/fliers'])

    } catch (err) {
      if (err.treated_error) {
        this.toastr.showError(err.message, 'Erro');
      } else {
        this.toastr.showError('Erro ao atualizar o panfleto', 'Erro');
      }

      throw err;
    }
  }

  setHour(origin) {
    switch (origin) {
      case 'retirada':
        this.flier.withdrawDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.clickedSetHour[origin] = true;

        break;

      case 'inicio_distribuicao':
        this.flier.startingDistributionDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.clickedSetHour[origin] = true;

        break;

      case 'termino_distribuicao':
        this.flier.endingDistributionDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.clickedSetHour[origin] = true;

        break;
    }
  }

  removeHour(origin) {
    switch(origin) {
      case 'retirada':
        this.flier.withdrawDate = "";
        break;

      case 'inicio_distribuicao':
        this.flier.startingDistributionDate = "";
        break;

      case 'termino_distribuicao':
        this.flier.endingDistributionDate = "";
        break;
    }
  }

  cancel() {
    this.router.navigate(['/fliers']);
  }
}
