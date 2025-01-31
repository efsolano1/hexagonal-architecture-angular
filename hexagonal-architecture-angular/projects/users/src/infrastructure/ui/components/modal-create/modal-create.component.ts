import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'shared';

@Component({
  selector: 'lib-modal-create',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent {
  private destroy$ = new Subject<void>();
  // @Output() close = new EventEmitter<void>();

  registerForm = input<FormGroup>();
  submit = output<FormGroup>();
  close = output<void>();

  constructor(private alertService: AlertService) {
    this.alertService.alert$
      .pipe(takeUntil(this.destroy$))
      .subscribe((alert) => {
        if (alert) {
          this.close.emit();
        }
      });
  }
  onSubmit() {
    console.log('hola desde modal');
    if (this.registerForm().valid) {
      this.submit.emit(this.registerForm());
      this.close.emit();
    } else {
      this.alertService.showAlert(
        'Error',
        'Por favor, rellene todos los campos.'
      );
    }
  }

  onNoClick(): void {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
