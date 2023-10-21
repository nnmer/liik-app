import { Field } from "react-final-form";

const identity = (value:any) => (value);

/*
 * This wraps react-final-form's <Field/> component.
 * The identity function ensure form values never get set to null
 * but rather, empty strings.
 * 
 * See https://github.com/final-form/react-final-form/issues/130
 */

export default (props:any): React.ReactElement => <Field parse={identity} {...props} />
