import React from 'react';
import styled from 'styled-components';

const mockData = {
  magazines: [
    {
      magazineId: 1,
      magainzeTitle: 'test1',
      magazineInterviewer: 'taek1',
    },
    {
      magazineId: 2,
      magainzeTitle: 'test2',
      magazineInterviewer: 'teak2',
    },
    {
      magazineId: 3,
      magainzeTitle: 'test3',
      magazineInterviewer: 'teak43',
    },
  ],
};

const MagazineList = () => {
  return (
    <St.MagazineListWrapper>
      <div>
        <St.MagazineListTitle>매거진 리스트</St.MagazineListTitle>
        <St.MagazineListField>
          <St.MagazineListFieldTitle>매거진 명</St.MagazineListFieldTitle>
          <St.MagazineListFieldInterViewee>인터뷰이</St.MagazineListFieldInterViewee>
        </St.MagazineListField>
        {mockData.magazines.map((data) => {
          return (
            <St.MagazineListItemWrapper key={data.magazineId}>
              <St.MagazineListItemTitle>{data.magainzeTitle}</St.MagazineListItemTitle>
              <St.MagazineListItemInterviewee>{data.magazineInterviewer}</St.MagazineListItemInterviewee>
              <St.MagazineListItemButton>
                <St.MagazineListItemButtonContent>수정하기</St.MagazineListItemButtonContent>
              </St.MagazineListItemButton>
              <St.MagazineListItemButton>
                <St.MagazineListItemButtonContent>삭제하기</St.MagazineListItemButtonContent>
              </St.MagazineListItemButton>
            </St.MagazineListItemWrapper>
          );
        })}
        <St.MagazineCreateButton>
          <St.MagazineCreateButtonContent>새로운 매거진 작성하기</St.MagazineCreateButtonContent>
        </St.MagazineCreateButton>
      </div>
    </St.MagazineListWrapper>
  );
};

export default MagazineList;

const St = {
  MagazineListWrapper: styled.section`
    max-width: 120rem;
    width: 100%;
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  MagazineListTitle: styled.div`
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_24};
  `,

  MagazineListField: styled.div`
    display: flex;
    margin: 4rem 0rem 1.1rem 0rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,

  MagazineListFieldTitle: styled.div`
    width: 5.2rem;
    margin-left: 2.4rem;
  `,

  MagazineListFieldInterViewee: styled.div`
    margin-left: 61.3rem;
  `,

  MagazineListItemWrapper: styled.div`
    display: flex;
    height: 4.8rem;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.6rem 0.8rem 2.4rem;
    margin-bottom: 0.8rem;
    background-color: ${({ theme }) => theme.colors.Gam_White};
  `,

  MagazineListItemTitle: styled.div`
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};
    margin-right: 1.2rem;
    width: 64.2rem;
  `,

  MagazineListItemInterviewee: styled.div`
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};
    margin: 0rem 2.4rem 0rem 1.2rem;
    width: 18rem;
  `,

  MagazineListItemButton: styled.div`
    background-color: ${({ theme }) => theme.colors.Gam_Black};
    width: 13.7rem;
    margin-right: 0.8rem;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  MagazineListItemButtonContent: styled.div`
    color: ${({ theme }) => theme.colors.Gam_White};
  `,

  MagazineCreateButton: styled.div`
    margin-top: 15.2rem;
    background-color: ${({ theme }) => theme.colors.Gam_Black};
    height: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  MagazineCreateButtonContent: styled.div`
    color: ${({ theme }) => theme.colors.Gam_White};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_18};
  `,
};
