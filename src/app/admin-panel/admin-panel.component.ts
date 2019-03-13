import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ManageGalleryCardComponent } from '../manage-gallery-card/manage-gallery-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  openedSidebar: boolean;

  constructor(private user: AuthService, private modalService: NgbModal) {}

  toggleSidebar() {

    if(this.openedSidebar){
      document.getElementById('mySidebar').style.width = "0px";
      document.getElementById('main').style.marginLeft = "0px";
    } else{
      document.getElementById('mySidebar').style.width = "250px";
      document.getElementById('main').style.marginLeft = "250px";
    }

    this.openedSidebar = !this.openedSidebar;
  }

  openFormModal() {
    const modalRef = this.modalService.open(ManageGalleryCardComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => (console.log(error)));
  }
}
