import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectsProgressService } from './projects-progress.service';

@Component({
    selector: 'app-projects-progress',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './projects-progress.component.html',
    styleUrl: './projects-progress.component.scss'
})
export class ProjectsProgressComponent {

    constructor(
        private projectsProgressService: ProjectsProgressService
    ) {}

    ngOnInit(): void {
        this.projectsProgressService.loadChart();
    }

}