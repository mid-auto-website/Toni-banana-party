
import { GuestSubmission } from '../types';

const STORAGE_KEY = 'toni-banana-drinks';

export const storageService = {
  saveSubmissions: (submissions: GuestSubmission[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  loadSubmissions: (): GuestSubmission[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as GuestSubmission[];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }
};
