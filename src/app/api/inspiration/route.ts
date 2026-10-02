import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAIProvider } from "@/lib/ai/provider";

const InspirationRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty").max(1000),
  industry: z.string().optional(),
  platform: z.string().optional(),
  format: z.string().optional(),
  audience: z.string().optional(),
  creativeStyle: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = InspirationRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.generateCreativeIdea(parsed.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Creative inspiration generation error:", error);
    return NextResponse.json(
      { error: "Internal generation error" },
      { status: 500 }
    );
  }
}
