import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dataType, elementId, data } = body

    if (!dataType || !elementId || data === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Upsert the data (insert or update on conflict)
    const { error } = await supabase.from("editor_data").upsert(
      {
        data_type: dataType,
        element_id: elementId,
        data: data,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "data_type,element_id",
      },
    )

    if (error) {
      console.error("Supabase save error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
