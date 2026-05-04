import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-group">
      <label class="input-label" [for]="id">{{ label }}</label>
      <div class="input-wrapper">
        <span class="prefix" *ngIf="prefix">{{ prefix }}</span>
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          class="custom-input"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          [disabled]="disabled"
        />
      </div>
      <div class="error-message" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .prefix {
      position: absolute;
      left: 1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .prefix + input {
      padding-left: 2.5rem;
    }
    .error-message {
      color: #f87171;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      font-weight: 400;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = crypto.randomUUID();
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() prefix: string = '';
  @Input() error: string = '';

  value: any = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: any): void {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
