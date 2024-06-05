import { ILabelRepository } from "../../repository/label.repository";
import { ILabelService } from "./label.interface";

class LabelService implements ILabelService {
  private labelRepo: ILabelRepository;

  constructor(labelRepo: ILabelRepository) {
    this.labelRepo = labelRepo;
  }

  async getLabel(): Promise<any> {
    const label = await this.labelRepo.getLabel();

    return label;
  }
  async updateLabel(label: any): Promise<any> {
    const updatedLabel = await this.labelRepo.updateLabel(label);

    return updatedLabel;
  }
}

export { LabelService };
