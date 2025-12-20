import { upload } from "@testing-library/user-event/dist/upload";
import { supabase } from "./supabaseClient";

function getExt(filename = "") {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "png";
}

export async function uploadToMediaBucket(file, folder) {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/"))
    throw new Error("Please select an image");

  const ext = getExt(file.name);

  const id =
    (typeof window !== "undefined" &&
      window.crypto &&
      typeof window.crypto.randomUUID === "function" &&
      window.crypto.randomUUID()) ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const path = `${folder}/${id}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, file, {
      upsert: false,
      contentType: file.type,
      cacheControl: "3600",
    });

  if (uploadError) throw uploadError;

  // If bucket is PUBLIC:
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  const publicUrl = data?.publicUrl;

  if (!publicUrl)
    throw new Error("Upload succeeded but could not build public URL.");

  return { path, publicUrl };
}
