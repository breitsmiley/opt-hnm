import { Injectable } from '@nestjs/common';
import { ConsortiumRepository, OrganizationRepository } from "./repository";

@Injectable()
export class ApiService {
    constructor(
      private readonly consortiumRepository: ConsortiumRepository,
      private readonly organizationRepository: OrganizationRepository
    ) {
    }

    test() {
        console.log(
          'test',
          this.consortiumRepository.test(),
          this.organizationRepository.test()
        );
    }
}
