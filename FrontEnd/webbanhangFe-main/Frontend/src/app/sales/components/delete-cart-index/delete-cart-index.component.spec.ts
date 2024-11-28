import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCartIndexComponent } from './delete-cart-index.component';

describe('DeleteCartIndexComponent', () => {
  let component: DeleteCartIndexComponent;
  let fixture: ComponentFixture<DeleteCartIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCartIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCartIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
