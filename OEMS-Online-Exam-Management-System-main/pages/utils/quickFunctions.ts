import { ExamType, ExamTypeDate } from "../../lib/types/types";

export const parseExams = (exams: ExamTypeDate[]) => {
  const running = [];
  const finished = [];
  const upcomming = [];

  for (const exam of exams) {
    const now = new Date();
    if (exam.start_time < now && now < exam.end_time) {
      running.push(exam);
    } else if (exam.end_time < now) {
      finished.push(exam);
    } else {
      upcomming.push(exam);
    }
  }
  running.sort((exam1, exam2) => (exam1 < exam2 ? -1 : 1));
  finished.sort((exam1, exam2) => (exam1 < exam2 ? 1 : -1));
  return { upcomming, running, finished };
};

export const convertExamDates: (exam: ExamType) => ExamTypeDate = (exam: ExamType) => {
  const startDate = new Date(exam.start_date);
  const startTime = new Date(exam.start_time);
  const endTime = new Date(exam.end_time);

  startTime.setDate(startDate.getDate());
  startTime.setMonth(startDate.getMonth());
  startTime.setFullYear(startDate.getFullYear());

  endTime.setDate(startDate.getDate());
  endTime.setMonth(startDate.getMonth());
  endTime.setFullYear(startDate.getFullYear());

  return { ...exam, start_date: startDate, start_time: startTime, end_time: endTime };
};
