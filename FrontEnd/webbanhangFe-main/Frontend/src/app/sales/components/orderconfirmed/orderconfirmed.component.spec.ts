import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmedComponent } from './orderconfirmed.component';

describe('OrderconfirmedComponent', () => {
  let component: OrderconfirmedComponent;
  let fixture: ComponentFixture<OrderconfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderconfirmedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderconfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
