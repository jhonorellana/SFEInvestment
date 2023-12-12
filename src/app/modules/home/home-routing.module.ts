import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/investment/investment.module').then(m => m.InvestmentModule)
  },
  {
    path: 'investment',
    loadChildren: () => import('@modules/investment/investment.module').then(m => m.InvestmentModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('@modules/statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('@modules/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'shares',
    loadChildren: () => import('@modules/shares/shares.module').then(m => m.SharesModule)
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/investment'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
