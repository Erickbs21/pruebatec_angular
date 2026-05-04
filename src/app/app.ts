import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './features/shared/header';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div class="min-h-screen bg-zinc-50 flex flex-col">
      <app-header></app-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <footer class="py-8 border-t border-zinc-200">
        <div class="max-w-7xl mx-auto px-4 text-center text-zinc-400 text-xs tracking-widest uppercase font-mono">
          © 2026 MotoCotiza • Amortización de Ciclos
        </div>
      </footer>
    </div>
  `,
  styles: [],
})
export class App {}
