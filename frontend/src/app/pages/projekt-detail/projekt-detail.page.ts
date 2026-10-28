
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-projekt-detail',
  templateUrl: './projekt-detail.page.html',
  styleUrls: ['./projekt-detail.page.scss'],
  standalone: false
})
export class ProjektDetailPage implements OnInit {
  project: any = null;
  evaluations: any[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.error = 'Ungültige Projekt-ID.';
      this.loading = false;
      return;
    }

    this.api.getProject(id).subscribe({
      next: (data) => {
        this.project = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden des Projekts:', err);
        this.error = 'Das Projekt konnte nicht geladen werden.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.api.getEvaluations(id).subscribe({
      next: (data) => {
        this.evaluations = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Bewertungen:', err);
      }
    });
  }
}
