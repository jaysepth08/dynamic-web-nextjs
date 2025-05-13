
<<<<<<< HEAD

=======
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import UsersNavbar from "../../../../components/users/UsersNavbar";

// type UserProfile = {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   bio: string;
// };

// export default function ProfilePage() {
//   const { id } = useParams();
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setUserProfile({
//             id: data.id,
//             name: data.name,
//             email: data.email,
//             avatar: `https://robohash.org/${data.id}?set=set5`,
//             bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           });
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user profile:", error);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!userProfile) return <div>User not found</div>;

//   return (
 
//     <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <div className="flex items-center space-x-4">
//           <img
//             src={userProfile.avatar}
//             alt={userProfile.name}
//             className="h-16 w-16 rounded-full"
//           />
//           <div>
//             <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
//             <p className="text-gray-600">{userProfile.email}</p>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h2 className="text-xl font-semibold">About</h2>
//           <p className="mt-2 text-gray-700">{userProfile.bio}</p>
//         </div>

//         <div className="mt-6 flex space-x-4">
//           <Link
//             href={`/dashboard/user/profile/edit/${userProfile.id}`}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Edit Profile
//           </Link>
//           <button
//             onClick={() => alert("Sign out functionality goes here")}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
   
//   );
// }

/* eslint-disable @next/next/no-img-element */
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import UsersNavbar from "../../../../components/users/UsersNavbar";
<<<<<<< HEAD
import withAuth from "../../../../hoc/withAuth";

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

=======
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137

type UserProfile = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
};

const ProfilePage = () => {
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });
  
  const params = useParams();
  const id = params?.id;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    const fetchProfile = async () => {
      try {
        if (!id) {
          setError("No user ID provided");
=======
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const userData: UserProfile = {
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: `https://robohash.org/${data.id}?set=set5`,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          };
          setUserProfile(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137
          setLoading(false);
          return;
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        setUserProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          avatar: `https://robohash.org/${data.id}?set=set5`,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <>
      <UsersNavbar
        user={{
          ...userProfile,
          id: user.id.toString(),
          avatar: user.avatar || "/default-avatar.png",
        }}
      >
       

    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.email}</p>
=======
  if (loading) return <div className="text-indigo-300 text-center">Loading...</div>;
  if (!userProfile) return <div className="text-red-300 text-center">User not found</div>;

  return (
    <UsersNavbar
      user={{
        id: userProfile.id.toString(),
        avatar: userProfile.avatar,
        name: userProfile.name,
        email: userProfile.email,
      }}
    >
      <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-2 text-gray-700">{userProfile.bio}</p>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              href={`/dashboard/user/profile/edit/${userProfile.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </Link>
            
>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </div>
     
    </UsersNavbar>
    </>
  );
}

export default withAuth(ProfilePage);
=======
    </UsersNavbar>
  );
}

>>>>>>> 091a7675764d95df6d61fb8f3d707cbf450fc137
