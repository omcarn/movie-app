import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { environment } from '../environment'; 

@Injectable({
  providedIn: 'root'  
})
export class BasicService {

  items: any = []; // movies list
  originType = 'All'; // default value
  UpdateListSubject: Subject<any> = new Subject<any>();
  UpdateList$ = this.UpdateListSubject.asObservable();

  ResetSearchAndGenreSubject: Subject<any> = new Subject<any>();
  ResetSearchAndGenre$ = this.ResetSearchAndGenreSubject.asObservable();

  isProduction = environment.production; // Set to true for production build

  apiUrl = environment.apiUrl; // Update with your API URL

  constructor(private httpClient : HttpClient , private sanitizer : DomSanitizer) { }

  reset() {
    this.originType = 'All';
    this.getMovieList().subscribe((data : any) => {
      data.forEach((item: any) => {
        item.isLoading = true;
        item.trailerEmbedLink = this.sanitizer.bypassSecurityTrustHtml(`<iframe width="100%" height="100%" appIframeLoad (loading)="'eager'" (iframeLoaded)="hideTrailerSpinner(item.id)" src="${item.trailerEmbedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
      });
      this.items = data;
      this.UpdateListSubject.next(0);
      this.ResetSearchAndGenreSubject.next(0);
    });
    
  }

  getMovieList() {
    return this.httpClient.get<any[]>(`${this.apiUrl}/movies`);
  }

  getMovieListFromService() {
    return this.items;
  }

  setMovieListInService(data:any) {
    this.items = data;
  }

  getMoviesListByGenre(genre: string[]) {

    const requestBody = {
      genre: genre,
      originType: this.originType
    }

    return this.httpClient.post<any[]>(`${this.apiUrl}/movies/genre?`,requestBody);
  }

  getMoviesListBySearch(searchText: any,genre: string[]) {

    const requestBody = {
      searchText,
      genre,
      originText: this.originType
    }
    return this.httpClient.post<any[]>(`${this.apiUrl}/movies/search?`,requestBody);
  }

  likeMovie(movieId: any) {
    return this.httpClient.get(`${this.apiUrl}/movies/${movieId}/like`);
  }

  likeExceptionalMovie(movieId: any) {
    return this.httpClient.get(`${this.apiUrl}/movies/${movieId}/exceptional`);
  }

  onQuickLinkClick(genre: any[]) {
    
    this.getMoviesListByGenre(genre).subscribe((data: any) => {
      let movieList = data;
      movieList.forEach((item: any) => {
        item.isLoading = true;
        item.trailerEmbedLink = this.sanitizer.bypassSecurityTrustHtml(`<iframe width="100%" height="100%" appIframeLoad (loading)="'eager'" (iframeLoaded)="hideTrailerSpinner(item.id)" src="${item.trailerEmbedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
      });
      if (movieList.length > 0) 
        this.setMovieListInService(data);
      else {
        this.setMovieListInService([]);
        alert("No movies found for this genre.");
      }
      this.UpdateListSubject.next(0);
      }
    );

  }

  onSearchClick(searchText: string, genre: string[]) {

    this.getMoviesListBySearch(searchText,genre).subscribe((data: any) => {
      let movieList = data;
      movieList.forEach((item: any) => {
        item.isLoading = true;
        item.trailerEmbedLink = this.sanitizer.bypassSecurityTrustHtml(`<iframe width="100%" height="100%" appIframeLoad (loading)="'eager'" (iframeLoaded)="hideTrailerSpinner(item.id)" src="${item.trailerEmbedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
      });
      if (movieList.length > 0) 
        this.setMovieListInService(data);
      else {
        this.setMovieListInService([]);
        alert("No movies found for the search input.");
      }
      this.UpdateListSubject.next(0);
      }
    );

  }

}
