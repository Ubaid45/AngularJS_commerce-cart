import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class DefaultModalDialogComponent {
  @Input() bodyText;
  @Input() headerText;

  constructor(public activeModal: NgbActiveModal) {}

}
