import { NextResponse } from "next/server";

export async function response(func: () => Promise<any>) {
  try {
    const data = await func();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({ success: false });
  }
}
