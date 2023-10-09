import React from 'react';
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

const CreateMagazine = () => {
  const [magazineForm, setMagazineForm] = useRecoilState(magazineResultState);

  const handleTitleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMagazineForm({ ...magazineForm, magazineTitle: e.target.value });
    console.log(magazineForm);
  };

  const handleIntervieweeChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMagazineForm({ ...magazineForm, magazineInterviewee: e.target.value });
    console.log(magazineForm);
  };

  const handlemagazineIntroChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMagazineForm({ ...magazineForm, magazineIntro: e.target.value });
    console.log(magazineForm);
  };

  const handlemagazineMainImgChange = (changedPhotos: string[]) => {
    setMagazineForm({ ...magazineForm, magazinePhotos: changedPhotos });
    console.log(magazineForm);
  };

  const handlemagazineQuestionsChange = (changedQuestions: magazineQuestionAdminInfo[]) => {
    setMagazineForm({ ...magazineForm, questions: changedQuestions });
    console.log(magazineForm);
  };

  return (
    <PageLayout>
      <MagazineAdminHeader />
      <AdminContentLayout>
        <St.TitleHeader>매거진 명</St.TitleHeader>
        <MagazineCreateElement inputValue={magazineForm.magazineTitle} inputPlaceholer={'매거진 명을 입력해주세요.'} inputMaxLength={55} inputHeight={12} handleChangeInput={handleTitleChangeInput} />
        <St.TitleHeader>인터뷰이</St.TitleHeader>
        <MagazineCreateElement inputValue={magazineForm.magazineInterviewee} inputPlaceholer={'인터뷰이 이름을 입력해주세요.'} inputMaxLength={10} inputHeight={4.8} handleChangeInput={handleIntervieweeChangeInput} />
        <St.TitleHeader>메인 이미지 등록</St.TitleHeader>
        <St.TitleReprase>1 : 1 비율의 이미지를 등록해주세요. 최대 4장 등록 가능합니다.</St.TitleReprase>
        <St.ImageUploadContainer>
          <ImageUploader index={0} type={'multiple'} currentImg={magazineForm.magazinePhotos[0]} imageUrls={magazineForm.magazinePhotos} handleChangeImage={handlemagazineMainImgChange} width={28.2} height={28.2} />
          <ImageUploader index={1} type={'multiple'} currentImg={magazineForm.magazinePhotos[1]} imageUrls={magazineForm.magazinePhotos} handleChangeImage={handlemagazineMainImgChange} width={28.2} height={28.2} />
          <ImageUploader index={2} type={'multiple'} currentImg={magazineForm.magazinePhotos[2]} imageUrls={magazineForm.magazinePhotos} handleChangeImage={handlemagazineMainImgChange} width={28.2} height={28.2} />
          <ImageUploader index={3} type={'multiple'} currentImg={magazineForm.magazinePhotos[3]} imageUrls={magazineForm.magazinePhotos} handleChangeImage={handlemagazineMainImgChange} width={28.2} height={28.2} />
        </St.ImageUploadContainer>
        <St.TitleHeader>서론</St.TitleHeader>
        <MagazineCreateElement inputValue={magazineForm.magazineIntro} inputPlaceholer={'서론을 작성해주세요'} inputMaxLength={500} inputHeight={28.2} handleChangeInput={handlemagazineIntroChangeInput} />
        <St.TitleHeader>인터뷰</St.TitleHeader>
        <MagazineCreateQuestion inputValue={magazineForm.questions} handleChangeInput={handlemagazineQuestionsChange} />
      </AdminContentLayout>
      <Outlet />
    </PageLayout>
  );
};

export default CreateMagazine;

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
