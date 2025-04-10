// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (email && password) {
//           localStorage.setItem("token", "fake-jwt-token");
//           router.push("/users");
//         }
//     };

//     return (
//         <div>
//               <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Login 
//                             </h1>
//                             <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
//                                 <div>
//                                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                                     <input type="email" name="email" id="email" 
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password" 
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                     <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
//                                 </div>
//                                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
//           Login
//         </button>
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     Dont have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// async function loginUser(email: string, password: string) {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   const user = users.find((u: { email: string }) => u.email === email);

//   if (user) {
//     // Mock password check: pretend all passwords are "password123"
//     if (password === "password123") {
//       return { success: true, user };
//     } else {
//       return { success: false, message: "Incorrect password" };
//     }
//   } else {
//     return { success: false, message: "User not found" };
//   }
// }

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(null);

//     const result = await loginUser(email, password);

//     if (result.success) {
//       localStorage.setItem("user", JSON.stringify(result.user));
//       alert(`Welcome, ${result.user.name}!`);
//       router.push("/");
//     } else {
//       setErrorMessage(result.message || null); // ✅ safe fallback
//     }

//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>

//         {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

//         <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
//           Login
//         </button>
//       </form>

//       <p className="mt-4 text-sm text-center">
//         Don’t have an account?{" "}
//         <a href="/register" className="text-blue-600 hover:underline">
//           Register here
//         </a>
//       </p>
//     </div>
//   );
// }


'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


async function loginUser(email: string, password: string) {
  // Manual admin check
  if (email === "admin@admin.com" && password === "admin123") {
    return {
      success: true,
      user: {
        id: 0,
        name: "Administrator",
        email: "admin@admin.com",
        username: "admin",
        role: "admin",
      },
    };
  }

  // Regular user check via JSONPlaceholder
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  const user = users.find((u: { email: string }) => u.email === email);

  if (user) {
    // Mock password check: pretend all regular users use "password123"
    if (password === "password123") {
      return {
        success: true,
        user: {
          ...user,
          role: "user",
        },
      };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } else {
    return { success: false, message: "User not found" };
  }
}


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
  
    const result = await loginUser(email, password);
  
    if (result.success) {
      const user = result.user;
  
      // Save user to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
  
      // alert(`Welcome, ${user.name}!`);
  
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        alert(`Welcome, ${result.user.name}!`);
      
        // Redirect based on role
        if (result.user.role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      }
      

      // if (result.user.role === "admin") {
      //   router.push("/dashboard/admin");
      // } else {
      //   router.push("/dashboard/user");
      // }

    } else {
      setErrorMessage(result.message || "Login failed");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}