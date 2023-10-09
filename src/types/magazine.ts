export interface magazineDetail {
  magazineIntro: string;
  magazinePhotos: string[];
  questions: magazineQuestionInfo[];
}

export interface magazineQuestionInfo {
  questionId: number;
  questionOrder: number;
  question: string;
  answer: string;
  answerImage: string;
  imageCaption: string;
}

export interface magazineQuestionAdminInfo {
  questionOrder: number;
  question: string;
  answer: string;
  answerImage: string;
  imageCaption: string;
}

export interface magazineListData {
  magazineId: number;
  magazineTitle: string;
  interviewee: string;
}

export interface magazineResult {
  magazineTitle: string;
  magazineInterviewee: string;
  magazineIntro: string;
  magazinePhotos: string[];
  questions: magazineQuestionAdminInfo[];
}
