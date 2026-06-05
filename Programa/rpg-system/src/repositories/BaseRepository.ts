import db from '../firebase/firestore';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  DocumentData,
  WithFieldValue
} from 'firebase/firestore';

export default class BaseRepository<T extends { id?: string }> {
  protected collectionName: string;
  protected collectionRef;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  async create(data: WithFieldValue<T>): Promise<string> {
    const docRef = await addDoc(this.collectionRef, {
      ...(data as any),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<string> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...(data as any),
      updatedAt: serverTimestamp()
    });
    return id;
  }

  async delete(id: string): Promise<string> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
    return id;
  }

  async findById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null;
  }

  async findAll(orderByField: string = 'createdAt', direction: 'asc' | 'desc' = 'desc'): Promise<T[]> {
    const q = query(this.collectionRef, orderBy(orderByField, direction));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  }

  async findByField(field: string, value: any): Promise<T[]> {
    const q = query(this.collectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  }
}
