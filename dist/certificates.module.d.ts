import { OnModuleInit } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
export declare class CertificatesModule implements OnModuleInit {
    private readonly service;
    constructor(service: CertificatesService);
    onModuleInit(): void;
}
