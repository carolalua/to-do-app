import { Component, Input } from '@angular/core';
import { user } from '../../shared/models/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() user!: user; 
}
