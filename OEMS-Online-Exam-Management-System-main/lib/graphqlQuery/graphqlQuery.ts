import { DocumentNode, gql } from "@apollo/client";
import { ExamType, InsertExamType } from "../types/types";

export const getAllExamsQuery: () => DocumentNode = () =>
  gql(getAllExamsQueryString());

export const getAllCourseQuery: () => DocumentNode = () =>
  gql(getAllCourseQueryString());

export const getSignInInformationQuery: (email: string) => DocumentNode = (
  email
) => gql(getSignInInformationQueryString(email));

export const getUpsertQueryWithEmail: (
  email: string,
  name: string,
  imageUrl: string
) => DocumentNode = (name, email, imageUrl) =>
  gql(getUpsertQueryWithEmailString(name, email, imageUrl));

export const getInsertExamQuery: (examInfo: InsertExamType) => DocumentNode = (
  examInfo
) => {
  return gql(getInsertExamQueryString(examInfo));
};

export const getExamByIdQuery: (id: string) => DocumentNode = (id) =>
  gql(getExamByIdQueryString(id));

export const getDiscussionByIdQuery: (id: string) => DocumentNode = (id) =>
  gql(getDiscussionByIdQueryString(id));

// String Query //

export const getAllExamsQueryString: () => string = () => {
  return `
  query MyQuery {
    exams {
      id
      exam_title
      start_date
      start_time
      end_time
      course {
        course_title
        course_code
      }
      user {
        name
        email
      }
    }
  }
`;
};

export const getAllCourseQueryString: () => string = () => `
  query MyQuery {
    courses {
      course_code
      course_title
    }
  }
`;

export const getSignInInformationQueryString: (email: string) => string = (
  email
) => `
    query MyQuery {
        users(where: {email: {_eq: "${email}"}}) {
        adminRole
        name
        }
    }
`;

export const getUpsertQueryWithEmailString: (
  email: string,
  name: string,
  imageUrl: string
) => string = (name, email, imageUrl) => `
  mutation random {
    insert_users_one(
      object: {
        email: "${email}"
        imageUrl: "${imageUrl}"
        name: "${name}"
      }
      on_conflict: {
        constraint: users_email_key
        update_columns: [imageUrl, name]
      }
    ) {
      imageUrl
      name
      email
      adminRole
    }
  }
`;

export const getInsertExamQueryString: (examInfo: InsertExamType) => string = (
  examInfo
) => {
  return `
    mutation MyMutation {
        insert_exams_one(
          object: {
            course_code: "${examInfo.course_code}"
            creatorEmail: "${examInfo.creatorEmail}"
            end_time: "${examInfo.end_time}"
            start_time: "${examInfo.start_time}"
            exam_title: "${examInfo.exam_title}"
            start_date: "${examInfo.start_date}"
          }
        ) {
          id
        }
      }
    `;
};

export const getExamByIdQueryString: (id: string) => string = (id) => `
  query MyQuery {
    exams(where: {id: {_eq: ${id}}}) {
      id
      exam_title
      start_date
      start_time
      end_time
      course {
        course_title
        course_code
      }
      user {
        name
        email
      }
    }
  }`;

export const getDiscussionByIdQueryString: (id: string) => string = (id) => `
  query MyQuery {
    discussions(where: {exam_id: {_eq: ${id}}}) {
      comment
      email
      exam_id
      id
      user {
        imageUrl
        name
      }
    }
  }
`;

export const getUpsertCommentQueryString: (
  exam_id: string,
  email: string,
  comment: string
) => string = (exam_id, email, comment) => `
  mutation MyMutation {
    insert_discussions_one(object: {exam_id: ${exam_id}, email: "${email}", comment: "${comment}"}) {
      id
    }
  }
`;

export const getUpsertAllowedTeacherQueryString: (
  email: string,
  exam_id: string
) => string = (email, exam_id) => `
mutation MyMutation {
  insert_allowed_teacher_one(object: {email: "${email}", exam_id: ${exam_id}}) {
    id
  }
}
`;

export const getUpsertAllowedTeacherQuery: (
  email: string,
  exam_id: string
) => DocumentNode = (email, exam_id) =>
  gql(getUpsertAllowedTeacherQueryString(email, exam_id));

export const getAllowedTeacherQueryString: (id: string) => string = (id) => `
  query MyQuery {
    allowed_teacher(where: {exam_id: {_eq: ${id}}}) {
      email
      user {
        name
        imageUrl
      }
    }
  }
`;

export const getAllowedTeacherQuery: (id: string) => DocumentNode = (id) =>
  gql(getAllowedTeacherQueryString(id));

export const getClarificationWithIdQueryString: (id: string) => string = (
  id
) => `
  query MyQuery {
    clarification(where: {exam_id: {_eq: ${id}}}) {
      id
      text
      user {
        name
        imageUrl
      }
    }
  }
`;

export const getClarificationWithIdQuery: (id: string) => DocumentNode = (
  id
) => {
  return gql(getClarificationWithIdQueryString(id));
};

export const getUpsertClarificationQueryString: (
  exam_id: string,
  email: string,
  comment: string
) => string = (exam_id, email, comment) => `
  mutation MyMutation {
    insert_clarification_one(object: {exam_id: ${exam_id}, email: "${email}", text: "${comment}"}) {
      id
    }
  }
`;

export const getUpsertQuestionQueryString: (
  link: string,
  exam_id: string
) => string = (link, exam_id) => `
  mutation MyMutation {
    insert_questions_one(object: {link: "${link}", exam_id: ${exam_id}}) {
      id
      link
    }
  }
`;

export const getQuestionsWithIdQueryString: (id: string) => string = (id) => `
query MyQuery {
  questions(where: {exam_id: {_eq: ${id}}}) {
    link
    exam_id
    id
  }
}
`;

export const getAllTeacherQuery: () => DocumentNode = () =>
  gql(`
  query MyQuery {
    users(where: {adminRole: {_eq: true}}) {
      email
      imageUrl
      name
    }
  }
`);

export const getUpdateRollAndContactQueryString: (
  email: string,
  contact: string,
  roll: string
) => string = (email, contact, roll) =>
`
  mutation MyMutation {
    update_users(where: {email: {_eq: "${email}"}}, _set: {roll: "${roll}", contactNo: "${contact}"}) {
      returning {
        id
        name
        email
        adminRole
        roll
        contactNo
      }
    }
  }
`;
