export function convertToSerializeableObject(leanDocument) {
  // Handle null or undefined
  if (!leanDocument) {
    return null;
  }

  // Handle arrays
  if (Array.isArray(leanDocument)) {
    return leanDocument.map((doc) => convertToSerializeableObject(doc));
  }

  // Handle non-objects (primitives)
  if (typeof leanDocument !== "object") {
    return leanDocument;
  }

  for (const key of Object.keys(leanDocument)) {
    if (
      leanDocument[key] &&
      leanDocument[key].toJSON &&
      leanDocument[key].toString
    ) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  return leanDocument;
}
