import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dataType = searchParams.get("dataType")

    const supabase = await createClient()

    let query = supabase.from("editor_data").select("*")

    if (dataType) {
      query = query.eq("data_type", dataType)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase load error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })
  } catch (error) {
    console.error("Load error:", error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
