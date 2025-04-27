import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IframeLoadDirective } from '../../directives/iframe-load.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { BasicService } from '../../services/basic.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule , HttpClientModule, FormsModule, CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent{

  currentMovie: any = null;
  originType = 'All'; // default value
  items: any = []; // movies list
  hasLiked : boolean = false;
  hasLikedExceptional : boolean = false;
  debounceTimeout: any = null;

  constructor(private sanitizer: DomSanitizer, private basicService: BasicService) {

    this.basicService.getMovieList().subscribe((data : any) => {
      data.forEach((item: any) => {
        item.isLoading = true;
        item.trailerEmbedLink = this.sanitizer.bypassSecurityTrustHtml(`<iframe width="100%" height="100%" appIframeLoad (loading)="'eager'" (iframeLoaded)="hideTrailerSpinner(item.id)" src="${item.trailerEmbedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
      });
      this.items = data;
    });

    this.basicService.UpdateList$.subscribe((data: any) => {
      this.items = this.basicService.getMovieListFromService();
    });
  }

  onOriginChange(value: any) {
    this.basicService.originType = value;
  }

  reset() {
    this.basicService.originType = this.originType = 'All';

    if(this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.basicService.reset();
    }, 1000);


    
  }

  setModalDetails(item: any) {
    this.hasLiked = this.hasLikedExceptional = false;
    this.currentMovie = item;
  }

  topFunction(){document.body.scrollTop=0;document.documentElement.scrollTop=0;}

  shareNative() {
    if (navigator.share) {
      navigator.share({
        title: 'Movie',
        //text: decodeURIComponent(shareText),
        url: window.location.href
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.log("Error sharing:", error));
    } else {
      this.copyToClipboard(window.location.href);
      alert("Link copied to clipboard! 📋");
    }
  }

  copyToClipboard(text : any) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  hideTrailerSpinner(index: number) {    
      this.items[index-1].isLoading = false;  
  }

  addLikeCount(index: number) {
    this.hasLiked = true;

    this.basicService.likeMovie(index).subscribe({
      next: (data:any) => {
        console.log('Liked!');
        this.items[index-1].likeCount = this.currentMovie.likeCount += 1;
        this.hasLiked = true;
      },
      error: err => console.error('Error liking movie:', err)
    });

  }

  addExceptionalCount(index: number) {
    this.hasLikedExceptional = true;

    this.basicService.likeExceptionalMovie(index).subscribe({
      next: (data:any) => {
        console.log('Liked!');
        this.items[index-1].exceptionalCount = this.currentMovie.exceptionalCount += 1;
        this.hasLikedExceptional = true;
      },
      error: err => console.error('Error liking movie:', err)
    });
  }
}
