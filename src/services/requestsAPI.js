import supabase from "./supabase";

export async function getRequests() {
  const { data, error } = await supabase.from("requests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Requests could not be loaded");
  }

  return data;
}

export async function createRequest(request) {
  console.log("request:", request);
  const { data, error } = await supabase
    .from("requests")
    .insert([
      {
        user_id: 123,
        name: request.name,
        description: request.description,
        budget: request.budget,
        accepted: false,
      },
    ])
    .select();

  if (error) throw new Error(error);

  return [data[0].id, data[0].created_at];
}

export async function updateRequestImage(id, url) {
  const { data, error } = await supabase
    .from("requests")
    .update({ image: url })
    .eq("id", id);

  if (error) throw new Error("Failed to update project image");
}
