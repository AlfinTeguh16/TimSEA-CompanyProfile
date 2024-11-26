/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "0d6f9bdcb660a664892169a4cadd57729c143827998035dbe7fe983d482b2eb6e38d7b6accecb0e0111a29e18b244bddb8da058496ed07d98be487ab5318e22f";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = [ "/blogs/edit"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("auth/login/", req.url));
    }

    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
