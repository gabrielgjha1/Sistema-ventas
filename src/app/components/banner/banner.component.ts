import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() public texto1: string;
  @Input() public texto2: string;
  @Input() public texto3: string;

  constructor() { }

  ngOnInit(): void {
  }

}
