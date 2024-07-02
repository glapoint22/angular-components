import { Component, contentChildren } from '@angular/core';
import { MenuBarItemDirective } from '../menu-bar-item.directive';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  private menuBarItems = contentChildren(MenuBarItemDirective);

  public ngOnInit(): void {
    this.menuBarItems().forEach((item) => {
      console.log(item);
    });
  }
}
