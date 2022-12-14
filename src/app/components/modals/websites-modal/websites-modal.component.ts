import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '@services/apis/api.service';
import { ModalsService } from '@services/modals/modals.service';
import { SharedService } from '@services/shared/shared.service';
import { TableService } from '@services/tables/table.service';
import {WebsiteScan} from '@api/models/website-scan.model';
import {NavItems} from '@components/navItems.type';
import {AppModalComponent} from '@components/modals/app-modal/app-modal.component';
// Declare jQuery symbol
declare var $: any;

@Component({
  selector: 'websites-modal',
  templateUrl: './websites-modal.component.html',
  styleUrls: ['./websites-modal.component.css'],
})
export class WebsitesModalComponent extends AppModalComponent implements OnInit {
  website = <any>{};
  websiteScans = <any>this.getBlankWebsiteScan();
  serviceCategories = <any>{};

  constructor(
    super(),
    private apiService: ApiService,
    private location: Location,
    public modalService: ModalsService,
    private route: ActivatedRoute,
    private router: Router,
    public sharedService: SharedService,
    public tableService: TableService
  ) {}

  navItems: NavItems[] = [{
    href: '#websitesOverview',
    title: 'Overview'
  },
  {
    href: '#websiteRelatedSystems',
    title: 'Related Systems'
  }]

  // Website scan Table Options
  websiteScanTableOptions: {} = this.tableService.createTableOptions({
    advancedSearch: true,
    idTable: null,
    classes: 'table-hover table-light clickable-table',
    showColumns: false,
    showExport: true,
    exportFileName: null,
    headerStyle: 'bg-danger',
    pagination: false,
    search: true,
    sortName: 'scan_date',
    sortOrder: 'desc',
    showToggle: true,
    url: null,
  });

  // Related Business Capabiltiies Table Columns
  websiteScanColumnDefs: any[] = [
    {
      field: 'Scan_ID',
      title: 'Scan Id',
      sortable: true,
    },
    {
      field: 'scan_date',
      title: 'Scan Date',
      sortable: true,
      visible: true,
    },
    {
      field: 'scan_version',
      title: 'Scan Version',
      sortable: true,
    },
  ];

  ngOnInit(): void {
    this.modalService.currentWebsite.subscribe((website) => {
      this.website = website;
      this.apiService
        .getWebsiteScans(this.website.Website_ID)
        .subscribe(
          (websiteScanData) =>
            (this.websiteScans =
              websiteScanData.length > 0
                ? websiteScanData
                : this.getBlankWebsiteScan())
        );
      this.apiService
        .getWebsiteServiceCategories(this.website.Website_ID)
        .subscribe(
          (websiteServiceCategories) =>
            (this.serviceCategories = websiteServiceCategories)
        );
    });

    $('#websitesRelSysTable').bootstrapTable(
      $.extend(this.tableService.relSysTableOptions, {
        columns: this.tableService.relSysColumnDefs,
        data: [],
      })
    );

    $('#websiteScans').bootstrapTable({
      columns: this.websiteScanColumnDefs,
      data: [],
    });

    // Method to handle click events on the Related Systems table
    $(document).ready(
      $('#websitesRelSysTable').on(
        'click-row.bs.table',
        function (e, row) {
          // Hide First Modal before showing new modal
          $('#websiteDetail').modal('hide');

          this.tableService.systemsTableClick(row);
        }.bind(this)
      )
    );

    // Revert back to overview tab when modal goes away
    $('#websiteDetail').on(
      'hidden.bs.modal',
      function (e) {
        $('#websiteTabs li:first-child a').tab('show');

        // Change URL back without ID after closing Modal
        this.sharedService.removeIDfromURL();
      }.bind(this)
    );
  }

  modalEdit(): void {
    // Hide Detail Modal before showing Manager Modal
    $('#websiteDetail').modal('hide');
    this.modalService.updateDetails(this.website, 'website', false);
    this.sharedService.setWebsiteForm();
    $('#websiteManager').modal('show');
  }

  getBlankWebsiteScan(): WebsiteScan[] {
    return [
      {
        Scan_ID: 0,
        Website_ID: this.website.Website_ID,
        desktop_img_file_name: 'desktop.png',
        mobile_img_file_name: 'mobile.png',
        scan_date: 'none',
        scan_version: '',
      },
    ];
  }

  serviceCategoryClick(id:string): void {
    console.log('webservicecategoryClick', id);
    $('#websiteDetail').modal('hide');
    this.apiService.getOneServiceCategory(id).subscribe((data: any[]) => {
      this.tableService.serviceCategoryTableClick(data[0]);
    });
  }

  getValues(value, maxValue) {
    return { '--value': value, '--max': maxValue };
  }
}
