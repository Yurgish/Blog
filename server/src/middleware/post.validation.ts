import { body, validationResult } from "express-validator";
import { validationResultHandler } from "../utils/validationResultHandler";

// Validation for creating a post
export const createPostValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("summary")
        .optional()
        .isLength({ max: 444 })
        .withMessage("Summary must be at most 444 characters")
        .optional()
        .isLength({ min: 150 })
        .withMessage("Summary must be at least 150 characters"),
    body("content").notEmpty().withMessage("Content is required"),
    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array of strings")
        .custom((tags) => {
            if (tags.length > 3) {
                throw new Error("You can only specify up to 3 tags");
            }
            return true;
        })
        .custom((tags) => {
            for (const tag of tags) {
                if (typeof tag !== "string") {
                    throw new Error("Each tag must be a string");
                }
            }
            return true;
        }),
    validationResultHandler,
];

// Validation for updating a post
export const updatePostValidation = [
    body("title").optional().notEmpty().withMessage("Title required"),
    body("summary")
        .optional()
        .isLength({ max: 444 })
        .withMessage("Summary must be at most 444 characters")
        .optional()
        .isLength({ min: 150 })
        .withMessage("Summary must be at least 150 characters"),
    body("content").optional().notEmpty().withMessage("Content is required"),
    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array of strings")
        .custom((tags) => {
            if (tags.length > 3) {
                throw new Error("You can only specify up to 3 tags");
            }
            return true;
        })
        .custom((tags) => {
            for (const tag of tags) {
                if (typeof tag !== "string") {
                    throw new Error("Each tag must be a string");
                }
            }
            return true;
        }),
    validationResultHandler,
];
