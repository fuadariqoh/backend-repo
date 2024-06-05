import { firebaseLabelRepository } from "../../repository/dataSource/firebase";
import { ILabelService } from "./label.interface";
import { LabelService } from "./label.service";

const labelService = new LabelService(firebaseLabelRepository);

export { labelService };
export type { ILabelService };
