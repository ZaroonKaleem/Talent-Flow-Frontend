import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BankBranchService } from '../../../../../Services/Constants Services/bank-branch.service';
import { EmployeeBankService } from '../../../../../Services/Constants Services/employee-bank.service';
import { EmployeeCityService } from '../../../../../Services/Constants Services/employee-city.service';
import { EmployerBankService } from '../../../../../Services/Constants Services/employer-bank.service';

@Component({
  selector: 'app-add-new-bank-branch-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './add-new-bank-branch-dialog.component.html'
})
export class AddNewBankBranchDialogComponent implements OnInit {
  bankBranchData = {
    id: 0,
    name: '',
    EmployerBankId: 0,
    cityId: 0,
    branchNumber: '',
    accountNumber: '',
    accountName: ''
  };
  banks: any[] = [];
  cities: any[] = [];

  constructor(
    private bankBranchService: BankBranchService,
    private employeeCityService: EmployeeCityService,
    private employerBankService: EmployerBankService,
    public dialogRef: MatDialogRef<AddNewBankBranchDialogComponent>
  ) {}

  ngOnInit() {
    this.loadBanks();
    this.loadCities();
  }

  loadBanks() {
    this.employerBankService.getAllEmployerBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.banks = response.result.items;
        } else {
          this.banks = [];
        }
      },
      error: (error) => {
        console.error('Error loading banks:', error);
        this.banks = [];
      }
    });
  }

  loadCities() {
    this.employeeCityService.getAllCities().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.cities = response.result.items;
        } else {
          this.cities = [];
        }
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        this.cities = [];
      }
    });
  }

  isFormValid(): boolean {
    return !!this.bankBranchData.name &&
           this.bankBranchData.EmployerBankId > 0 &&
           this.bankBranchData.cityId > 0 &&
           !!this.bankBranchData.branchNumber &&
           !!this.bankBranchData.accountNumber &&
           !!this.bankBranchData.accountName;
  }

  onSave() {
    if (this.isFormValid()) {
      this.bankBranchService.createBankBranch(this.bankBranchData).subscribe({
        next: (response) => {
          if (response.success) {
            this.dialogRef.close(this.bankBranchData);
          }
        },
        error: (error) => {
          console.error('Error creating bank branch:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}