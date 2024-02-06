import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jdonnxlzzggztyagwzuq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkb25ueGx6emdnenR5YWd3enVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTYzMzQsImV4cCI6MjAyMjQ3MjMzNH0.xz-m6E9WK1YCli5u68MChzuHIXDmgnKZCN1WrEWBSY4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
