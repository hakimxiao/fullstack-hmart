import { requireAuth } from "@clerk/express";
import { Router } from "express";

import * as commentController from "../controllers/commentController";

const router = Router();

// POST /api/comments/:productId - Add comment to a product (PROTECTED)
router.post("/:productId", requireAuth(), commentController.createComment);

// DELETE /api/comments/:commentId - Delete a comment (PROTECTED - owner only)
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;
