import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rspui-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidePass: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
