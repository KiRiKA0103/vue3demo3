import type { Course, Teacher, Classroom } from "@/type/Type"

export function listCourses() {
  const courses: Course[] = [
    {
      cid: 20001,
      tid: 10001,
      cname: 'WEB开发框架',
      duration: 16,
    },
    {
      cid: 20002,
      tid: 10001,
      cname: 'VUE前端框架',
      duration: 12,
    },
    {
      cid: 20003,
      tid: 10001,
      cname: 'Java开发基础',
      duration: 12,
    }
  ]

  return courses
}

export function listClassrooms() {
  const classrooms: Classroom[] = [
    {
      classname: '901',
      bookings: [{
        classname: '901',
        course: {
          cid: 20001,
          tid: 10001,
          cname: 'WEB开发框架',
          duration: 16,
        },
        week: [1, 2, 3, 4],
        time: 2
      },
      {
        classname: '901',
        course: {
          cid: 20001,
          tid: 10001,
          cname: 'WEB开发框架',
          duration: 16,
        },
        week: [1, 2, 3, 4],
        time: 10
      }]
    },
    {
      classname: '902',
      bookings: []
    },
    {
      classname: '903',
      bookings: []
    },
    {
      classname: '904',
      bookings: [{
        classname: '904',
        course: {
          cid: 20003,
          tid: 10001,
          cname: 'Java开发基础',
          duration: 12,
        },
        week: [5, 6, 7],
        time: 6
      },
      {
        classname: '904',
        course: {
          cid: 20003,
          tid: 10001,
          cname: 'Java开发基础',
          duration: 12,
        },
        week: [5, 6, 7],
        time: 13
      }]
    },
    {
      classname: '905',
      bookings: []
    },
    {
      classname: '906',
      bookings: []
    },
    {
      classname: '907',
      bookings: []
    },
    {
      classname: '908',
      bookings: []
    },
    {
      classname: '909',
      bookings: []
    },
    {
      classname: '910',
      bookings: []
    },
    {
      classname: '911',
      bookings: []
    },
    {
      classname: '912',
      bookings: []
    }
  ]
  return classrooms
}

export function listTeachers() {
  const teachers: Teacher[] = [
    {
      tid: 10001,
      username: 'root',
      password: '123456',
      tname: '王波',
      imgUrl: '/public/images/bo.png'
    }
  ]
  return teachers
}
