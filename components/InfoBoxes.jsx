import Link from "next/link";
import InfoBox from "./InfoBox";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl m-auto lg:container">
        <div className="grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
          <InfoBox
            heading={"For Renters"}
            btnInfo={{
              text: "browse Properties",
              link: "/properties",
              bgColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading={"For property owners"}
            bgColor="bg-blue-100"
            btnInfo={{
              text: "Add Properties",
              link: "/properties/add",
              bgColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;
