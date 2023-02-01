import replicateService from "./ReplicateService";


class PredictionService {
  constructor() {
    this.api = replicateService;
    this.apiClient = this.api.client;
  }
}

export default PredictionService;
