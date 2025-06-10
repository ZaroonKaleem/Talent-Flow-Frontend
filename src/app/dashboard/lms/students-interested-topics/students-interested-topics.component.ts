import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StudentsInterestedTopicsService } from './students-interested-topics.service';

@Component({
    selector: 'app-students-interested-topics',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './students-interested-topics.component.html',
    styleUrl: './students-interested-topics.component.scss'
})
export class StudentsInterestedTopicsComponent {

    constructor(
        private studentsInterestedTopicsService: StudentsInterestedTopicsService
    ) {}

    ngOnInit(): void {
        this.studentsInterestedTopicsService.loadChart();
    }

}