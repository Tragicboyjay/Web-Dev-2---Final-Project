// types.ts

export interface Doctor {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    practice: string;
    availability: Date[];
    userType: 'doctor';
  }
  
  export interface Patient {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    appointments: string[];
    userType: 'patient';
  }
  
  export type User = Doctor | Patient;
  
  export interface AuthContextType {
    user: User | null;
    loginUser: (userData: User) => void;
    logoutUser: () => void;
  }
  