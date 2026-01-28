import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgIconsModule } from '@ng-icons/core';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroBellAlert } from '@ng-icons/heroicons/outline';
import { heroDocumentText } from '@ng-icons/heroicons/outline';
import { heroCloudArrowUpSolid } from '@ng-icons/heroicons/solid';
import { heroCheckBadgeSolid } from '@ng-icons/heroicons/solid';
 import { heroTrashSolid } from '@ng-icons/heroicons/solid';

import { Navbar } from './components/navbar/navbar';

@NgModule({
  declarations: [
    Navbar
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgIconsModule.withIcons({ heroUserCircleSolid, heroHomeSolid, heroBell, heroBellAlert, heroDocumentText, heroCloudArrowUpSolid, heroTrashSolid, heroCheckBadgeSolid }),
  ],
  exports: [Navbar]
})
export class NavbarModule { }