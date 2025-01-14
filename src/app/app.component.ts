import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpHandler} from '@angular/common/http';

@Component({
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatToolbar,
    MatListItem,
    MatIconButton,
    MatSidenav,
    RouterLink,
    RouterOutlet
  ],
  providers: [
    HttpClientModule],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

}
