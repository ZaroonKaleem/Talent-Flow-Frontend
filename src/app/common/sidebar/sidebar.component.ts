import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationEnd, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ToggleService } from '../header/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { SharedStateService } from '../../shared/shared-state.service';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [NgScrollbarModule, CommonModule,MatExpansionModule, RouterLinkActive, RouterLink, NgClass],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit,OnDestroy {

 currentTab: string = 'employee';
  private tabSubscription!: Subscription;
  private routerSubscription!: Subscription;

    // Mat Expansion
    readonly panelOpenState = signal(false);

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private sharedState: SharedStateService,
        private router: Router
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

     ngOnInit() {
    // Subscribe to tab changes from shared service
    this.tabSubscription = this.sharedState.activeTab$.subscribe(tab => {
      this.currentTab = tab || this.detectTabFromRoute();
    });

    // Also watch router changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentTab = this.detectTabFromRoute();
      });
  }

  private detectTabFromRoute(): string {
    const path = window.location.pathname;
    if (path.includes('/employee-dashboard')) return 'employee';
    if (path.includes('/organization-dashboard')) return 'organization';
    if (path.includes('/dashboard')) return 'dashboard';
    return 'employee'; // default
  }

  ngOnDestroy() {
    if (this.tabSubscription) this.tabSubscription.unsubscribe();
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

}