import { createServer, Response } from 'miragejs'
import type { Teacher, Course, ResultVO, Classroom } from '@/type/Type.ts'
import { listClassrooms, listCourses, listTeachers } from '@/dataSource/data'
import { useCourseStore } from '@/store/courseStore'

const server = createServer({})
server.namespace = ''

server.post('login', (_schema, request) => {
  const { username, password } = JSON.parse(request.requestBody)
  const resultVO: ResultVO<{}> = { code: 200, data: {} }
  // 查询教师
  const teacher = listTeachers().find(teacher => teacher.username == username && teacher.password == password)

  if (teacher) {
    resultVO.data = { teacher }
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYm8iLCJhZG1pbiI6dHJ1ZX0.1nCuC7_B_0gp9pl92k0QrYuBoNd4OyhVlQYBpvexherfYJMXzC0zTeCzgnOIiBrWRKj5P3Ze3USFDr3h_wVT8g'
    return new Response(200, { token }, resultVO)
  }
  resultVO.code = 401
  resultVO.message = '账号密码错误'
  return resultVO
})

server.get('teacher/:tid/courses', (_schema, request) => {
  // console.log(request.params.tid)
  const tid = request.params.tid
  const courses: Course[] = listCourses().filter(course => course.tid == parseInt(tid))
  const resultVO: ResultVO<{}> = {
    code: 200,
    data: { courses }
  }
  return resultVO
})

server.get('classrooms', (_schema, request) => {
  const classrooms: Classroom[] = listClassrooms()
  const resultVO: ResultVO<{}> = {
    code: 200,
    data: { classrooms }
  }
  return resultVO
})


server.post('course/add', (_schema, request) => {
  const course: Course = JSON.parse(request.requestBody)
  course.cid = listCourses().sort((a, b) => b.cid! - a.cid!)[0].cid! + 1

  useCourseStore().courses.value.push(course)
  
  const resultVO: ResultVO<{}> = { code: 200, data: {} }

  resultVO.message = '创建成功'

  return resultVO
})


server.passthrough('https:/api.github.com/users/**')