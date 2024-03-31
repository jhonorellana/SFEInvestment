import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []


  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth'],
      },
      {
        name: 'Resumen',
        icon: 'uil uil-notes',
        router: ['/', 'dailyoverview'],
      },
      {
        name: 'Acciones',
        icon: 'uil uil-chart-line',
        router: ['/', 'shares'],
      },
      {
        name: 'Bonos',
        icon: 'uil uil-bag',
        router: ['/', 'bonos'],
      },
      {
        name: 'Vencimientos',
        icon: 'uil uil-calendar-alt',
        router: ['/', 'history'],
      },
      {
        name: 'Flujo Efectivo',
        icon: 'uil uil-usd-circle',
        router: ['/', 'cashflow'],
      },
      {
        name: 'Portafolio',
        icon: 'uil uil-chart-pie',
        router: ['/', 'portfolio'],
      },
      {
        name: 'Inversiones',
        icon: 'uil uil-analytics',
        router: ['/', 'investment'],
      },
      {
        name: 'Balance',
        icon: 'uil uil-balance-scale',
        router: ['/', 'balance'],
      },
      {
        name: 'Crecimiento',
        icon: 'uil uil-comparison',
        router: ['/', 'variations'],
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Inversión',
        icon: 'uil-plus-square',
        router: ['/', 'inversion'],
      },
      {
        name: 'Historial',
        icon: 'uil-usd-square',
        router: ['/', 'variationregister'],
      },
      {
        name: 'Otros Valores',
        icon: 'uil uil-bill',
        router: ['/', 'othervalue'],
      }
    ]

    this.customOptions = [
      {
        name: 'Opción º1',
        router: ['/']
      },
      {
        name: 'Opción º2',
        router: ['/']
      }
    ]



  }
}
