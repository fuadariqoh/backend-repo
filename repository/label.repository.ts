interface ILabelRepository {
  getLabel(): Promise<any>;
  updateLabel(label: any): Promise<any>;
}

export type { ILabelRepository };
