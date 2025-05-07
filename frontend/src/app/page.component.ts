import { Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { cleanAndValidate, blobToBase64 } from './helpers';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class PageComponent implements OnInit {

  image = signal<string | null>(null);

  API_URL:string = '';

  constructor(
    private route: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const fullPath = this.route.url;
    const segments = fullPath.split('/').filter(Boolean);
    const rawName = segments[segments.length - 1] || '';

    if (!rawName) return;

    const cleanedName = cleanAndValidate(rawName);

    if (!cleanedName) return;

    const cached = localStorage.getItem(cleanedName);

    if (cached) {
      this.image.set(cached);
      return;
    }

    try {
      const blob = await firstValueFrom(
        this.http.get(`/api/getLogo`, {
          params: { q: cleanedName },
          responseType: 'blob'
        })
      );

      if(!blob) {
        throw new Error("No blob received");
      }

      const base64 = await blobToBase64(blob);
      localStorage.setItem(cleanedName, base64);
      this.image.set(base64);
    } catch (e) {
      console.error(e);
    }
  }


  onImgError() {
    this.image.set(null);
  }
}

