import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Station {
  id: number;
  name: string;
  codeArea: string;
  timeZone: string;
  stationHead: string;
  hrManager: string;
  accountsManager: string;
  addedOn: string;
  modifiedOn: string;
  addedBy: string;
}

@Component({
  selector: 'app-employee-station',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-station.component.html',
  styleUrls: ['./employee-station.component.scss']
})
export class EmployeeStationComponent {
  showRecords = 25;
  totalRecords = 25;

  stations: Station[] = [
    {
      id: 1,
      name: 'KMS - KHI',
      codeArea: '21 Main Market',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:09 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 2,
      name: 'KMS',
      codeArea: '321 Liberty Chowk',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:19 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 3,
      name: 'DG',
      codeArea: '32 Thokar',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:29 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 4,
      name: 'MK',
      codeArea: '32 Khaleelabad',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:36 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 5,
      name: 'UH',
      codeArea: '09 Lyari',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:45 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 6,
      name: 'WDS',
      codeArea: '231 Amr Chowk',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:55 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 7,
      name: 'UN',
      codeArea: '90 Darbar',
      timeZone: 'Asia/Karachi',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:30:07 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 8,
      name: 'Lahore',
      codeArea: '5160 Thokar',
      timeZone: 'Asia/Karachi',
      stationHead: 'Faizan Mukhtar',
      hrManager: 'Faizan Mukhtar',
      accountsManager: 'Faizan Mukhtar',
      addedOn: '10/09/2024 11:58:18',
      modifiedOn: '--',
      addedBy: ''
    }
  ];
  editStation(station: Station): void {
    // Logic to edit the station, e.g., open a modal or navigate to a different page
  }
}