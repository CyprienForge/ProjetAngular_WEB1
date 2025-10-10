import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRate } from './add-rate';

describe('AddRate', () => {
  let component: AddRate;
  let fixture: ComponentFixture<AddRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
