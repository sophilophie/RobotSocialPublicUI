import {Component, Input} from '@angular/core';
import {User} from 'src/app/common/types/user';

@Component({
  selector: 'rspui-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss'],
})
export class SidebarLeftComponent {
  @Input() public user: User | null = null;
}
