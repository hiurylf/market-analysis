import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FinanceService } from './finance.service';

describe('FinanceService', () => {
    let service: FinanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientModule],
        });
        service = TestBed.inject(FinanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
