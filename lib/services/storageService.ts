import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Bathroom, Rating, Averages } from '../types';

const BATHROOMS_COLLECTION = 'bathrooms';

export const loadBathrooms = async (): Promise<Bathroom[]> => {
  try {
    const bathroomsRef = collection(db, BATHROOMS_COLLECTION);
    const q = query(bathroomsRef, orderBy('id'));
    const querySnapshot = await getDocs(q);
    
    const bathrooms: Bathroom[] = [];
    querySnapshot.forEach((doc) => {
      bathrooms.push(doc.data() as Bathroom);
    });
    
    return bathrooms;
  } catch (error) {
    console.error('Error loading bathrooms:', error);
    return [];
  }
};

export const saveBathroom = async (bathroom: Bathroom): Promise<boolean> => {
  try {
    const bathroomRef = doc(db, BATHROOMS_COLLECTION, bathroom.id);
    await setDoc(bathroomRef, bathroom);
    return true;
  } catch (error) {
    console.error('Error saving bathroom:', error);
    return false;
  }
};

export const deleteBathroom = async (bathroomId: string): Promise<boolean> => {
  try {
    const bathroomRef = doc(db, BATHROOMS_COLLECTION, bathroomId);
    await deleteDoc(bathroomRef);
    return true;
  } catch (error) {
    console.error('Error deleting bathroom:', error);
    return false;
  }
};
export const getBathroom = async (bathroomId: string): Promise<Bathroom | null> => {
  try {
    const bathroomRef = doc(db, BATHROOMS_COLLECTION, bathroomId);
    const bathroomDoc = await getDoc(bathroomRef);
    
    if (bathroomDoc.exists()) {
      return bathroomDoc.data() as Bathroom;
    }
    return null;
  } catch (error) {
    console.error('Error getting bathroom:', error);
    return null;
  }
};

export const calculateAverages = (ratings: Rating[]): Averages => {
  if (!ratings || ratings.length === 0) {
    return { cleanliness: 0, supplies: 0, smell: 0 };
  }

  const totals = ratings.reduce((acc, r) => ({
    cleanliness: acc.cleanliness + r.cleanliness,
    supplies: acc.supplies + r.supplies,
    smell: acc.smell + r.smell
  }), { cleanliness: 0, supplies: 0, smell: 0 });

  const count = ratings.length;
  return {
    cleanliness: totals.cleanliness / count,
    supplies: totals.supplies / count,
    smell: totals.smell / count
  };
};