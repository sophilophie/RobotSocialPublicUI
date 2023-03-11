import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rspui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePass: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
