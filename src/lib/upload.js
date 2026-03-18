import { supabase } from "./supabase";

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "avif"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function getExt(filename = "") {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "png";
}

export async function uploadToMediaBucket(file, folder, fileName) {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/"))
    throw new Error("Please select an image file");
  if (file.size > MAX_FILE_SIZE_BYTES)
    throw new Error("File exceeds the 5 MB size limit");

  const ext = getExt(file.name);
  if (!ALLOWED_EXTENSIONS.has(ext))
    throw new Error(`File type not allowed. Use: ${[...ALLOWED_EXTENSIONS].join(", ")}`);

  const path = `${folder}/${fileName}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, file, {
      upsert: true,
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
