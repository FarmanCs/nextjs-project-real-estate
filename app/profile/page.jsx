import Image from "next/image";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import defaultProfileImg from "@/assets/images/profile.png";
import Property from "@/model/Property";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { redirect } from "next/navigation";

async function ProfilePage() {
  await connectDB();
  const userSession = await getSessionUser();
  const { userId } = userSession;

  if (!userSession || !userSession.userId) {
    redirect("/login"); // redirects unauthenticated users
  }
  const propertiesDoc = await Property.find({ owner: userId }).lean();
  const properties = propertiesDoc.map(convertToSerializeableObject);
  //   console.log("USER PROPERTIES:", properties);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="mx-20 mt-10 md:w-1/4">
              <div className="mb-4">
                <Image
                  className="mx-auto h-32 w-32 rounded-full md:mx-0 md:h-48 md:w-48"
                  src={userSession.user.image || defaultProfileImg}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>

              <h2 className="mb-4 text-2xl">
                <span className="block font-bold">Name: </span>{" "}
                {userSession.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="block font-bold">Email: </span>{" "}
                {userSession.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
