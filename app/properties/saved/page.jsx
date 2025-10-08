import PropertyCard from "@/components/PropertyCard";
import User from "@/model/User";
import getSessionUser from "@/utils/getSessionUser";

async function SavedPropertiesPage() {
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  console.log("Bookmarks: ", bookmarks);
  return (
    <section className="px-4 py-6">
      <div className="container m-auto px-4 py-4 lg:container">
        <h1 className="mb-4 text-2xl">Saved Properties </h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPropertiesPage;
