import { Routes } from '@angular/router';
import {CompoundCalculationComponent} from './compound-calculation/compound-calculation.component';
import {TestDragDropComponent} from './test-drag-drop/test-drag-drop.component';

export const routes: Routes = [
  {
    path: 'compound',
    component: CompoundCalculationComponent
  },
  {
    path: 'dragdrop',
    component: TestDragDropComponent
  }
];
