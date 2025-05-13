// "use client";

// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// export default function EditProfilePage() {
//   const { id } = useParams();
//   const [userData, setUserData] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//         .then((res) => res.json())
//         .then((data: User) => {
//           setUserData(data);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Profile updated");
//   };

//   if (loading || !userData) return <div>Loading...</div>;

//   return (
//     <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-semibold">Edit Profile</h1>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={userData.name}
//               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={userData.email}
//               onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import UsersNavbar from "../../../../../components/users/UsersNavbar";
<<<<<<< HEAD
import withAuth from "../../../../../hoc/withAuth";
=======
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
};

const EditProfilePage = () => {
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const { id } = useParams();
  const [userProfile] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data: User) => {
          setUserData(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated");
  };

  if (loading || !userData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
<<<<<<< HEAD
    <>
      <UsersNavbar
        user={{
          id: user.id.toString(),
          avatar: user.avatar || "/default-avatar.png",
          name: user.name,
          email: user.email,
        }}
      >
        <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold">Edit Profile</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </UsersNavbar>
    </>
=======
    <UsersNavbar
      user={{
        id: userData.id.toString(),
        name: userData.name,
        email: userData.email,
        avatar: `https://robohash.org/${userData.id}?set=set5`,
      }}
    >
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </UsersNavbar>
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137
  );
}

export default withAuth(EditProfilePage);