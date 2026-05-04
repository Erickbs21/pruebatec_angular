import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header">
      <div class="header-content">
        <div class="logo">
          <h1>MOTO<span>QUOTE</span></h1>
        </div>
        <nav>
          <p class="subtitle">{{ title }}</p>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      margin-bottom: 3rem;
      padding: 2rem 0;
      border-bottom: 1px solid var(--glass-border);
    }
    .header-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo h1 {
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: var(--text-primary);
    }
    .logo span {
      color: var(--text-secondary);
      font-weight: 300;
    }
    .subtitle {
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
}
