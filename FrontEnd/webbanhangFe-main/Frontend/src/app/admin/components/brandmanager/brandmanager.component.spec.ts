import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmanagerComponent } from './brandmanager.component';

describe('BrandmanagerComponent', () => {
  let component: BrandmanagerComponent;
  let fixture: ComponentFixture<BrandmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
