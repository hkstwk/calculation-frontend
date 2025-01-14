import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundCalculationComponent } from './compound-calculation.component';

describe('CompoundCalculationComponent', () => {
  let component: CompoundCalculationComponent;
  let fixture: ComponentFixture<CompoundCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
