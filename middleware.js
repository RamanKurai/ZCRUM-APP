import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organisation(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isProtectedRoute(req)) {
    await auth.protect(); // Ensure user is authenticated
  }

  // Redirect to onboarding if user is authenticated but missing orgId
  if (
    auth().userId &&
    !auth().orgId &&
    !req.nextUrl.pathname.startsWith("/onboarding") &&
    req.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Skip static files
    "/api/:path*", // Apply middleware to API routes
  ],
};
