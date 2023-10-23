import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// flag para saber se é fisio ou paciente
// TODO - implementar por auth, agora vai ser uma constante local
const isFisio = true;

interface MenuItem {
  show: string;
  router: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  private menuItemsFisio: MenuItem[] = [
    {
      show: 'Pacientes',
      router: 'pacientes'
    },
    {
      show: 'Agenda',
      router: 'agenda'
    },
    {
      show: 'Mídia',
      router: 'midias'
    }
  ];
  private menuItemsPaciente = [
    {
      show: 'Consultas',
      router: 'consultas'
    },
    {
      show: 'Tratamentos',
      router: 'tratamentos'
    },
    {
      show: 'Agenda',
      router: 'agenda'
    }
  ];

  private menuItems: MenuItem[] = isFisio ? this.menuItemsFisio : this.menuItemsPaciente;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public get menuItemsList(): MenuItem[] {
    return this.menuItems;
  }
}
