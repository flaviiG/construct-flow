import supabase from "./supabase";

export async function uploadImage(bucket, imageName, image) {
  const { storageError } = await supabase.storage
    .from(bucket)
    .upload(imageName, image);

  // 3. Delete if there was an error
  if (storageError) {
    throw new Error("Cabin image could not be uploaded");
  }
}
