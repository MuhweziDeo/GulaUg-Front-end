import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;
  @Input() width: string;
  @Input() height: string;

  constructor() { }

  ngOnInit() {
  }

}
