import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEquipamentosComponent } from './dados-equipamentos.component';

describe('DadosEquipamentosComponent', () => {
  let component: DadosEquipamentosComponent;
  let fixture: ComponentFixture<DadosEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosEquipamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
