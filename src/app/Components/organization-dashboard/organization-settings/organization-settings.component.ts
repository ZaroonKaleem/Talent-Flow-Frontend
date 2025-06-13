import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organization-settings',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './organization-settings.component.html',
  styleUrl: './organization-settings.component.scss'
})
export class OrganizationSettingsComponent {
menuItems = [
    { name: 'System-configuration', path: 'system-configuration' },
    { name: 'Custom Fields', path: 'custom-fields' },
    { name: 'Email Settings', path: 'email-settings' },
    { name: 'Company Settings', path: 'company-settings' },
    { name: 'Biometric Device Settings', path: 'biometric-device-settings' },
    { name: 'Card Template', path: 'card-template' },
  ];
}
