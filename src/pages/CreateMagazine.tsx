import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MagazineAdminHeader from '../components/MagazineAdminHeader';
import { useRecoilState } from 'recoil';
import { magazineResultState } from '../recoil/atom';
import AdminContentLayout from '../components/AdminContentLayout';
import ImageUploader from '../components/ImageUploader';
import MagazineCreateQuestion from '../components/MagazineCreateQuestion';
import styled from 'styled-components';
import MagazineCreateElement from '../components/MagazineCreateElement';
import { magazineQuestionAdminInfo } from '../types/magazine';

const CreateMagazineDemo = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      magazineTitle: '',
      magazineInterviewee: '',
      magazineIntro: '',
      magazinePhotos: ['', '', '', ''],
      questions: [
        {
          questionOrder: 1,
          question: '',
          answer: '',
          answerImage: '',
          imageCaption: '',
        },
        {
          questionOrder: 2,
          question: '',
          answer: '',
          answerImage: '',
          imageCaption: '',
        },
        {
          questionOrder: 3,
          question: '',
          answer: '',
          answerImage: '',
          imageCaption: '',
        },
        {
          questionOrder: 4,
          question: '',
          answer: '',
          answerImage: '',
          imageCaption: '',
        },
      ],
    },
  });
  const onSubmit = (data: any) => console.log(data);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });
  console.log(errors);

  return (
    <PageLayout>
      <MagazineAdminHeader />
      <AdminContentLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <St.TitleHeader>매거진 명</St.TitleHeader>
          <MagazineCreateElement register={register} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={55} inputHeight={12} registerField={'magazineTitle'} />
          <St.TitleHeader>인터뷰이</St.TitleHeader>
          <MagazineCreateElement register={register} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} registerField={'magazineInterviewee'} />
          <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
          <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
          <St.ImageUploadContainer>
            <ImageUploader index={0} setValue={setValue} width={28.2} height={28.2} />
            <ImageUploader index={1} setValue={setValue} width={28.2} height={28.2} />
            <ImageUploader index={2} setValue={setValue} width={28.2} height={28.2} />
            <ImageUploader index={3} setValue={setValue} width={28.2} height={28.2} />
          </St.ImageUploadContainer>
          <St.TitleHeader>서론</St.TitleHeader>
          <MagazineCreateElement register={register} inputPlaceholer={'서론을 작성해주세요'} inputMaxLength={500} inputHeight={28.2} registerField={'magazineIntro'} />
          <St.TitleHeader>인터뷰</St.TitleHeader>
          {/* <MagazineCreateQuestion inputValue={magazineForm.questions} handleChangeInput={handlemagazineQuestionsChange} /> */}
          <input type="submit" />
        </form>
      </AdminContentLayout>
      <Outlet />
    </PageLayout>
  );
};

export default CreateMagazineDemo;

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
};
