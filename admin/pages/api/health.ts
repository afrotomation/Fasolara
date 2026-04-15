import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Health check endpoint for Docker/Coolify. Bypasses the NextAuth
 * middleware because the matcher in `middleware.ts` excludes `/api/*`.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: "ok" });
}
