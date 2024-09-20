import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    comments: Yup.string().required('comments is required'),
    isComplete: Yup.boolean(),
    dueDate: Yup.date().required('Due date is required'),
});