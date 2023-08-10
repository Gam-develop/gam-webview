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
