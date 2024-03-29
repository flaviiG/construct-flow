import supabase from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    throw new Error("Projects could not be loaded");
  }

  return data;
}

export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: project.user_id,
        name: project.name,
        description: project.description,
        status: project.status,
      },
    ])
    .select();
  if (error) throw new Error(error);

  console.log(data);
  return [data[0].id, data[0].created_at];
}

export async function updateProjectImage(id, url) {
  const { data, error } = await supabase
    .from("projects")
    .update({ image: url })
    .eq("id", id);

  if (error) throw new Error("Failed to update project image");
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw new Error("Error deleting project");
}

export async function updateStatusApi(id, status) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status: status })
    .eq("id", id)
    .select();

  console.log("Update cosnole: ", data);

  if (error) throw new Error(error);
}
