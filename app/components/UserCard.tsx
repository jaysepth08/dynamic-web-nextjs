import { User } from "../types/user";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <>
    <section className="w-full">
      <div className="bg-white hover:bg-gray p-4 rounded-lg shadow-md border border-gray-200">

        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.company.name}</p>

        <div className="w-full mt-2 flex items-center text-sm text-gray-600">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-500" />
          {user.email}
        </div>

        <div className="w-full mt-2 flex items-center text-sm text-gray-600">
          <PhoneIcon className="h-5 w-5 mr-2 text-green-500" />
          {user.phone}
        </div>

        <div className="w-full mt-2 flex items-center text-sm text-gray-600">
          <MapPinIcon className="h-5 w-5 mr-2 text-red-500" />
          {user.address.city}, {user.address.street}
        </div>
      </div>
    </section>
    
    </>
  );
};

export default UserCard;
