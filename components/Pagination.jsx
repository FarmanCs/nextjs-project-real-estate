"use client";

import Link from "next/link";

function Pagination({ page, pageSize, totalItem }) {
  const totalPages = Math.ceil(totalItem / pageSize);
  return (
    <section className="container mx-auto mb-8 flex items-center justify-center">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="mr-2 rounded-md border border-gray-300 px-2 py-1"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="mr-2 rounded-md border border-gray-300 px-2 py-1"
        >
          Next
        </Link>
      ) : null}
    </section>
  );
}

export default Pagination;
