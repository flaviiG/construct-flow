import supabase from "./supabase";

export async function signUp(firstName, lastName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw new Error("There was an error creatign user");
  console.log(data);
  const { data2, error2 } = await supabase
    .from("users")
    .insert([
      {
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        is_admin: false,
      },
    ])
    .select();
  if (error2) throw new Error("There was an error creatign user");
}

export async function logIn(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log(data);
    throw new Error(error);
  }
  return data.user.id;
}

export async function logout() {
  console.log("Logging out...");
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error logging out");
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error !== null) return null;
  else return user;
}
