import React, { useEffect, useState } from 'react';
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
import DetailMagazine from './DetailMagazine';

const CreateMagazineDemo = () => {
  const [useRecoilData, setUseRecoilData] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();

  // 매거진명, 인터뷰이
  const { magazineTitle, interviewee } = location.state || {};

  // 폼
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
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  // fields.map((e) => console.log(e));

  const { magazineId } = useParams();
  const [isMagazineId, setIsMagazineId] = useState(false);

  useEffect(() => {
    if (magazineId) {
      setIsMagazineId(true);
    }
  });

  const { magazineDetailResult, isLoading, isError } = useGetMagazineDetail(magazineId as string);

  useEffect(() => {
    if (magazineId) {
      // magazineId가 있을 때 magazineDetailResult로 초기화
      console.log(magazineDetailResult);
      if (magazineDetailResult) {
        reset({
          title: magazineTitle,
          interviewPerson: interviewee,
          magazineIntro: magazineDetailResult.magazineIntro,
          magazinePhotos: magazineDetailResult.magazinePhotos,
          questions: magazineDetailResult.questions,
        });
      }
    } else {
      // magazineId가 없을 때 초기 값 그대로 둠
      reset();
    }
  }, [magazineDetailResult, reset, magazineId]);

  // magazineDetail 상태 관리
  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  /**
   * 미리보기
   */
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleClickPreview = () => {
    const form = watch();
    setMagazineDetail(form);
    reset(form);
    setIsPreviewOpen(true);
  };

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
        const { questionId, ...questionRest } = question;
        return questionRest;
      }),
    };
    if (magazineId) {
      // 매거진 수정
      console.log(createdData);
      await updateMagazine(createdData, magazineId);
    } else {
      // 매거진 생성
      await createMagazine(createdData);
    }
    navigate('/');
  };

  return (
    <PageLayoutWrapper $isPreviewOpen={isPreviewOpen}>
      <PageLayout>
        <MagazineAdminHeader />
        <AdminContentLayout isPreviewOpen={isPreviewOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isPreviewOpen ? (
              <>
                <St.TitleHeader>매거진 명</St.TitleHeader>
                <MagazineCreateElement setValue={setValue} register={register} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={55} inputHeight={12} registerField={'title'} watch={watch} />
                <St.TitleHeader>인터뷰이</St.TitleHeader>
                <MagazineCreateElement setValue={setValue} watch={watch} register={register} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} registerField={'interviewPerson'} />
                <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
                <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
                <St.ImageUploadContainer>
                  {[...Array(4)].map((item, index) => (
                    <ImageUploader setValue={setValue} target={`magazinePhotos[${index}]`} width={28.2} height={28.2} watch={watch} />
                  ))}
                </St.ImageUploadContainer>
                <St.TitleHeader>서론</St.TitleHeader>
                <MagazineCreateElement setValue={setValue} watch={watch} register={register} inputPlaceholer={'서론을 작성해주세요'} inputMaxLength={500} inputHeight={28.2} registerField={'magazineIntro'} />
                <St.TitleHeader>인터뷰</St.TitleHeader>
                {fields.map((item, index) => {
                  return (
                    <section key={item.id}>
                      <St.QuestionIndex>Q{index + 1}</St.QuestionIndex>
                      <MagazineCreateElement setValue={setValue} watch={watch} register={register} inputPlaceholer={'질문을 작성해주세요.'} inputMaxLength={200} inputHeight={28.2} registerField={`questions.${index}.question`} />
                      <MagazineCreateElement setValue={setValue} watch={watch} register={register} inputPlaceholer={'답변을 작성해주세요.'} inputMaxLength={1000} inputHeight={28.2} registerField={`questions.${index}.answer`} />
                      <St.QuestionImageTitle>이미지 등록</St.QuestionImageTitle>
                      <St.QuestionImageTitleCaption>16:9 비율의 이미지를 등록해주세요. 1장 등록 가능합니다.</St.QuestionImageTitleCaption>
                      <ImageUploader setValue={setValue} target={`questions.${index}.answerImage`} width={51.2} height={28.8} watch={watch} />
                      <MagazineCreateElement setValue={setValue} watch={watch} register={register} inputPlaceholer={'이미지에 대해 간략히 설명해주세요.'} inputMaxLength={50} inputHeight={12} registerField={`questions.${index}.imageCaption`} />
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
                      append({ questionId: 0, questionOrder: fields.length + 1, question: '', answer: '', answerImage: '', imageCaption: '' });
                    }}
                  >
                    문항 추가
                  </St.QuestionControlButton>
                </St.QuestionControlButtonSection>
              </>
            ) : (
              <>
                <DetailMagazine key={isPreviewOpen.toString()} useRecoilData={useRecoilData} />
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

const PageLayoutWrapper = styled.div<{
  $isPreviewOpen: boolean;
}>`
  ${({ $isPreviewOpen, theme }) => css`
    background-color: ${$isPreviewOpen ? theme.colors.Gam_Gray : 'inherit'};
  `}
`;

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
    margin: 4rem 0rem 16rem;
    gap: 2.4rem;
  `,

  QuestionControlButton: styled.button`
    display: flex;
    width: 18rem;
    padding: 2.3rem 2rem;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray-scale-gam-gray-2, #cccaca);
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
