import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/firebaseConfig';

const storage = getStorage(app);

const StorageService = {
  /**
   * Upload a file to Firebase Storage
   * @param {File} file The file object from input
   * @param {string} path The destination path (e.g., 'npcs/portrait.png')
   * @returns {Promise<string>} The download URL
   */
  async uploadFile(file, path) {
    if (!file) return null;
    
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
};

export default StorageService;
