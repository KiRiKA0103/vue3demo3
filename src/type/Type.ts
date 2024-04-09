
export interface Teacher {
  tid?: number;
  username?: string;
  password?: string;
  tname?: string;
  imgUrl?: string;
}

export interface Course {
  cid?: number;
  tid?: number;
  cname?: string;
  duration?: number;
}

export interface Classroom {
  classname?: string;
  bookings?: Booking[]
}

export interface Booking {
  classname?: string;
  course?: Course;
  week?: number[];
  time?: number;
}


export interface ResultVO<T> {
  code: number;
  message?: string;
  data: T
}