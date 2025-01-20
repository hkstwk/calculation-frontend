import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalculationService} from '../services/calculation.service';
import {DecimalPipe, NgIf} from '@angular/common';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {tap} from 'rxjs';

@Component({
  selector: 'app-compound-calculation',
  templateUrl: './compound-calculation.component.html',
  imports: [
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
    MatRowDef,
    MatPaginator
  ],
  styleUrls: ['./compound-calculation.component.scss']
})
export class CompoundCalculationComponent implements AfterViewInit{
  apiForm: FormGroup;
  finalAmount?: number;
  detailsDatasource!: MatTableDataSource<any>;
  length = 0;
  displayedColumns: string[] = ['periodNumber', 'startingAmount', 'interestForPeriod', 'accumulatedValue'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private calculationService: CalculationService) {
    this.apiForm = this.fb.group({
      originalPrincipalSum: [200000, Validators.required],
      nominalAnnualInterestRate: [0.03, Validators.required],
      compoundingFrequency: [12, Validators.required],
      time: [1, Validators.required],
      includeDetails: [true, Validators.required],
    });
  }

  submitForm() {
    console.log("Submit event");
    console.log(this.paginator);
    if (this.apiForm.valid) {
      this.calculationService.callApi(this.apiForm.value)
        .subscribe(data =>{
          console.log(data);
          const details = data.details;
          this.length = details.length;
          this.detailsDatasource = new MatTableDataSource(details);
          this.detailsDatasource.paginator = this.paginator;
          this.finalAmount = data.finalAmount;

          this.loadDetailsPage();
          console.log(this.detailsDatasource?.data);
        });
    }
  }

  clearForm() {
    console.log("Clear event");
    this.apiForm.reset({
      originalPrincipalSum: 200000,
      nominalAnnualInterestRate: 0.03,
      compoundingFrequency: 12,
      time: 1,
      includeDetails: true,
    });
  }

  getDetailsPage(pageIndex: number, pageSize: number, sortOrder: string, details: any[]) {
    console.log("getDetailsPage called. detailsDatasource.data = ", this.detailsDatasource.data);
    const copyOfDetails: any[] = JSON.parse(JSON.stringify(details));
    const slice = copyOfDetails.slice(pageIndex, pageSize);
    console.log("Slice = ", slice, pageIndex, pageSize);
    return slice;
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          console.log("PageEvent emitted", this.paginator.page);
          this.loadDetailsPage()
        })
      )
      .subscribe();
  }

  private loadDetailsPage() {
    console.log("loadDetailsPage called;  ", this.detailsDatasource.data);
    console.log("paginator = ", this.paginator);
    this.detailsDatasource.data = this.getDetailsPage(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 6,
      "asc",
      this.detailsDatasource.data);
  }

  onPageChange($event: PageEvent) {
    console.log("onPageChange called");
    this.paginator.pageSize = $event.pageSize;
    this.paginator.pageIndex = $event.pageIndex;
    this.loadDetailsPage();
  }
}
