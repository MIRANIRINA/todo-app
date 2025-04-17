// Validation pour l'inscription utilisateur
export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  
  export const isValidUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };
  
  // Validation pour les tâches
  export const isValidTaskName = (name: string): boolean => {
    return typeof name === "string" && name.trim().length > 0;
  };
  
  export const isValidStatus = (status: string): boolean => {
    const validStatuses = ["en cours", "en attente", "terminé"];
    return validStatuses.includes(status.toLowerCase());
  };
  
  export const isValidPrice = (price: number): boolean => {
    return typeof price === "number" && price >= 0;
  };
  