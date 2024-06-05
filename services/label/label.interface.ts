interface ILabelService {
  getLabel(): Promise<any>;
  updateLabel(label: any): Promise<any>;
}

export type { ILabelService };
