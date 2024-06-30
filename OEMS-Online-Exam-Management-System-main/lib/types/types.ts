export type CourseType = {
  course_code: string;
  course_title: string;
};
export type ExamTypeDate = {
  id: string;
  exam_title: string;
  start_date: Date;
  start_time: Date;
  end_time: Date;
  course: CourseType;
  user: {
    name: string;
    email: string;
  };
};

export type ExamType = {
  id: string;
  exam_title: string;
  start_date: string;
  start_time: string;
  end_time: string;
  course: CourseType;
  user: {
    name: string;
    email: string;
  };
};

export type UserInfoType = {
  name: string;
  email: string;
  adminRole: boolean;
  imageUrl: string;
};

// export const dummyUserInfo: UserInfo = {
//   name: "",
//   email: "",
//   adminRole: false,
//   imageUrl: ""
// }

export type UpsertUserType = {
  name: string;
  email: string;
  imageUrl: string;
};

export type InsertExamType = {
  id: string;
  exam_title: string;
  start_date: string;
  start_time: Date;
  end_time: Date;
  creatorEmail: string;
  course_title: string;
  course_code: string;
};

export type DiscussionType = {
  comment: string;
  email: string;
  exam_id: string;
  id?: string;
  user: {
    name: string;
    imageUrl: string;
  }
}
