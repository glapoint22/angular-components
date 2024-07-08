import { Component, contentChildren, OnInit } from '@angular/core';
import { MenuTriggerDirective } from '../menu-trigger.directive';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {
  private menuTriggers = contentChildren(MenuTriggerDirective);
  private isActive: boolean = false;
  private currentActiveMenuTrigger: MenuTriggerDirective | undefined;




  public ngOnInit(): void {
    this.menuTriggers().forEach((menuTrigger: MenuTriggerDirective, index: number) => {
      menuTrigger.onMouseDown.subscribe(() => this.toggleMenu(menuTrigger));
      menuTrigger.onMenuClose.subscribe(() => this.setActive(false));
      menuTrigger.onMouseEnter.subscribe(() => this.closeOpenMenu(menuTrigger));
      menuTrigger.onMenuRightArrowDown.subscribe(() => this.selectNextMenuTrigger(index, 1));
      menuTrigger.onMenuLeftArrowDown.subscribe(() => this.selectNextMenuTrigger(index, -1));
    });
  }




  private selectNextMenuTrigger(index: number, direction: number): void {
    const triggerCount = this.menuTriggers().length;
    const nextMenuTrigger = this.menuTriggers()[(index + direction + triggerCount) % triggerCount];

    this.closeOpenMenu(nextMenuTrigger);
    nextMenuTrigger.menu().selectFirstMenuItem();
  }




  private toggleMenu(menuTrigger: MenuTriggerDirective): void {
    if (this.isActive) {
      this.closeMenu(menuTrigger);
    } else {
      this.openMenu(menuTrigger);
    }
  }




  private openMenu(menuTrigger: MenuTriggerDirective): void {
    this.currentActiveMenuTrigger = menuTrigger;
    menuTrigger.openMenu();
    this.setActive(true);
  }




  private closeMenu(menuTrigger: MenuTriggerDirective): void {
    this.currentActiveMenuTrigger = undefined;
    menuTrigger.closeMenu();
    this.setActive(false);
  }




  private closeOpenMenu(menuTrigger: MenuTriggerDirective): void {
    if (this.isActive && this.currentActiveMenuTrigger && this.currentActiveMenuTrigger !== menuTrigger) {
      this.closeMenu(this.currentActiveMenuTrigger);
      this.openMenu(menuTrigger);
    }
  }




  private setActive(active: boolean): void {
    this.isActive = active;
  }
}