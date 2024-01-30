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

const DetailMagazine = () => {
  const { magazineId } = useParams();

  const navigate = useNavigate();

  // 매거진명, 인터뷰이
  const location = useLocation();
  const { magazineTitle, interviewee } = location.state || {};

  // 매거진 detail
  const { magazineDetailResult, isLoading, isError } = useGetMagazineDetail(magazineId as string);

  const updatedQuestions = magazineDetailResult?.questions.map(({ questionId, ...rest }) => rest);

  // magazineDetail 상태 관리
  const setMagazineResult = useSetRecoilState(magazineResultState);
  const magazineResult = useRecoilValue(magazineResultState);

  useEffect(() => {
    if (magazineDetailResult) {
      const magazine = {
        title: magazineTitle,
        interviewPerson: interviewee,
        ...magazineDetailResult,
      };
      setMagazineResult(magazine);
      console.log(magazineResult);
    }
  }, [magazineDetailResult]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: magazineResult,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  fields.map((item, index) => console.log(item.answerImage));

  /**
   * @param data 매거진 수정
   */
  const onSubmit = async (data: any) => {
    const { magazineId, ...rest } = data;
    const updatedData: magazineDetailResult = {
      ...rest,
      questions: data.questions.map((question: magazineQuestionInfo) => {
        const { questionId, ...questionRest } = question;
        return questionRest;
      }),
    };

    console.log(updatedData);

    await updateMagazine(updatedData, magazineId);
    navigate('/');
  };

  return (
    <PageLayout>
      <MagazineAdminHeader />
      <AdminContentLayout>
        {magazineDetailResult && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <St.TitleHeader>매거진 명</St.TitleHeader>
            <MagazineCreateElement register={register} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={55} inputHeight={12} registerField={'title'} />
            <St.TitleHeader>인터뷰이</St.TitleHeader>
            <MagazineCreateElement register={register} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} registerField={'interviewPerson'} />
            <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
            <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
            <St.ImageUploadContainer>
              {[...Array(4)].map((item, index) => (
                <ImageUploader key={index} setValue={setValue} target={`magazinePhotos[${index}]`} width={28.2} height={28.2} defaultValue={magazineResult.magazinePhotos ? magazineResult.magazinePhotos[index] : ''} />
              ))}
            </St.ImageUploadContainer>
            <St.TitleHeader>서론</St.TitleHeader>
            <MagazineCreateElement register={register} inputPlaceholer={'서론을 작성해주세요'} inputMaxLength={500} inputHeight={28.2} registerField={'magazineIntro'} />
            <St.TitleHeader>인터뷰</St.TitleHeader>
            {fields.map((item, index) => {
              return (
                <section key={item.id}>
                  <St.QuestionIndex>Q{index + 1}</St.QuestionIndex>
                  <MagazineCreateElement register={register} inputPlaceholer={'질문을 작성해주세요.'} inputMaxLength={200} inputHeight={28.2} registerField={`questions.${index}.question`} />
                  <MagazineCreateElement register={register} inputPlaceholer={'답변을 작성해주세요.'} inputMaxLength={1000} inputHeight={28.2} registerField={`questions.${index}.answer`} />
                  <St.QuestionImageTitle>이미지 등록</St.QuestionImageTitle>
                  <St.QuestionImageTitleCaption>16:9 비율의 이미지를 등록해주세요. 1장 등록 가능합니다.</St.QuestionImageTitleCaption>
                  <ImageUploader setValue={setValue} target={`questions.${index}.answerImage`} width={51.2} height={28.8} defaultValue={item.answerImage ? item.answerImage : ''} />
                  <MagazineCreateElement register={register} inputPlaceholer={'이미지에 대해 간략히 설명해주세요.'} inputMaxLength={50} inputHeight={12} registerField={`questions.${index}.imageCaption`} />
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
            <St.magazineButtonContainer>
              <St.magazinePreloadButton type="button">미리보기</St.magazinePreloadButton>
              <St.magazineSubmitButton type="submit">제출</St.magazineSubmitButton>
            </St.magazineButtonContainer>
          </form>
        )}
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
    /* background: ${({ theme }) => theme.colors.Gam_Black}; */
    color: ${({ theme }) => theme.colors.Gam_White};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_17};
  `,
  magazinePreloadButton: styled.button`
    width: 50%;
    height: 100%;
    display: flex;
    padding: 2.3rem 2rem;
    margin-bottom: 16rem;
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
    margin-bottom: 16rem;
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
