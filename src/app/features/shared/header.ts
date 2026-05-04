import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="bg-white border-b border-editorial-border sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-12">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center gap-12">
            <div class="flex items-center">
              <span class="text-2xl font-bold tracking-tighter uppercase">MOTO<span class="font-light">FINANCE</span></span>
            </div>
            
            <nav class="hidden md:flex gap-8">
              <a routerLink="/nueva-cotizacion" 
                 routerLinkActive="text-editorial-text border-b-2 border-editorial-text"
                 class="micro-label pb-1 hover:text-editorial-text transition-colors">
                Nueva Cotización
              </a>
              <a routerLink="/cotizaciones" 
                 routerLinkActive="text-editorial-text border-b-2 border-editorial-text"
                 class="micro-label pb-1 hover:text-editorial-text transition-colors">
                Mis Cotizaciones
              </a>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600">
              AC
            </div>
            <span class="micro-label hidden sm:block">Agente Comercial</span>
          </div>
        </div>
      </div>
    </header>
  `,
  standalone: true
})
export class Header {}
