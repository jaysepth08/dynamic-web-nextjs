
import { ReactNode } from "react";

  export type User = {
    company: { name: string };
    phone: ReactNode;
    id: number;
    name: string;
    username: string;
    email: string;
    role: 'admin' | 'user'; // only valid roles
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
  }
  