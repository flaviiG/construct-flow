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

export async function deleteUnusedImages() {
  try {
    // Fetch all image URLs from the "images" bucket
    const { data: allImages, error: fetchImagesError } = await supabase.storage
      .from("images")
      .list("");

    if (fetchImagesError) {
      console.error("Error fetching images:", fetchImagesError.message);
      return;
    }
    console.log(allImages);

    let allUrls = [];
    for (const image of allImages) {
      const { data: url } = supabase.storage
        .from("images")
        .getPublicUrl(image.name);

      allUrls.push({ url: url.publicUrl, name: image.name });
    }
    console.log("urls", allUrls);
    // Fetch all image URLs from the "projects" table
    const { data: projectImages, error: fetchProjectsError } = await supabase
      .from("projects")
      .select("image");

    if (fetchProjectsError) {
      console.error(
        "Error fetching project images:",
        fetchProjectsError.message
      );
      return;
    }
    console.log(projectImages);

    // Fetch all image URLs from the "requests" table
    const { data: requestImages, error: fetchRequestsError } = await supabase
      .from("requests")
      .select("image");

    if (fetchRequestsError) {
      console.error(
        "Error fetching request images:",
        fetchRequestsError.message
      );
      return;
    }
    console.log(requestImages);

    // Combine all image URLs from different sources
    const referencedImages = [
      ...projectImages.map((project) => project.image),
      ...requestImages.map((request) => request.image),
    ];

    console.log(referencedImages);

    // Filter unused images
    const unusedImages = allUrls.filter(
      (image) => !referencedImages.includes(image.url)
    );

    console.log(unusedImages);

    if (unusedImages) {
      //    Delete unused images
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([...unusedImages].map((img) => img.name));

      if (deleteError) {
        console.error("Error deleting image:", deleteError.message);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
