import {Component, Input} from '@angular/core';
import {User} from 'src/app/common/types/user';

@Component({
  selector: 'rspui-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss'],
})
export class SidebarRightComponent {
  @Input() public user: User | null = null;
}
