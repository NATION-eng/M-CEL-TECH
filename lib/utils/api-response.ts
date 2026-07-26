import { NextResponse } from "next/server";

export type ApiSuccess<T> = { success: true; message: string; data: T };
export type ApiFailure = { success: false; message: string; errors: string[] };

/** Every endpoint returns this exact envelope — never a bare object. */
export function apiSuccess<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, message, data }, { status });
}

export function apiError(message: string, errors: string[] = [], status = 400) {
  return NextResponse.json<ApiFailure>({ success: false, message, errors }, { status });
}
