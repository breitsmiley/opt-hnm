import { EntityRepository, Repository } from 'typeorm';
import { Organization } from "../entity";

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {

    test() {
        return 'OrganizationRepository test';
    }
}
