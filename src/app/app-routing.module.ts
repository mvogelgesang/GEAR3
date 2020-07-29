import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main
import { HomeComponent } from './views/main/home/home.component';
import { GlobalSearchComponent } from './views/main/global-search/global-search.component';
import { AboutComponent } from './views/main/about/about.component';
import { AssistTechComponent } from './views/main/assist-tech/assist-tech.component';
import { FormsGlossaryComponent } from './views/main/forms-glossary/forms-glossary.component';
import { GearManagerComponent } from './views/main/gear-manager/gear-manager.component';

// Strategy
import { FrameworkComponent } from './views/strategy/framework/framework.component';
import { InvestmentsComponent } from './views/strategy/investments/investments.component';

// Enterprise
import { CapabilitiesModelComponent } from './views/enterprise/capabilities-model/capabilities-model.component';
import { CapabilitiesComponent } from './views/enterprise/capabilities/capabilities.component';
import { OrganizationsChartComponent } from './views/enterprise/organizations-chart/organizations-chart.component';
import { OrganizationsComponent } from './views/enterprise/organizations/organizations.component';

// Applications
import { SystemsComponent } from './views/applications/systems/systems.component';
import { AppsComponent } from './views/applications/apps/apps.component';
import { TimeComponent } from './views/applications/time/time.component';

// Security
import { FismaComponent } from './views/security/fisma/fisma.component';
import { FismaPocsComponent } from './views/security/fisma-pocs/fisma-pocs.component';

// Technologies
import { ItStandardsComponent } from './views/technologies/it-standards/it-standards.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: GlobalSearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:tab', component: AboutComponent },
  { path: 'assist_tech', component: AssistTechComponent },

  { path: 'strategic_framework', component: FrameworkComponent },
  { path: 'investments', component: InvestmentsComponent },

  { path: 'capabilities_model', component: CapabilitiesModelComponent },
  { path: 'capabilities', component: CapabilitiesComponent },
  { path: 'org_chart', component: OrganizationsChartComponent },
  { path: 'organizations', component: OrganizationsComponent },

  { path: 'systems', component: SystemsComponent },
  { path: 'applications', component: AppsComponent },
  { path: 'applications_TIME', component: TimeComponent },

  { path: 'FISMA', component: FismaComponent },
  { path: 'FISMA_POC', component: FismaPocsComponent },

  { path: 'it_standards', component: ItStandardsComponent },

  { path: 'forms_glossary', component: FormsGlossaryComponent },

  { path: 'gear_manager', component: GearManagerComponent },

  {  // Catch-all Redirect to Home
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
