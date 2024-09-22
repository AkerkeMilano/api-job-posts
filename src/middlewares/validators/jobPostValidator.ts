import {body} from 'express-validator'

const postTitleValidator = body('title')
.isString().withMessage('title should be string')
.isLength({ max: 30 }).withMessage('title is too long')
.notEmpty()

const postDescriptionValidator = body('description')
.isString().withMessage('description should be string')
.isLength({ max: 100 }).withMessage('description is too long')
.notEmpty()

const postSalaryValidator = body('salary')
.isString().withMessage('salary should be string')
.isLength({ max: 30 }).withMessage('salary is too long')
.notEmpty()

const postLocationValidator = body('location')
.isString().withMessage('location should be string')
.isLength({ max: 30 }).withMessage('location is too long')
.notEmpty()

export const jobPostInputValidators = [
    postTitleValidator,
    postDescriptionValidator,
    postSalaryValidator,
    postLocationValidator
]
