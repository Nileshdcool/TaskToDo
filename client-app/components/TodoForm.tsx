import { Formik, Form } from 'formik';
import FormField from './FormField';
import { TodoFormProps } from '@/types/todo-form-props.interface';
import { validationSchema } from '@/schemas/todo-validation.schema';


const TodoForm: React.FC<TodoFormProps> = ({ handleCreateTodo }) => (
  <Formik
    initialValues={{ name: '', description: '', comments: '', isComplete: false, dueDate: '' }}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      handleCreateTodo({
        ...values, dueDate: new Date(values.dueDate),
        id: ''
      });
      resetForm();
    }}
  >
    {({ errors, touched }) => (
      <Form className="mb-4 flex flex-col md:flex-row gap-4">
        <FormField name="name" type="text" placeholder="Name" errors={errors} touched={touched} />
        <FormField name="description" type="text" placeholder="Description" errors={errors} touched={touched} />
        <FormField name="comments" type="text" placeholder="Comments" errors={errors} touched={touched} />
        <FormField name="dueDate" type="date" placeholder="Due Date" errors={errors} touched={touched} />
        <div className="flex-grow">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
            Submit
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default TodoForm;