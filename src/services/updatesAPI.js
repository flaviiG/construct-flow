import supabase from "./supabase";

export async function getUpdatesApi(project_id) {
  const { data, error } = await supabase
    .from("updates")
    .select("*")
    .eq("project_id", project_id);

  if (error) throw new Error(error);

  return data;
}

export async function deleteUpdateApi(id) {
  const { error } = await supabase.from("updates").delete().eq("id", id);

  if (error) throw new Error(error);
}

export async function createUpdateApi(update) {
  const { project_id, title, description, images } = update;

  const { data, error } = await supabase
    .from("updates")
    .insert([
      {
        project_id: project_id,
        title: title,
        description: description,
        images: images,
      },
    ])
    .select();

  if (error) throw new Error(error);

  return [data[0].id, data[0].created_at];
}
