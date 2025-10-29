import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
