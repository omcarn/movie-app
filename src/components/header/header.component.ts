import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  shareNative() {
    if (navigator.share) {
      navigator.share({
        title: 'Movies Buff',
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

}
