import { Component, OnInit } from '@angular/core';
import { Flier } from 'src/app/shared/classes/flier';
import { ActivatedRoute, Router } from '@angular/router';
import { FlierService } from 'src/app/shared/services/flier.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import * as moment from 'moment';

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
  isLoading: Boolean = true;

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

      let treatedDate = moment(response['data'].withdrawDate).format('DD/MM/YYYY HH:mm');

      this.flier = response['data'];
      this.flier.withdrawDate = treatedDate

      this.isLoading = false;


    } catch (err) {
      this.toastr.showError('Erro ao recuperar o panfleto', 'Erro');
      throw err;
    }
  }

  async updateFlier() {
    try {
      let acumData = Object.assign({}, this.flier);

      acumData.withdrawDate = moment(this.flier.withdrawDate, 'DD/MM/YYYY').toISOString();
      acumData.quantityFlier = this.flier.quantityFlier;
      acumData.responsible = this.flier.responsible;
      acumData.observation = this.flier.observation;
      acumData.startingDistributionDate = moment(this.flier.startingDistributionDate, 'DD/MM/YYYY').toISOString();
      acumData.endingDistributionDate = moment(this.flier.endingDistributionDate, 'DD/MM/YYYY').toISOString();

      await this.flierService.update(acumData, this.id);

      this.toastr.showSuccess('Panfleto atualizado com sucesso', 'Sucesso');
      this.router.navigate(['/fliers'])

    } catch (err) {
      this.toastr.showError('Erro ao atualizar o panfleto', 'Erro');

      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/fliers']);
  }
}
