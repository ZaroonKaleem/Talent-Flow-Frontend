import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatCard } from '@angular/material/card';

 interface UserProfile {
  name: string;
  employeeId: string;
  title: string;
  department?: string;
  profileImage?: string;
  isActive?: boolean;
  birthdayToday?: boolean;
  workAnniversaryToday?: boolean;
  yearsOfService?: number;
  // Add any additional user properties you need
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
  MatCard,
  CommonModule, 
  MatIconModule, 
  MatButtonModule
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

    isToggled = false;

    //  @Input() user!: UserProfile;

   constructor(
          public themeService: CustomizerSettingsService
      ) {
          this.themeService.isToggled$.subscribe(isToggled => {
              this.isToggled = isToggled;
          });
      }
 

// Default user data (optional - can be removed if you always pass data from parent)
user: UserProfile = {
  name: 'John Doe',
  employeeId: 'EMP-00142',
  title: 'Senior Software Engineer',
  department: 'Product Development',
  profileImage: 'assets/images/avatars/default-profile.png',
  isActive: true,
  birthdayToday: false,
  workAnniversaryToday: false,
  yearsOfService: 3
};
}
