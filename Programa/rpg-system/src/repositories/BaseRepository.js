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
  limit,
  startAfter,
  getCountFromServer
} from 'firebase/firestore';

/**
 * BaseRepository - Encapsulates standard Firestore operations
 */
export default class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error creating doc in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return id;
    } catch (error) {
      console.error(`Error updating doc in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error(`Error deleting doc from ${this.collectionName}:`, error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error(`Error finding doc in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async findAll(orderByField = 'nome', direction = 'asc') {
    try {
      const q = query(this.collectionRef, orderBy(orderByField, direction));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error finding all in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async search(filters = {}, orderByField = 'nome') {
    try {
      let q = this.collectionRef;
      const constraints = [];

      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          if (typeof filters[key] === 'string' && key === 'nome') {
            // Basic prefix search
            constraints.push(where(key, '>=', filters[key]));
            constraints.push(where(key, '<=', filters[key] + '\uf8ff'));
          } else {
            constraints.push(where(key, '==', filters[key]));
          }
        }
      });

      if (orderByField) {
        constraints.push(orderBy(orderByField));
      }

      const finalQuery = query(q, ...constraints);
      const querySnapshot = await getDocs(finalQuery);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error searching in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async exists(field, value, excludeId = null) {
    try {
      const q = query(this.collectionRef, where(field, '==', value));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      
      if (excludeId) {
        return docs.some(doc => doc.id !== excludeId);
      }
      return docs.length > 0;
    } catch (error) {
      console.error(`Error checking existence in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async count() {
    const snapshot = await getCountFromServer(this.collectionRef);
    return snapshot.data().count;
  }
}
