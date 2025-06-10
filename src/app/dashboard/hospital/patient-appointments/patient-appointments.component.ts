import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
    selector: 'app-patient-appointments',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgIf, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, FormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './patient-appointments.component.html',
    styleUrl: './patient-appointments.component.scss'
})
export class PatientAppointmentsComponent {

    // Date Picker
    readonly campaignOne = new FormGroup({
        start: new FormControl(new Date(year, month, 13)),
        end: new FormControl(new Date(year, month, 16)),
    });
    readonly campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19)),
    });

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['patient_name', 'date', 'time', 'assigned', 'department', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    patient_name: string;
    date: string;
    time: string;
    assigned: any;
    department: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        patient_name: 'John Doe',
        date: 'Sep 12, 2024',
        time: '10:30 AM',
        assigned: {
            img: 'images/users/user11.jpg',
            name: 'Dr. Sarah'
        },
        department: 'Cardiology',
        status: {
            confirmed: true,
            rescheduled: false,
            cancelled: false,
            pending: false
        }
    },
    {
        patient_name: 'Jane Smith',
        date: 'Sep 11, 2024',
        time: '11:00 AM',
        assigned: {
            img: 'images/users/user32.jpg',
            name: 'Dr. Mark'
        },
        department: 'Pediatrics',
        status: {
            confirmed: false,
            rescheduled: true,
            cancelled: false,
            pending: false
        }
    },
    {
        patient_name: 'Robert Clark',
        date: 'Sep 10, 2024',
        time: '1:00 PM',
        assigned: {
            img: 'images/users/user33.jpg',
            name: 'Dr. Emily'
        },
        department: 'Orthopedics',
        status: {
            confirmed: false,
            rescheduled: false,
            cancelled: true,
            pending: false
        }
    },
    {
        patient_name: 'Linda Green',
        date: 'Sep 09, 2024',
        time: '9:30 AM',
        assigned: {
            img: 'images/users/user34.jpg',
            name: 'Dr. Adam'
        },
        department: 'Dermatology',
        status: {
            confirmed: true,
            rescheduled: false,
            cancelled: false,
            pending: false
        }
    },
    {
        patient_name: 'Michael White',
        date: 'Sep 08, 2024',
        time: '2:00 PM',
        assigned: {
            img: 'images/users/user35.jpg',
            name: 'Dr. Rebecca'
        },
        department: 'Surgery',
        status: {
            confirmed: false,
            rescheduled: false,
            cancelled: false,
            pending: true
        }
    },
    {
        patient_name: 'Michael White',
        date: 'Sep 08, 2024',
        time: '2:00 PM',
        assigned: {
            img: 'images/users/user35.jpg',
            name: 'Dr. Rebecca'
        },
        department: 'Surgery',
        status: {
            confirmed: false,
            rescheduled: false,
            cancelled: false,
            pending: true
        }
    },
    {
        patient_name: 'Linda Green',
        date: 'Sep 09, 2024',
        time: '9:30 AM',
        assigned: {
            img: 'images/users/user34.jpg',
            name: 'Dr. Adam'
        },
        department: 'Dermatology',
        status: {
            confirmed: true,
            rescheduled: false,
            cancelled: false,
            pending: false
        }
    },
    {
        patient_name: 'Robert Clark',
        date: 'Sep 10, 2024',
        time: '1:00 PM',
        assigned: {
            img: 'images/users/user33.jpg',
            name: 'Dr. Emily'
        },
        department: 'Orthopedics',
        status: {
            confirmed: false,
            rescheduled: false,
            cancelled: true,
            pending: false
        }
    },
    {
        patient_name: 'Jane Smith',
        date: 'Sep 11, 2024',
        time: '11:00 AM',
        assigned: {
            img: 'images/users/user32.jpg',
            name: 'Dr. Mark'
        },
        department: 'Pediatrics',
        status: {
            confirmed: false,
            rescheduled: true,
            cancelled: false,
            pending: false
        }
    },
    {
        patient_name: 'John Doe',
        date: 'Sep 12, 2024',
        time: '10:30 AM',
        assigned: {
            img: 'images/users/user11.jpg',
            name: 'Dr. Sarah'
        },
        department: 'Cardiology',
        status: {
            confirmed: true,
            rescheduled: false,
            cancelled: false,
            pending: false
        }
    }
];