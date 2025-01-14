import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CalculationService} from '../services/calculation.service';
import {AsyncPipe, DecimalPipe, NgIf} from '@angular/common';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-compound-calculation',
  templateUrl: './compound-calculation.component.html',
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatLabel,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    DecimalPipe,
    MatFormField,
    MatInput,
    FormsModule,
    MatSlideToggle,
    MatDivider,
    ReactiveFormsModule,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    NgIf,
    MatCardTitle,
    MatHeaderRowDef,
    MatRowDef
  ],
  styleUrls: ['./compound-calculation.component.scss']
})
export class CompoundCalculationComponent {
  apiForm: FormGroup;
  calculationServiceResponse$: Observable<any> | null = null;

  private fb = inject(FormBuilder);
  private calculationService = inject(CalculationService);

  constructor() {
    this.apiForm = this.fb.group({
      originalPrincipalSum: [200000, Validators.required],
      nominalAnnualInterestRate: [0.03, Validators.required],
      compoundingFrequency: [12, Validators.required],
      time: [10, Validators.required],
      includeDetails: [true, Validators.required],
    });
  }

  submitForm() {
    if (this.apiForm.valid) {
      this.calculationServiceResponse$ = this.calculationService.callApi(this.apiForm.value);
    }
  }

  clearForm() {
    this.apiForm.reset({
      originalPrincipalSum: 200000,
      nominalAnnualInterestRate: 0.03,
      compoundingFrequency: 12,
      time: 10,
      includeDetails: true,
    });
    this.calculationServiceResponse$ = null;
  }
}
