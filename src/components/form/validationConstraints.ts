const validationConstraints = {
    required: (value:any) => {
        if (value !== undefined
            && value !== null
            // && typeof value === 'object'
            && [Array, String].indexOf(value.constructor) !== -1
        ) {
            return value.length > 0 ? undefined : 'Required'
        }
    }
}

// @ts-ignore
export const composeValidators = (...validators) => (value:any) =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export default validationConstraints;