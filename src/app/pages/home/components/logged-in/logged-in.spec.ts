import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedIn } from './logged-in';

describe('LoggedIn', () => {
  let component: LoggedIn;
  let fixture: ComponentFixture<LoggedIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
