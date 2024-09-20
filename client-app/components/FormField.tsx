import { Field, ErrorMessage } from 'formik';

interface FormFieldProps {
    name: string;
    type: string;
    placeholder: string;
    errors: any;
    touched: any;
}

const FormField: React.FC<FormFieldProps> = ({ name, type, placeholder, errors, touched }) => (
    <div className="flex-grow">
        <Field
            type={type}
            name={name}
            placeholder={placeholder}
            className={`border p-2 mb-2 md:mb-0 md:mr-2 flex-grow rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors[name] && touched[name] ? 'border-red-500' : 'border-gray-300'}`}
        />
        <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
);

export default FormField;