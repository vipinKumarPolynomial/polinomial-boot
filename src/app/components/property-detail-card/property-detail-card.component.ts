import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-detail-card',
  templateUrl: './property-detail-card.component.html',
  styleUrls: ['./property-detail-card.component.scss']
})
export class PropertyDetailCardComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() propertyCard: any;
  closeResult = '';
  locationTabOpen = true;

  slideConfig = {
    dots: true,
    arrows: false,
  };

  slideConfigPP = {
    dots: false,
    arrows: true,
  };

  ngOnInit(): void {console.log('hi'); }

  changeLocationTab(status:any){
    this.locationTabOpen = status;
  }

  open(content:any) {
    this.modalService.open(content,  { windowClass: 'modal-dialog-centered' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
