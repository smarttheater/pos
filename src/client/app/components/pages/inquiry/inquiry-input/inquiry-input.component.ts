import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as libphonenumber from 'libphonenumber-js';
import { OrderService, UtilService } from '../../../../services';

@Component({
    selector: 'app-inquiry-input',
    templateUrl: './inquiry-input.component.html',
    styleUrls: ['./inquiry-input.component.scss']
})
export class InquiryInputComponent implements OnInit {
    public inquiryForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private utilService: UtilService,
        private orderService: OrderService,
        private router: Router,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.createInquiryForm();
    }

    private createInquiryForm() {
        const TEL_MAX_LENGTH = 11;
        const TEL_MIN_LENGTH = 9;
        this.inquiryForm = this.formBuilder.group({
            confirmationNumber: ['', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ]],
            telephone: ['', [
                Validators.required,
                Validators.maxLength(TEL_MAX_LENGTH),
                Validators.minLength(TEL_MIN_LENGTH),
                Validators.pattern(/^[0-9]+$/),
                (control: AbstractControl): ValidationErrors | null => {
                    const field = control.root.get('telephone');
                    if (field !== null) {
                        const parsedNumber = libphonenumber.parse(field.value, 'JP');
                        if (parsedNumber.phone === undefined) {
                            return { telephone: true };
                        }
                        const isValid = libphonenumber.isValidNumber(parsedNumber);
                        if (!isValid) {
                            return { telephone: true };
                        }
                    }

                    return null;
                }
            ]]
        });
    }

    public async onSubmit() {
        Object.keys(this.inquiryForm.controls).forEach((key) => {
            this.inquiryForm.controls[key].markAsTouched();
        });
        this.inquiryForm.controls.confirmationNumber.setValue((<HTMLInputElement>document.getElementById('confirmationNumber')).value);
        this.inquiryForm.controls.telephone.setValue((<HTMLInputElement>document.getElementById('telephone')).value);
        if (this.inquiryForm.invalid) {
            return;
        }
        try {
            const confirmationNumber = this.inquiryForm.controls.confirmationNumber.value;
            const telephone = this.inquiryForm.controls.telephone.value;
            await this.orderService.inquiry({
                confirmationNumber,
                customer: { telephone }
            });
            this.router.navigate(['/inquiry/confirm']);
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('inquiry.input.validation')
            });
        }
    }

}
