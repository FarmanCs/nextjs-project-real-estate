import PropertyAddForm from "@/components/PropertyAddForm";

function AddPropertyPage() {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-whilte m-4 rounded-md border px-6 py-8 shadow-md md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
}

export default AddPropertyPage;
