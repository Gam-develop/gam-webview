import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MagazineAdminHeader from '../components/MagazineAdminHeader';
import AdminContentLayout from '../components/AdminContentLayout';
import ImageUploader from '../components/ImageUploader';
import styled, { css } from 'styled-components';
import MagazineCreateElement from '../components/MagazineCreateElement';
import { createMagazine, updateMagazine } from '../lib/api/magazine';
import { useNavigate } from 'react-router-dom';
import Magazine from '../components/Magazine';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { magazineDetailState } from '../recoil/atom';
import { magazineQuestionInfo } from '../types/magazine';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import checkFormValidation from '../lib/hooks/checkFormValidation';

const CreateMagazineDemo = () => {
  const [useRecoilData, setUseRecoilData] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();

  // magazineDetail 상태 관리
  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  /**
   * 미리보기
   */
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 매거진명, 인터뷰이
  const { magazineTitle, interviewee } = location.state || {};
  const { magazineId } = useParams();
  const [isMagazineId, setIsMagazineId] = useState(false);
  // 문항들 상태 관리
  const [questionInfo, setQuestionInfo] = useState<magazineQuestionInfo[]>([]);

  // 폼 초기화
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      interviewPerson: '',
      magazineIntro: '',
      magazinePhotos: [] as string[],
      questions: [
        {
          questionId: 1,
          questionOrder: 1,
          question: '',
          answer: '',
          answerImage: '',
          imageCaption: '',
          isImageOpen: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  /**
   * 매거진 세부 불러오기
   */
  const { magazineData, isLoading, isError } = useGetMagazineDetail(magazineId as string);

  useEffect(() => {
    if (magazineId) {
      // magazineId가 있을 때 magazineDetailResult로 초기화
      if (magazineData) {
        // questions 배열을 초기화합니다.
        const initializedQuestions = magazineData.questions.map((question) => ({
          ...question,
          isImageOpen: !!question.answerImage, // answerImage가 있으면 true, 없으면 false
        }));
        setQuestionInfo([...initializedQuestions]);

        reset({
          title: magazineTitle,
          interviewPerson: interviewee,
          magazineIntro: magazineData.magazineIntro,
          magazinePhotos: magazineData.magazinePhotos,
          questions: initializedQuestions.sort((a: magazineQuestionInfo, b: magazineQuestionInfo) => a.questionOrder - b.questionOrder),
        });
      }
    } else {
      // magazineId가 없을 때 초기 값 그대로 둠
      reset();
    }
  }, [magazineData, reset, magazineId]);

  /**
   * 생성하기, 수정하기 구분
   * id가 없으면 생성하기, id가 있으면 수정하기
   */
  useEffect(() => {
    if (magazineId) {
      setIsMagazineId(true);
    }
  });

  /**
   * 각 질문 항목에 이미지 여부 업데이트
   */
  useEffect(() => {
    // 필드 배열이 변경될 때마다 실행
    fields.forEach((item, index) => {
      // 각 필드의 answerImage 값이 비어있는지 여부를 확인하고 업데이트
      const isImageOpen = !!item.answerImage && item.isImageOpen;

      setValue(`questions.${index}.isImageOpen`, !isImageOpen);
    });

    setQuestionInfo(fields);
  }, [fields, setValue]);

  /**
   * 필드 배열이 변경될때마다 실행
   */
  useEffect(() => {
    // 삭제된 경우에는 해당 인덱스 이후의 항목들의 isImageOpen 값을 업데이트합니다.
    questionInfo.forEach((item, index) => {
      // 삭제된 경우 item이 undefined가 될 수 있으므로 체크
      if (!item) return;

      // 해당 인덱스 이후의 항목들의 isImageOpen 값을 업데이트
      for (let i = index; i < fields.length; i++) {
        setValue(`questions.${i}.isImageOpen`, fields[i].isImageOpen);
      }
    });
    setQuestionInfo(fields);
  }, [fields, setValue]);

  /**
   * 이미지 삭제/추가 버튼 클릭시 동작
   * @param i
   */
  const handleClickImage = (i: number) => {
    const currentValue = fields[i].isImageOpen;
    // 이미지 삭제 버튼을 눌렀을 때, answerImage, imageCaption 초기화
    if (currentValue) {
      setValue(`questions.${i}.answerImage`, '');
      setValue(`questions.${i}.imageCaption`, '');
    }

    const updatedQuestionInfo = [...questionInfo];
    updatedQuestionInfo[i].isImageOpen = !currentValue;
    setValue(`questions.${i}.isImageOpen`, !currentValue);
    setQuestionInfo(updatedQuestionInfo);
  };

  /**
   * 미리보기 클릭
   * @returns
   */
  const handleClickPreview = () => {
    const form = watch();
    const isValid = checkFormValidation(form);
    if (isValid) {
      setMagazineDetail(form);
      reset(form);
      setIsPreviewOpen(true);
    } else {
      window.alert('폼의 내용을 모두 입력해주세요');
      return;
    }
  };

  /**
   * 미리보기 -> 뒤로가기 클릭
   */
  const handleGoBack = () => {
    setIsPreviewOpen(false);
  };

  /**
   * 폼 제출
   * @param data
   */
  const onSubmit = async (data: any) => {
    const createdData = {
      ...data,
      questions: data.questions.map((question: magazineQuestionInfo) => {
        const { questionId, isImageOpen, ...questionRest } = question;
        return questionRest;
      }),
    };
    const isValid = checkFormValidation(createdData);
    if (!isValid) {
      window.alert('폼의 내용을 모두 입력해주세요');
      return;
    } else {
      if (magazineId) {
        // 매거진 수정
        await updateMagazine(createdData, magazineId);
      } else {
        // 매거진 생성
        await createMagazine(createdData);
      }
      navigate('/magazine/list');
    }
  };

  return (
    <PageLayoutWrapper isPreviewOpen={isPreviewOpen}>
      <PageLayout>
        <MagazineAdminHeader />
        <AdminContentLayout isPreviewOpen={isPreviewOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isPreviewOpen ? (
              <>
                <St.TitleHeader>매거진 명</St.TitleHeader>
                <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={55} inputHeight={12} registerField={'title'} />
                <St.TitleHeader>인터뷰이</St.TitleHeader>
                <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} registerField={'interviewPerson'} />
                <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
                <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
                <St.ImageUploadContainer>
                  {[...Array(4)].map((item, index) => (
                    <ImageUploader key={index} setValue={setValue} watch={watch} target={`magazinePhotos[${index}]`} width={28.2} height={28.2} />
                  ))}
                </St.ImageUploadContainer>
                <St.TitleHeader>서론</St.TitleHeader>
                <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'서론을 작성해주세요.'} inputMaxLength={500} inputHeight={28.2} registerField={'magazineIntro'} />
                <St.TitleHeader>인터뷰</St.TitleHeader>

                {/* 문항 */}
                {fields.map((question, index) => {
                  const currentQuestionInfo = questionInfo.length > index ? questionInfo[index] : { isImageOpen: false };
                  return (
                    <section key={question.id}>
                      <St.QuestionIndex>Q{index + 1}</St.QuestionIndex>
                      <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'질문을 작성해주세요.'} inputMaxLength={200} inputHeight={28.2} registerField={`questions.${index}.question`} />
                      <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'답변을 작성해주세요.'} inputMaxLength={1000} inputHeight={28.2} registerField={`questions.${index}.answer`} />

                      {/* 현재 문항에 대한 questionInfo를 참조하여 렌더링 */}
                      {currentQuestionInfo.isImageOpen && (
                        <>
                          <St.QuestionImageTitle>이미지 등록</St.QuestionImageTitle>
                          <St.QuestionImageTitleCaption>16:9 비율의 이미지를 등록해주세요. 1장 등록 가능합니다.</St.QuestionImageTitleCaption>
                          <ImageUploader setValue={setValue} watch={watch} target={`questions.${index}.answerImage`} width={51.2} height={28.8} />
                          <MagazineCreateElement register={register} setValue={setValue} watch={watch} inputPlaceholer={'이미지에 대해 간략히 설명해주세요.'} inputMaxLength={50} inputHeight={12} registerField={`questions.${index}.imageCaption`} />
                        </>
                      )}

                      {/* 문항 컨트롤 버튼 */}
                      <St.QuestionControlButtonSection>
                        <St.QuestionControlButton type="button" onClick={() => handleClickImage(index)}>
                          {currentQuestionInfo.isImageOpen ? '이미지 삭제' : '이미지 추가'}
                        </St.QuestionControlButton>
                        {/* 문항 추가 */}
                        {index === fields.length - 1 && (
                          <St.QuestionControlButton
                            type="button"
                            onClick={() => {
                              append({
                                questionId: 0,
                                questionOrder: fields.length + 1,
                                question: '',
                                answer: '',
                                answerImage: '',
                                imageCaption: '',
                                isImageOpen: false,
                              });
                            }}
                          >
                            문항 추가
                          </St.QuestionControlButton>
                        )}
                        {/* 문항 삭제 */}
                        {fields.length > 1 && (
                          <St.QuestionDeleteButton
                            type="button"
                            onClick={() => {
                              remove(index);
                              // 문항 삭제 후 인덱스 재조정
                              const updatedQuestionInfo = questionInfo.filter((_, i) => i !== index);
                              setQuestionInfo(updatedQuestionInfo);
                            }}
                          >
                            문항 삭제
                          </St.QuestionDeleteButton>
                        )}
                      </St.QuestionControlButtonSection>
                    </section>
                  );
                })}
              </>
            ) : (
              <>
                <Magazine key={isPreviewOpen.toString()} useRecoilData={true} />
              </>
            )}
            <St.magazineButtonContainer>
              {!isPreviewOpen ? (
                <St.magazinePreloadButton type="button" onClick={handleClickPreview}>
                  미리보기
                </St.magazinePreloadButton>
              ) : (
                <St.magazinePreloadButton type="button" onClick={handleGoBack}>
                  뒤로가기
                </St.magazinePreloadButton>
              )}
              <St.magazineSubmitButton type="submit">{isMagazineId ? '수정하기' : '발행하기'}</St.magazineSubmitButton>
            </St.magazineButtonContainer>
          </form>
        </AdminContentLayout>
        <Outlet />
      </PageLayout>
    </PageLayoutWrapper>
  );
};

export default CreateMagazineDemo;

const PageLayoutWrapper = styled('div').withConfig({
  shouldForwardProp: (prop) => !['isPreviewOpen'].includes(prop),
})<{
  isPreviewOpen: boolean;
}>`
  ${({ isPreviewOpen, theme }) => css`
    background-color: ${isPreviewOpen ? theme.colors.Gam_Gray : 'inherit'};
  `}
`;

const sharedButtonStyles = css`
  display: flex;
  width: 18rem;
  height: 7rem;
  padding: 2.3rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid var(--gray-scale-gam-gray-2, #cccaca);
  background: ${({ theme }) => theme.colors.Gam_White};
  ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_SemiBold_16};
  color: ${({ theme }) => theme.colors.Gam_Black};
`;

const St = {
  TitleHeader: styled.div`
    margin-top: 8rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_18};
  `,

  TitleReprase: styled.div`
    margin-top: 0.8rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium_17};
  `,

  ImageUploadContainer: styled.div`
    width: 100%;
    display: flex;
    margin-top: 2.4rem;

    & > div {
      margin-right: 2.4rem;
    }
  `,

  QuestionIndex: styled.div`
    margin-top: 4rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_18};
  `,

  QuestionImageTitle: styled.div`
    margin-top: 4rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_18};
  `,

  QuestionImageTitleCaption: styled.div`
    margin: 0.8rem 0rem 2.4rem 0rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium_17};
  `,

  QuestionControlButtonSection: styled.section`
    display: flex;
    margin: 4rem 0rem 16rem;
    gap: 2.4rem;
  `,
  QuestionControlButton: styled.button`
    ${sharedButtonStyles}
  `,
  QuestionDeleteButton: styled.button`
    ${sharedButtonStyles}
    margin-left:auto;
  `,
  magazineButtonContainer: styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    margin-bottom: 16rem;
    @media only screen and (max-width: 430px) {
      display: none;
    }
  `,
  magazinePreloadButton: styled.button`
    width: 50%;
    height: 100%;
    display: flex;
    padding: 2.3rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.Gam_GrayBorder};
    background: ${({ theme }) => theme.colors.Gam_White};
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_SemiBold_16};
  `,
  magazineSubmitButton: styled.button`
    width: 50%;
    height: 100%;
    display: flex;
    padding: 2.3rem 2rem;
    /* margin-bottom: 16rem; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    /* gap: 1.6rem; */
    background: ${({ theme }) => theme.colors.Gam_Black};
    color: ${({ theme }) => theme.colors.Gam_White};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_SemiBold_16};
  `,
};
