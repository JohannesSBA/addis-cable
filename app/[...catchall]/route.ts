import { NextResponse } from "next/server";

const gone = () =>
  new NextResponse("410 Gone", {
    status: 410,
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });

export function GET() {
  return gone();
}

export function HEAD() {
  return gone();
}

export function POST() {
  return gone();
}

export function PUT() {
  return gone();
}

export function DELETE() {
  return gone();
}

export function PATCH() {
  return gone();
}
