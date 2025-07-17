# Todo List App - Skill Test Frontend Developer PT. EZV Service Indonesia

Aplikasi Todo List menggunakan **Next.js App Router**, **RTK Query (Redux Toolkit Query)**, dan implementasi strategi **SSR** dan **ISR** untuk data fetching.

## Fitur Utama

- ✅ Menampilkan daftar Todo dari API [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)
- ✅ Fetch API menggunakan **Redux Toolkit Query**
- ✅ Form untuk menambahkan Todo (`POST /todos`)
- ✅ Pagination dengan query `_start` dan `_limit` (10 data per halaman)
- ✅ SSR (`getServerSideProps`) dan ISR (`revalidate`) untuk pre-render halaman
- ✅ Client-side data revalidation dengan RTK Query
- ✅ Toggle antara tampilan SSR dan ISR
- ✅ UI dibuat dengan struktur atomic design (Organisms, Molecules, Atoms)

---

## Struktur Folder

```bash
src/
│
├── app/
│   ├── ssr/page.tsx         
│   ├── isr/page.tsx        
│
├── components/
│   ├── organisms/
│   │   └── todo/
│   │       ├── TodoList.tsx
│   │       └── TodoForm.tsx
│   ├── pagination/
│   │   └── Pagination.tsx
│   └── ui/
│       └── (reusable Tailwind components like Card, Button, Modal, etc.)
│
├── redux/
│   └── dataApi/
│       └── dataApi.ts       
│
├── services/
│   └── todosService.ts     
│
├── types/
│   └── todo.ts              
│
└── constants/
    └── constants.ts         
```

## Cara Menjalankan 

bun install         
bun dev            


## Endpoint 
GET Todos: https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10

POST Todo: https://jsonplaceholder.typicode.com/todos

GET Semua Todos: https://jsonplaceholder.typicode.com/todos