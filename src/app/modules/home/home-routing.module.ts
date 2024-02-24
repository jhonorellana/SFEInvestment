import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/investment/investment.module').then(m => m.InvestmentModule)
  },
  {
    path: 'cashflow',
    loadChildren: () => import('@modules/cashflow/cashflow.module').then(m => m.CashflowModule)
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
    path: 'investment',
    loadChildren: () => import('@modules/investment/investment.module').then(m => m.InvestmentModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('@modules/balance/balance.module').then(m => m.BalanceModule)
  },
  {
    path: 'variations',
    loadChildren: () => import('@modules/variations/variations.module').then(m => m.VariationsModule)
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
    path: 'variationregister',
    loadChildren: () => import('@modules/variationregister/variationregister.module').then(m => m.VariationregisterModule)
  },
  {
    path: 'othervalue',
    loadChildren: () => import('@modules/othervalue/othervalue.module').then(m => m.OthervalueModule)
  },
  {
    path: 'inversion',
    loadChildren: () => import('@modules/inversion/inversion.module').then(m => m.InversionModule)
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
