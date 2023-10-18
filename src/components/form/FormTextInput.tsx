import { TextInput } from "@mantine/core"

const FormTextInput = (props:object) => {
    
    const {
        disabled,
        placeholder,
        input,
        meta: {touched, error, submitError},
        ...rest
    } = props

    const definedError = touched && error || submitError

    return (
        <TextInput
            {...input}
            {...rest}
            disabled={disabled}
            placeholder={placeholder}
            error={definedError}
            // error={touched && props.meta.error && <span>{props.meta.error}</span>}
        />
    )
}

export default FormTextInput