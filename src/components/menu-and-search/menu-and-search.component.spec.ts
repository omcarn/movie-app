import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAndSearchComponent } from './menu-and-search.component';

describe('MenuAndSearchComponent', () => {
  let component: MenuAndSearchComponent;
  let fixture: ComponentFixture<MenuAndSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAndSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
