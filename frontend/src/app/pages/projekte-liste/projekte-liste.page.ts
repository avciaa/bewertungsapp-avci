
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-projekte-liste',
  templateUrl: './projekte-liste.page.html',
  styleUrls: ['./projekte-liste.page.scss'],
  standalone: false
})
export class ProjekteListePage implements OnInit {
  projects: any[] = [];
  loading = true;
  error = '';

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('Projektliste wird geladen...');

    this.api.getProjects().subscribe({
      next: (data) => {
        console.log('Projekte vom Backend:', data);
        this.projects = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Projekte:', err);
        this.error = 'Projekte konnten nicht geladen werden.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
