const checkFormValidation = (data: any) => {
  // 필수 입력값 확인
  const isTitleValid = !!data.title;
  const isInterviewPersonValid = !!data.interviewPerson;
  const isMagazineIntroValid = !!data.magazineIntro;

  // 최소 한 개의 magazinePhoto가 있어야 함
  const isMagazinePhotosValid = Array.isArray(data.magazinePhotos) && data.magazinePhotos.length > 0;

  // 최소 한 개의 질문이 있어야 함
  const isQuestionsValid = Array.isArray(data.questions) && data.questions.length > 0;

  // 각 질문에 대한 유효성 검사
  const isQuestionsContentValid = data.questions.every((question: any) => {
    return !!question.question && !!question.answer;
  });

  // 각 필수 입력값이 비어있지 않으면서, 배열의 경우 요소가 하나 이상 있는 경우
  // 그리고 모든 질문에 대한 유효성 검사가 true인 경우 true 반환
  return isTitleValid && isInterviewPersonValid && isMagazineIntroValid && isMagazinePhotosValid && isQuestionsValid && isQuestionsContentValid;
};

export default checkFormValidation;
