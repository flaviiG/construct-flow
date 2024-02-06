import { getUser } from "./authAPI";
import supabase from "./supabase";

export async function getUserDetails(id) {
  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  if (error) throw new Error("There was an error loading user from table");

  return {
    firstName: user[0].first_name,
    lastName: user[0].last_name,
    id: user[0].id,
    is_admin: user[0].is_admin,
  };
}

export async function getUserStatus() {}
