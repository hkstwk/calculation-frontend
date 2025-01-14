import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTreeComponent } from './test-tree.component';

describe('TestTreeComponent', () => {
  let component: TestTreeComponent;
  let fixture: ComponentFixture<TestTreeComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
