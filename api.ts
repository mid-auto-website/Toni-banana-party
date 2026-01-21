
import { GuestSubmission } from './types';
import { API_URL } from './config';

export async function fetchSubmissions(): Promise<GuestSubmission[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    return (data as any[]).map(item => ({
      id: item.id || crypto.randomUUID(),
      name: item.name,
      drink: item.drink,
      softDrink: item.softDrink || '',
      createdAt: item.createdAt || new Date().toISOString()
    })) as GuestSubmission[];
  } catch (error) {
    console.error("Грешка при изтегляне на данни от Google Sheets:", error);
    return [];
  }
}

export async function postSubmission(submission: GuestSubmission): Promise<void> {
  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', 
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
  } catch (error) {
    console.error("Грешка при запис в Google Sheets:", error);
  }
}
