"use client"

import { useCreateTodoMutation, useGetAllTodosQuery, useGetTodosQuery } from '@/redux/todoApi/todoApi'
import { CreateTodoRequest, Todo } from '@/types/todo';
import React, { useState } from 'react'
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import Pagination from '../pagination/Pagination';
import { Button } from '../../ui/button';
import Modal from '../modal/Modal';
import TodoForm from './TodoForm';
import { Plus, RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface TodoClientProps {
  initialTodos: Todo[];
}
export default function TodoList({ initialTodos }: TodoClientProps) {
  const router = useRouter()
  const [isShowModal, setIsShowModal] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)


  const { data: todos = initialTodos, refetch, isFetching, isLoading } = useGetTodosQuery({
    start: (page - 1) * limit,
    limit: limit
  }, {
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  })
  const { data: allTodos } = useGetAllTodosQuery({})
  const totalItems = allTodos?.length ?? 0
  const totalPages = Math.ceil(totalItems / limit)

  const onChangePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', String(page))
    newParams.set('limit', String(limit))
    router.push(`?${newParams.toString()}`)
  }

  const resetUrl = () => {
    if (pathname == '/isr') {
      router.push(`/isr`)
    } else {
      router.push(`/ssr`)
    }
  }

  const [createTodos] = useCreateTodoMutation()

  const handleSubmitTodos = async (data: CreateTodoRequest) => {
    try {
      const res = await createTodos(data).unwrap()
      if (res.id == 201) {
        toast.success('Success create todo')
      }
      setIsShowModal(false)
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create todo")
    }

  }

  return (
    <>
      <Modal
        label='Add Todo'
        onClose={() => setIsShowModal(false)}
        onSubmit
        isOpen={isShowModal}
        width='max-w-md'
      >
        <TodoForm onSubmit={handleSubmitTodos} />
      </Modal>

      <div className='space-y-4 w-full'>
        <div className='flex gap-2 items-center justify-between'>
          <div className="mt-4 space-x-4">
            <Link
              href={pathname == '/ssr' ? "/isr" : '/ssr'}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {pathname == '/ssr' ? "View ISR Version" : "View SSR Version"}
            </Link>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant={'transparent'} onClick={() => refetch()} disabled={isFetching}>

              {isFetching && (
                <RotateCw size={12} className='transition-all duration-200 animate-spin' />
              )}
              Refresh
            </Button>
            <Button variant={'transparent'} onClick={resetUrl}>
              Reset
            </Button>
            <Button onClick={() => setIsShowModal(true)} disabled={isFetching}><Plus size={12} /> Add Todos</Button>
          </div>

        </div>
        {isLoading || isFetching ? (

          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading todos...</p>
          </div>
        ) : (
          <>
            {todos?.map((todo: Todo) => (
              <Card key={todo.id}>
                <CardContent className='flex items-center justify-between rounded-md'>
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <span>
                        {'#' + todo.id}
                      </span>
                      <Badge variant={'secondary'} className='text-sm capitalize font-medium'>
                        {todo.userId ? 'user ' + todo.userId : '-'}
                      </Badge>
                    </div>
                    <div className='font-semibold text-md capitalize'>
                      {todo.title}
                    </div>
                  </div>
                  <div>
                    <Badge variant={todo.completed ? 'default' : 'destructive'}>{todo.completed ? "Completed" : "Not Completed"}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className='flex justify-center'>
              <Pagination
                onChangePage={onChangePage}
                currentPage={page}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
