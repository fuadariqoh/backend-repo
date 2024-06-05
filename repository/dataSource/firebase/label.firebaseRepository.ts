import { Firestore } from "firebase-admin/firestore";
import { ILabelRepository } from "../../label.repository";

class FirebaseLabelRepository implements ILabelRepository {
  private fireStoreClient: Firestore;

  constructor(fireStoreClient: Firestore) {
    this.fireStoreClient = fireStoreClient;
  }
  async getLabel(): Promise<any> {
    try {
      const snapshot = await this.fireStoreClient.collection("labels").get();

      if (snapshot.empty) return null;

      const data = snapshot.docs[0].data();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async updateLabel(label: any): Promise<any> {
    try {
      await this.fireStoreClient
        //   hardcoded label id
        .doc(`labels/hldNRa3vqthLXfcuRil4`)
        .update(label);

      const data = await this.fireStoreClient.collection("labels").get();

      if (data.empty) return null;

      const updatedData = data.docs[0].data();

      return updatedData;
    } catch (error) {
      console.error(error);
    }
  }
}

export { FirebaseLabelRepository };
