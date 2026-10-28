
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projekte-liste',
    pathMatch: 'full'
  },
  {
    path: 'projekte-liste',
    loadChildren: () =>
      import('./pages/projekte-liste/projekte-liste.module')
        .then(m => m.ProjekteListePageModule)
  },
  {
    path: 'projekt-detail/:id',
    loadChildren: () =>
      import('./pages/projekt-detail/projekt-detail.module')
        .then(m => m.ProjektDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
