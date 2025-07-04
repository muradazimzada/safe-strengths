"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function saveSafetyPlan(data: { responses: { [key: string]: string | string[] } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // For this example, we'll generate a random user_id.
  // In a real application, this would come from your authentication system.
  const userId = `user_${Math.random().toString(36).substr(2, 9)}`

  const { error } = await supabase.from("safety_plans").insert([{ user_id: userId, responses: data.responses }])

  if (error) {
    console.error("Supabase error:", error)
    throw new Error("Could not save the safety plan.")
  }

  return { success: true, message: "Plan saved." }
}
