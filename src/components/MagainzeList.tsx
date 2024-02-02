import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useGetMagazineList from '../lib/hooks/useGetMagazineList';
import ErrorPage from '../pages/ErrorPage';
import { magazineListState } from '../recoil/atom';
import { deleteMagazine } from '../lib/api/magazine';
import { magazineListData } from '../types/magazine';

const MagazineList = () => {
  const navigate = useNavigate();
  const { magazineListResult, isLoading, isError } = useGetMagazineList();

  const setMagazineList = useSetRecoilState(magazineListState);
  const magazineList = useRecoilValue(magazineListState);

  useEffect(() => {
    if (magazineListResult) {
      setMagazineList(magazineListResult.data);
    }
  }, [magazineListResult]);

  useEffect(() => {}, [magazineList]);

  const clickDelete = async (magazineId: number) => {
    await deleteMagazine(magazineId).then(() => {
      setMagazineList((prevList) => prevList.filter((magazine) => magazine.magazineId !== magazineId));
    });
  };

  // 수정하기로 이동
  const clickUpdate = (magazine: magazineListData) => {
    console.log(magazine);
    navigate(`/magazine/${magazine.magazineId}`, { state: { magazineTitle: magazine.magazineTitle, interviewee: magazine.interviewee } });
  };

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineListWrapper>
      <div>
        <St.MagazineListTitle>매거진 리스트</St.MagazineListTitle>
        <St.MagazineListField>
          <St.MagazineListFieldTitle>매거진 명</St.MagazineListFieldTitle>
          <St.MagazineListFieldInterViewee>인터뷰이</St.MagazineListFieldInterViewee>
        </St.MagazineListField>
        {magazineList.map((data) => {
          return (
            <St.MagazineListItemWrapper key={data.magazineId}>
              <St.MagazineListItemTitle>{data.magazineTitle}</St.MagazineListItemTitle>
              <St.MagazineListItemInterviewee>{data.interviewee}</St.MagazineListItemInterviewee>
              <St.MagazineListItemButton onClick={() => clickUpdate(data)}>
                <St.MagazineListItemButtonContent>수정하기</St.MagazineListItemButtonContent>
              </St.MagazineListItemButton>
              <St.MagazineListItemButton onClick={() => clickDelete(data.magazineId)}>
                <St.MagazineListItemButtonContent>삭제하기</St.MagazineListItemButtonContent>
              </St.MagazineListItemButton>
            </St.MagazineListItemWrapper>
          );
        })}
        <St.MagazineCreateButton>
          <St.MagazineCreateButtonContent to="/magazine/create">새로운 매거진 작성하기</St.MagazineCreateButtonContent>
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
    margin: 4rem 0rem 1.1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.Gam_Black};
  `,

  MagazineListFieldTitle: styled.div`
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
    margin-left: 2.5rem;
  `,

  MagazineListFieldInterViewee: styled.div`
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
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

  MagazineListItemButton: styled.button`
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
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,

  MagazineCreateButton: styled.div`
    margin-top: 15.2rem;
    margin-bottom: 16rem;
    background-color: ${({ theme }) => theme.colors.Gam_Black};
    height: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  MagazineCreateButtonContent: styled(Link)`
    color: ${({ theme }) => theme.colors.Gam_White};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_18};
    text-decoration: none;
  `,
};
