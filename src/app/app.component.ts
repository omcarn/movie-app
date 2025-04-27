import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppContainerComponent } from '../components/app-container/app-container.component';
import { names } from '../constants/names';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AppContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = names.APP_NAME;
}
