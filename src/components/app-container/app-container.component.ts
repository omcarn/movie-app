import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MenuAndSearchComponent } from "../menu-and-search/menu-and-search.component";
import { MainContentComponent } from "../main-content/main-content.component";

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [HeaderComponent, MenuAndSearchComponent, MainContentComponent],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

}
