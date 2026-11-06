
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getAdminClient() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: isAdmin, error } = await supabase.rpc(
    "is_portfolio_admin"
  );

  if (error || !isAdmin) {
    throw new Error("You are not authorized to perform this action.");
  }

  return supabase;
}

export async function addCategory(formData: FormData) {
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    throw new Error("Please enter a category name.");
  }

  const supabase = await getAdminClient();

  const { error } = await supabase
    .from("portfolio_categories")
    .insert({ name });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function updateCategory(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();

  if (!id || !name) {
    throw new Error("Category ID and name are required.");
  }

  const supabase = await getAdminClient();

  const { error } = await supabase
    .from("portfolio_categories")
    .update({ name })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Category ID is required.");
  }

  const supabase = await getAdminClient();

  const { error } = await supabase
    .from("portfolio_categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}


export async function addProject(formData: FormData) {
  const supabase = await getAdminClient();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = String(formData.get("category_id") || "");
  const file = formData.get("image");

  if (
    !title ||
    !description ||
    !(file instanceof File) ||
    file.size === 0
  ) {
    throw new Error("Please provide a title, description and project file.");
  }

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must not exceed 50 MB.");
  }

  const originalExtension = file.name.split(".").pop()?.toLowerCase() || "";
  const extension = /^[a-z0-9]{1,10}$/.test(originalExtension)
    ? originalExtension
    : "bin";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(fileName, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrl } = supabase.storage
    .from("portfolio")
    .getPublicUrl(fileName);

  const { error: insertError } = await supabase
    .from("portfolio_projects")
    .insert({
      title,
      description,
      category_id: categoryId || null,
      image_url: publicUrl.publicUrl,
      published: false,
    });

  if (insertError) {
    await supabase.storage.from("portfolio").remove([fileName]);
    throw new Error(insertError.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function toggleProjectPublication(formData: FormData) {
  const supabase = await getAdminClient();

  const id = String(formData.get("id") || "");
  const published = formData.get("published") === "true";

  if (!id) {
    throw new Error("Project ID is required.");
  }

  const { error } = await supabase
    .from("portfolio_projects")
    .update({
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  const supabase = await getAdminClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Project ID is required.");
  }

  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
