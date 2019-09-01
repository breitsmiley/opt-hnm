import { EntityRepository, Repository } from 'typeorm';
import { Consortium } from "../entity";

@EntityRepository(Consortium)
export class ConsortiumRepository extends Repository<Consortium> {

    test() {
        return 'ConsortiumRepository test';
    }
}
