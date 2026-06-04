import db from '../../../../firebase/firestore';
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
  serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'escolasMagia';

const EscolaMagiaRepository = {
  async create(data) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  async update(id, data) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  async findById(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  async findAll() {
    const q = query(collection(db, COLLECTION_NAME), orderBy('nome'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async search(filters = {}) {
    let q = collection(db, COLLECTION_NAME);
    const constraints = [];

    if (filters.nome) {
      constraints.push(where('nome', '>=', filters.nome));
      constraints.push(where('nome', '<=', filters.nome + '\uf8ff'));
    }
    
    constraints.push(orderBy('nome'));
    
    const finalQuery = query(q, ...constraints);
    const querySnapshot = await getDocs(finalQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

export default EscolaMagiaRepository;
