import { Component } from '@angular/core';
import { CommonNavComponent } from "../../../common/components/common-nav/common-nav.component";


@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonNavComponent],
  templateUrl: './admin-dashboard-main.component.html',
  styleUrl: './admin-dashboard-main.component.css'
})


export class AdminDashboardMainComponent {

}
