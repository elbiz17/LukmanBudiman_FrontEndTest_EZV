import InputLabel from '@/components/molecules/InputLabel'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CreateTodoRequest } from '@/types/todo'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function TodoForm({ onSubmit }: { onSubmit: (values: CreateTodoRequest) => void }) {

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  })

  const initialValues = {
    userId: 1,
    title: '',
    completed: false
  }

  const forms = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.userId = Number(values.userId)
      onSubmit(values)
    }
  })


  return (
    <form onSubmit={forms.handleSubmit} className='space-y-3'>
      <div>
        <InputLabel
          label='User Id'
          value={forms.values.userId.toString()}
          error={forms.errors.userId as string}
          onChange={(e) => {
            const value = Number(e.target.value);
            if(value < 1) return;
            forms.setFieldValue('userId', e.target.value)
          }}
          type='number'
        />
      </div>
      <div>
        <InputLabel
          label='Title'
          value={forms.values.title}
          error={forms.errors.title as string}
          onChange={(e) => {
            forms.setFieldValue('title', e.target.value)
          }}
        />
      </div>
      <div className='flex gap-2'>
        <Checkbox
          id="completed"
          checked={forms.values.completed}
          onCheckedChange={(checked) => {
            forms.setFieldValue('completed', checked)
          }}
        />
        <Label htmlFor="completed">Mark as completed</Label>
      </div>

      <button id="btnSubmit" hidden></button>
    </form>
  )
}
