import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validationResultHandler } from "../utils/validationResultHandler";

export const createPostValidation = [
    body("title").notEmpty().withMessage("Title required"),
    body("summary")
        .optional()
        .isLength({ max: 444 })
        .withMessage("Summary must be at most 444 characters")
        .optional()
        .isLength({ min: 150 })
        .withMessage("Summary must be at least 150 characters"),
    body("content").notEmpty().withMessage("Content is required"),
    body("tags").optional().isArray().withMessage("Tags must be an array of strings"),
    body("tags.*").optional().isString().withMessage("Each tag must be a string"),
    validationResultHandler,
];

export const updatePostValidation = [];
