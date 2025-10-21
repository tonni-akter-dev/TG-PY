import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard"];

// Public authentication routes
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  console.log(token, "token get")
  // If accessing protected route without token, redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If accessing auth routes with token, redirect to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

// Specify which paths the middleware runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register',
  ],
};