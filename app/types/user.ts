
// export type User = {
//     username: ReactNode;
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     company: { name: string };
//     address: { city: string; street: string };
//   };
  
  // export interface User {
  //   id: number;
  //   name: string;
  //   username: string;
  //   email: string;
  //   address: {
  //     street: string;
  //     suite: string;
  //     city: string;
  //     zipcode: string;
  //     geo: {
  //       lat: string;
  //       lng: string;
  //     };
  //   };
  // }
  
  export type User = {
    company: any;
    phone: ReactNode;
    id: number;
    name: string;
    username: string;
    email: string;
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
  