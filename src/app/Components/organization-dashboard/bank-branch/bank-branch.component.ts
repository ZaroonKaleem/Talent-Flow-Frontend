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
  selector: 'app-bank-branch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-branch.component.html',
  styleUrl: './bank-branch.component.scss'
})
export class BankBranchComponent {
  showRecords = 25;
  totalRecords = 25;

  stations: Station[] = [
    {
      id: 1,
      name: 'Meezan Bank',
      codeArea: '21 Main Market',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:09 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 2,
      name: 'HBL',
      codeArea: '321 Liberty Chowk',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:19 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 3,
      name: 'MCB',
      codeArea: '32 Thokar',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:29 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 4,
      name: 'Pubjab',
      codeArea: '32 Khaleelabad',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:36 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 5,
      name: 'MCB',
      codeArea: '09 Lyari',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:45 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 6,
      name: 'Pubjab Bank',
      codeArea: '231 Amr Chowk',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:29:55 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
    {
      id: 7,
      name: 'Bank Alfalah',
      codeArea: '90 Darbar',
      timeZone: 'Lahore',
      stationHead: '',
      hrManager: '',
      accountsManager: '',
      addedOn: '3/6/2024 2:30:07 PM',
      modifiedOn: '--',
      addedBy: 'Mr-Blacky'
    },
  ];
  editStation(station: Station): void {
    // Logic to edit the station, e.g., open a modal or navigate to a different page
  }

}
