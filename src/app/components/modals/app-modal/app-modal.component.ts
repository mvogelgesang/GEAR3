import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '@services/apis/api.service';
import { ModalsService } from '@services/modals/modals.service';
import { SharedService } from '@services/shared/shared.service';
import { TableService } from '@services/tables/table.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css'],
})
export class AppModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  divId: string;
  @Input()
  navItems: any[] = [];
  @Input()
  tabPanes: any[] = [];
  modalEdit(): void {}

  public apiService: ApiService;
  public location: Location;
  public modalService: ModalsService;
  public route: ActivatedRoute;
  public router: Router;
  public sharedService: SharedService;
  public tableService: TableService;

  constructor(
    apiService: ApiService,
    location: Location,
    modalService: ModalsService,
    route: ActivatedRoute,
    router: Router,
    sharedService: SharedService,
    tableService: TableService
  ) {
    this.apiService = apiService;
    this.location = location;
    this.modalService = modalService;
    this.route = route;
    this.router = router;
    this.sharedService = sharedService;
    this.tableService = tableService;
  }
  ngOnInit(): void {}
}
