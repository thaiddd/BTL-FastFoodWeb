import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginRequestComponent } from './dialog-login-request.component';

describe('DialogLoginRequestComponent', () => {
  let component: DialogLoginRequestComponent;
  let fixture: ComponentFixture<DialogLoginRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLoginRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
