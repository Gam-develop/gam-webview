import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MagazineAdminHeader from '../components/MagazineAdminHeader';
import AdminContentLayout from '../components/AdminContentLayout';
import ImageUploader from '../components/ImageUploader';
import styled from 'styled-components';
import MagazineCreateElement from '../components/MagazineCreateElement';
import { updateMagazine } from '../lib/api/magazine';
import { useNavigate } from 'react-router-dom';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import { magazineDetail, magazineDetailResult, magazineQuestionInfo } from '../types/magazine';
import { magazineDetailState, magazineResultState } from '../recoil/atom';
import { DefaultValue, useRecoilValue, useSetRecoilState } from 'recoil';
import Magazine from '../components/Magazine';

const DetailMagazine = () => {
  const { magazineId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    document.getElementById('root')?.classList.remove('modal-open');
    setIsPreviewOpen(false);
  };

  // 매거진명, 인터뷰이
  const location = useLocation();
  const { magazineTitle, interviewee } = location.state || {};

  // 매거진 detail 정보 가져오기
  const { magazineDetailResult, isLoading, isError } = useGetMagazineDetail(magazineId as string);

  // magazineResult 상태 관리
  const setMagazineResult = useSetRecoilState<magazineDetailResult>(magazineResultState);
  const magazineResult = useRecoilValue(magazineResultState);

  // magazineDetail 상태 관리
  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  useEffect(() => {
    if (magazineDetailResult) {
      const magazine = {
        title: magazineTitle,
        interviewPerson: interviewee,
        ...magazineDetailResult,
      };
      setMagazineResult(magazine);
      setMagazineDetail(magazineDetailResult);
    }
  }, [magazineDetailResult]);

  /**
   * 폼 관리
   */
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: magazineResult,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  /**
   * 폼상태들이 변경될 때마다 업데이트
   */
  useEffect(() => {
    setValue('title', magazineResult.title);
    setValue('interviewPerson', magazineResult.interviewPerson);
    setValue('magazineIntro', magazineResult.magazineIntro);
    setValue('magazinePhotos', magazineResult.magazinePhotos || []);
    setValue('questions', magazineResult.questions || []);
    setMagazineResult(magazineResult);
  }, [magazineResult, setValue, register]);

  const [formState, setFormState] = useState({
    title: magazineResult.title,
    interviewPerson: magazineResult.interviewPerson,
    magazineIntro: magazineDetail.magazineIntro,
    magazinePhotos: [...magazineDetail.magazinePhotos],
    questions: magazineDetail.questions.map((item) => ({
      ...item,
    })),
  });

  /**
   * questions, magazinePhotos폼 업데이트
   * @param fieldName
   * @param index
   * @param value
   */
  const handleFormArrayChange = (fieldName: string, index: number, value: string) => {
    console.log(fieldName, index, value);
    if (fieldName === 'magazinePhotos') {
      setFormState((prevFormState) => {
        // 이전 상태 복사
        const newState = { ...prevFormState };
        // magazinePhotos 배열 복사
        const updatedMagazinePhotos = [...newState[fieldName]];
        // 특정 인덱스의 값 변경
        updatedMagazinePhotos[index] = value;
        // 변경된 magazinePhotos를 새 상태에 업데이트
        newState[fieldName] = updatedMagazinePhotos;
        return newState;
      });
      console.log(formState);
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        questions: prevFormState.questions.map((item, i) =>
          i === index
            ? {
                ...item,
                [fieldName]: value,
              }
            : item,
        ),
      }));
    }
  };

  /**
   * 매거진명, 인터뷰이, 서론 폼 업데이트
   * @param fieldName
   * @param value
   */
  const handleFormChange = (fieldName: string, value: any) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  /**
   * 미리보기
   */
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleClickPreview = () => {
    document.getElementById('root')?.classList.add('modal-open');
    setMagazineResult(formState);
    setMagazineDetail(formState);
    reset(formState);
    setIsPreviewOpen(true);
  };

  /**
   * @param data 매거진 수정
   */
  const onSubmit = async (data: any) => {
    setMagazineResult(formState);
    setMagazineDetail(formState);
    const updatedData: magazineDetailResult = {
      ...formState,
      questions: formState.questions.map((question: magazineQuestionInfo) => {
        const { questionId, ...questionRest } = question;
        return questionRest;
      }),
    };

    await updateMagazine(updatedData, magazineId);

    document.getElementById('root')?.classList.remove('modal-open');
    navigate('/');
  };

  return (
    <PageLayout className={isPreviewOpen ? 'modal-open' : ''}>
      <MagazineAdminHeader />
      <AdminContentLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isPreviewOpen ? (
            <>
              <St.TitleHeader>매거진 명</St.TitleHeader>
              <MagazineCreateElement register={register} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={50} inputHeight={12} registerField={'title'} onFormChange={handleFormChange} defaultValue={magazineTitle} />
              <St.TitleHeader>인터뷰이</St.TitleHeader>
              <MagazineCreateElement register={register} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} registerField={'interviewPerson'} onFormChange={handleFormChange} defaultValue={interviewee} />
              <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
              <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
              <St.ImageUploadContainer>
                {[...Array(4)].map((item, index) => (
                  <ImageUploader key={index} target={`magazinePhotos[${index}]`} width={28.2} height={28.2} onFormChange={(value: string) => handleFormArrayChange('magazinePhotos', index, value)} defaultValue={magazineResult.magazinePhotos ? magazineResult.magazinePhotos[index] : ''} />
                ))}
              </St.ImageUploadContainer>
              <St.TitleHeader>서론</St.TitleHeader>
              <MagazineCreateElement register={register} inputPlaceholer={'서론을 작성해주세요'} inputMaxLength={500} inputHeight={28.2} registerField={'magazineIntro'} onFormChange={handleFormChange} defaultValue={magazineDetail.magazineIntro} />
              <St.TitleHeader>인터뷰</St.TitleHeader>
              {fields.map((item, index) => {
                return (
                  <section key={item.id}>
                    <St.QuestionIndex>Q{index + 1}</St.QuestionIndex>
                    <MagazineCreateElement
                      register={register}
                      inputPlaceholer={'질문을 작성해주세요.'}
                      inputMaxLength={200}
                      inputHeight={28.2}
                      registerField={`questions.${index}.question`}
                      onFormChange={(registerField: string, value: string) => handleFormArrayChange('question', index, value)}
                      defaultValue={item.question}
                    />
                    <MagazineCreateElement
                      register={register}
                      inputPlaceholer={'답변을 작성해주세요.'}
                      inputMaxLength={1000}
                      inputHeight={28.2}
                      registerField={`questions[${index}].answer`}
                      onFormChange={(registerField: string, value: string) => handleFormArrayChange('answer', index, value)}
                      defaultValue={item.answer}
                    />
                    <St.QuestionImageTitle>이미지 등록</St.QuestionImageTitle>
                    <St.QuestionImageTitleCaption>16:9 비율의 이미지를 등록해주세요. 1장 등록 가능합니다.</St.QuestionImageTitleCaption>
                    <ImageUploader target={`questions.${index}.answerImage`} width={51.2} height={28.8} onFormChange={(value: string) => handleFormArrayChange('answerImage', index, value)} defaultValue={item.answerImage ? item.answerImage : ''} />
                    <MagazineCreateElement
                      register={register}
                      inputPlaceholer={'이미지에 대해 간략히 설명해주세요.'}
                      inputMaxLength={50}
                      inputHeight={12}
                      registerField={`questions.${index}.imageCaption`}
                      onFormChange={(registerField: string, value: string) => handleFormArrayChange('imageCaption', index, value)}
                      defaultValue={item.imageCaption}
                    />
                  </section>
                );
              })}
              <St.QuestionControlButtonSection>
                <St.QuestionControlButton type="button" onClick={() => remove(fields.length - 1)}>
                  문항 빼기
                </St.QuestionControlButton>
                <St.QuestionControlButton
                  type="button"
                  onClick={() => {
                    append({ questionOrder: fields.length + 1, question: '', answer: '', answerImage: '', imageCaption: '' });
                  }}
                >
                  문항 추가
                </St.QuestionControlButton>
              </St.QuestionControlButtonSection>
            </>
          ) : (
            <>
              <Magazine key={isPreviewOpen.toString()} />
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
            <St.magazineSubmitButton type="submit">수정하기</St.magazineSubmitButton>
          </St.magazineButtonContainer>
        </form>
      </AdminContentLayout>
      <Outlet />
    </PageLayout>
  );
};

export default DetailMagazine;

const St = {
  TitleHeader: styled.div`
    margin-top: 8rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Extra_Bold_18};
  `,

  TitleReprase: styled.div`
    margin-top: 0.8rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
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
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Extra_Bold_18};
  `,

  QuestionImageTitle: styled.div`
    margin-top: 4rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_18};
  `,

  QuestionImageTitleCaption: styled.div`
    margin: 0.8rem 0rem 2.4rem 0rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
  `,

  QuestionControlButtonSection: styled.section`
    display: flex;
    margin: 4rem 0rem 16rem 0rem;
  `,

  QuestionControlButton: styled.button`
    display: flex;
    width: 18rem;
    padding: 2.3rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    margin-right: 2.4rem;
    border: 1px solid var(—gray-scale-gam-gray-2, #cccaca);
    background: ${({ theme }) => theme.colors.Gam_White};
  `,
  magazineButtonContainer: styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    margin-bottom: 16rem;
    /* background: ${({ theme }) => theme.colors.Gam_Black}; */
    color: ${({ theme }) => theme.colors.Gam_White};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
  `,
  magazinePreloadButton: styled.button`
    width: 50%;
    height: 100%;
    display: flex;
    padding: 2.3rem 2rem;
    /* margin-bottom: 16rem; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.Gam_GrayBorder};
    background: ${({ theme }) => theme.colors.Gam_White};
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
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
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
  `,
};
