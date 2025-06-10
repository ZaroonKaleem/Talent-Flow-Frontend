import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  hide = true;
  loginForm: FormGroup;
  isToggled = false;

  constructor(
    public fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService // <-- inject here

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberClient: [true]
    });

    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

// onSubmit() {
//   if (this.loginForm.invalid) return;

//   const loginData = {
//     userNameOrEmailAddress: this.loginForm.value.email,
//     password: this.loginForm.value.password,
//     rememberClient: this.loginForm.value.rememberClient
//   };

//   this.http.post<any>(`${environment.apiUrl}TokenAuth/Authenticate`, loginData).subscribe({
//     next: (res) => {
//       const result = res?.result;
//       if (result?.accessToken) {
//         localStorage.setItem('accessToken', result.accessToken);
//         console.log('accessToken set:', result.accessToken);

//         localStorage.setItem('encryptedAccessToken', result.encryptedAccessToken);
//         console.log('encryptedAccessToken set:', result.encryptedAccessToken);

//         localStorage.setItem('expireInSeconds', result.expireInSeconds.toString());
//         console.log('expireInSeconds set:', result.expireInSeconds);

//         localStorage.setItem('userId', result.userId.toString());
//         console.log('userId set:', result.userId);

//         this.router.navigate(['/employee-dashboard']);
//       } else {
//         alert('Login failed. Please check your credentials.');
//       }
//     },
//     error: (err) => {
//       console.error('Login error:', err);
//       alert('Login failed. Please try again.');
//     }
//   });
// }
onSubmit() {
  if (this.loginForm.invalid) {
    console.log('Form is invalid');
    return;
  }

  const loginData = {
    userNameOrEmailAddress: this.loginForm.value.email,
    password: this.loginForm.value.password,
    rememberClient: this.loginForm.value.rememberClient
  };

  console.log('Showing loader...');
  // alert('Loader show called');
  this.loaderService.show(); // Show loader

  this.http.post<any>(`${environment.apiUrl}TokenAuth/Authenticate`, loginData).subscribe({
    next: (res) => {
      console.log('Login success:', res);
      const result = res?.result;

      if (result?.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('encryptedAccessToken', result.encryptedAccessToken);
        localStorage.setItem('expireInSeconds', result.expireInSeconds.toString());
        localStorage.setItem('userId', result.userId.toString());

        this.router.navigate(['/employee-dashboard']);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    },
    error: (err) => {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    },
    complete: () => {
      console.log('Hiding loader...');
      // alert('Loader hide called');
      this.loaderService.hide(); // Hide loader
    }
  });
}


}
