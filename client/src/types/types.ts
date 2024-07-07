// types.ts

export interface Doctor extends User{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    practice: string;
    availability: Date[];
    userType: 'doctor';
  }
  
  export interface Patient extends User{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    appointments: Appointment[];
    userType: 'patient';
  }
  
  export interface Appointment{
    patientID: string,
    doctorID: string,
    date: Date,
    startTime: string
  }
  export interface User {
    _id?: string;
    id?: string;
    email: string;
    userType: 'patient' | 'doctor'; 
    appointments: Appointment[]
  }
  
  export interface AuthContextType {
    user: User | null;
    loginUser: (userData: User) => void;
    logoutUser: () => void;
    
  }
  
