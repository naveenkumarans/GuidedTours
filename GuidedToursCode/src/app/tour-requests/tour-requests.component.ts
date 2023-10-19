import { Component, OnInit } from '@angular/core';
import { TourRequest } from '../models/tour-request';
import { TourRequestService } from '../services/tour-request.service';

@Component({
  selector: 'app-tour-requests',
  templateUrl: './tour-requests.component.html',
  styleUrls: ['./tour-requests.component.css']
})
export class TourRequestsComponent implements OnInit {

  displayedColumns: string[] = ['dateOfTravel', 'customerName', 'customerEmail', 'customerPhone', 'id'];
  tourRequests: TourRequest[] = [];
  constructor(private tourRequestService: TourRequestService) { }

  ngOnInit(): void {
    this.tourRequestService.getAllTourReqeusts().subscribe(data => {
      this.tourRequests = data;
    })
  }
}
