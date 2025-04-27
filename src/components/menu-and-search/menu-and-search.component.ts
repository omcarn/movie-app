import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { BasicService } from '../../services/basic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-and-search',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './menu-and-search.component.html',
  styleUrl: './menu-and-search.component.scss'
})
export class MenuAndSearchComponent {

  searchText: string = '';
  genreList: any = [];
  debounceTimeout: any = null;

  @ViewChildren('toggleBtn') toggleButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor(private basicService : BasicService) { 
    
    this.basicService.ResetSearchAndGenre$.subscribe((data: any) => {
      this.searchText = '';
      this.genreList = [];
      this.toggleButtons.forEach((button) => {
        const toggleButton = button.nativeElement;
        toggleButton.classList.remove('active'); // Remove the active class to visually "untoggle" it
      });

    });
  }

  onSearch() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.basicService.onSearchClick(this.searchText,this.genreList);
    },1000);
  }

  onQuickLinkClick(event: any) {
    const genre = event.target.innerText.toLowerCase();
      if(this.genreList.includes(genre)) {
        this.genreList = this.genreList.filter((item: any) => item !== genre);
      }
      else {
        this.genreList.push(genre);
      }
      this.basicService.onQuickLinkClick(this.genreList);
  }

}
