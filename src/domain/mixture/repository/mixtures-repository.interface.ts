
import RepositoryInterface from "../../@shared/repository/repository-interface";
import Mixture from "../entity/mixture";
import Mixtures from "../entity/mixture";

export default interface MixturesRepositoryInterface extends RepositoryInterface<Mixtures> {

  findByMixture(mixture: string): Promise<Mixture>
}