type DebounceFunction<T extends unknown[]> = (...args: T) => void; 

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateUniqueId = (): string => {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const sumArray = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

export const debounce = <T extends unknown[]>(
  func: DebounceFunction<T>, 
  delay: number
): DebounceFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function toTrainCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')        
    .replace(/[\s._-]+/g, ' ')                  
    .trim()
    .split(' ')                                 
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
    .join('-');
}
