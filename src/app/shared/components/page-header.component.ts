import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header glass-card">
      <div class="header-content">
        <div class="logo">
          <span class="icon">🏍️</span>
          <h1>Moto<span>Quote</span></h1>
        </div>
        <nav>
          <p class="subtitle">{{ title }}</p>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
      padding: 1.5rem 2rem;
      border-radius: 0 0 24px 24px;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .logo span {
      color: var(--primary-color);
    }
    .subtitle {
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 1.1rem;
    }
    .icon {
      font-size: 1.5rem;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
}
