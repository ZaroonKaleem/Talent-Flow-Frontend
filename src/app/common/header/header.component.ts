import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
    RouterLink,
    NavigationEnd,
    Router,
    RouterModule,
} from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToggleService } from './toggle.service';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { filter } from 'rxjs/operators';
import { SharedStateService } from '../../shared/shared-state.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        RouterModule,
        MatMenuModule,
        NgClass,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
    isToggled = false;
  currentTab: string = '';

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router,
        private sharedState: SharedStateService
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {});
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

 ngOnInit() {
 this.detectActiveTab();
    
    // Subscribe to future changes
    this.sharedState.activeTab$.subscribe(tab => {
      this.currentTab = tab;
    });
  }

onNavClick(tab: string) {
  this.sharedState.setActiveTab(tab);
  // Add slight delay to ensure router navigation completes
  setTimeout(() => {
    this.currentTab = tab;
  }, 10);
}


 private detectActiveTab() {
    const path = this.router.url;
    if (path.includes('/employee-dashboard')) {
      this.currentTab = 'employee';
    } else if (path.includes('/organization-dashboard')) {
      this.currentTab = 'organization';
    } else if (path.includes('/dashboard')) {
      this.currentTab = 'dashboard';
    }
    this.sharedState.setActiveTab(this.currentTab);
  }


    // Settings Button Toggle
    settingsButtonToggle() {
        this.themeService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Fullscreen
    isFullscreen: boolean = false;
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Only add event listeners if the platform is the browser
            document.addEventListener(
                'fullscreenchange',
                this.onFullscreenChange.bind(this)
            );
            document.addEventListener(
                'webkitfullscreenchange',
                this.onFullscreenChange.bind(this)
            );
            document.addEventListener(
                'mozfullscreenchange',
                this.onFullscreenChange.bind(this)
            );
            document.addEventListener(
                'MSFullscreenChange',
                this.onFullscreenChange.bind(this)
            );
        }
    }
    toggleFullscreen() {
        if (this.isFullscreen) {
            this.closeFullscreen();
        } else {
            this.openFullscreen();
        }
    }
    openFullscreen() {
        if (isPlatformBrowser(this.platformId)) {
            const element = document.documentElement as HTMLElement & {
                mozRequestFullScreen?: () => Promise<void>;
                webkitRequestFullscreen?: () => Promise<void>;
                msRequestFullscreen?: () => Promise<void>;
            };
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                // Chrome, Safari, and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                // IE/Edge
                element.msRequestFullscreen();
            }
        }
    }
    closeFullscreen() {
        if (isPlatformBrowser(this.platformId)) {
            const doc = document as Document & {
                mozCancelFullScreen?: () => Promise<void>;
                webkitExitFullscreen?: () => Promise<void>;
                msExitFullscreen?: () => Promise<void>;
            };
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                // Firefox
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) {
                // Chrome, Safari, and Opera
                doc.webkitExitFullscreen();
            } else if (doc.msExitFullscreen) {
                // IE/Edge
                doc.msExitFullscreen();
            }
        }
    }
    onFullscreenChange() {
        if (isPlatformBrowser(this.platformId)) {
            const doc = document as Document & {
                webkitFullscreenElement?: Element;
                mozFullScreenElement?: Element;
                msFullscreenElement?: Element;
            };
            this.isFullscreen = !!(
                document.fullscreenElement ||
                doc.webkitFullscreenElement ||
                doc.mozFullScreenElement ||
                doc.msFullscreenElement
            );
        }
    }
}
