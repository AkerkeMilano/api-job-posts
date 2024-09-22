import {body} from 'express-validator'

const appNameValidator = body('name')
.isString().withMessage('name should be string')
.isLength({ max: 30 }).withMessage('name is too long')
.notEmpty()

const appEmailValidator = body('email')
.isString().withMessage('Please provide a valid email')
.notEmpty().withMessage('Email is required.')
.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Email does not match regex")

const appResumeValidator = body('resume')
.isString().withMessage('resume should be string')
.isLength({ max: 100 }).withMessage('resume is too long')
.notEmpty()

export const jobApplicationInputValidators = [
    appNameValidator,
    appEmailValidator,
    appResumeValidator
]
