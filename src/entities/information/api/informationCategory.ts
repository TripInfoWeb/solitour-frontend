"use server";

import { InformationCategory } from "../model/informationCategory";

export async function getInformationCategoryList() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    next: { revalidate: 60, tags: ["informationCategoryList"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json() as Promise<InformationCategory[]>;
}
