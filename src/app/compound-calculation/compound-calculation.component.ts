import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalculationService} from '../services/calculation.service';
import {DecimalPipe, NgIf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {tap} from 'rxjs';
import {ThemeService} from '../services/theme.service';

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
    ReactiveFormsModule,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    NgIf,
    MatCardTitle,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatCardContent,
    MatCardActions,
    MatCardImage
  ],
  styleUrls: ['./compound-calculation.component.scss']
})
export class CompoundCalculationComponent implements AfterViewInit{
  apiForm: FormGroup;
  finalAmount?: number;
  detailsDatasource!: MatTableDataSource<any>;
  length? = 0;
  displayedColumns: string[] = ['periodNumber', 'startingAmount', 'interestForPeriod', 'accumulatedValue'];
  details?: any[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private calculationService: CalculationService, protected themeService: ThemeService) {
    this.apiForm = this.fb.group({
      originalPrincipalSum: [200, Validators.required],
      nominalAnnualInterestRate: [0.04, Validators.required],
      compoundingFrequency: [12, Validators.required],
      monthlyDeposit: [0, Validators.required],
      depositAtStart: [true, Validators.required],
      time: [1, Validators.required],
      includeDetails: [true, Validators.required],
    });
  }

  submitForm() {
    console.log("Submit event");
    console.log("paginator = ", this.paginator);
    this.detailsDatasource = new MatTableDataSource();
    if (this.apiForm.valid) {
      this.calculationService.callApi(this.apiForm.value)
        .subscribe(data =>{
          console.log(data.details);
          this.details = data.details;
          this.length = this.details?.length;
          this.detailsDatasource = new MatTableDataSource(this.details);
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
      originalPrincipalSum: 200,
      nominalAnnualInterestRate: 0.04,
      compoundingFrequency: 12,
      monthlyDeposit: 0,
      depositAtStart: true,
      time: 1,
      includeDetails: true,
    });
    this.finalAmount = undefined;
    this.details = undefined;
    this.detailsDatasource = new MatTableDataSource();
  }

  getDetailsPage(pageIndex: number, pageSize: number, sortOrder: string, details: any[] | undefined) {
    console.log("getDetailsPage called. detailsDatasource.data = ", this.detailsDatasource.data);
    const slice = this.details?.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
    console.log("Slice = ", slice, pageIndex, pageIndex);
    return slice;
  }

  ngAfterViewInit(): void {
    this.paginator?.page
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
    // @ts-ignore
    this.detailsDatasource.data = this.getDetailsPage(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 6,
      "asc",
      this.details);
  }

  onPageChange($event: PageEvent) {
    console.log("onPageChange called");
    console.log("pageSize = ", this.paginator.pageSize);
    console.log("PageIndex = ", this.paginator.pageIndex);
    console.log("Datasource ", this.detailsDatasource.data);
    console.log("Details ", this.details);
    this.paginator.pageSize = $event.pageSize;
    this.paginator.pageIndex = $event.pageIndex;
    this.loadDetailsPage();
  }
}
