import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';
import { ReactComponent as IcKaKao } from '../assets/icon/IcKaKao.svg';
import PageLayout from '../components/PageLayout';
const Login = () => {
  return (
    <St.LoginWrapper>
      <St.LoginContainer>
        <IcGam style={{ width: '454px', height: '454px' }} />
        {/* </St.LogoContainer> */}
        <St.LoginTitle>매거진 작성 어드민 페이지</St.LoginTitle>
        <St.LoginButton>
          <div>
            <IcKaKao style={{ width: '36.19px', height: '100%' }} />
            <p>카카오로 로그인하기</p>
          </div>
        </St.LoginButton>
      </St.LoginContainer>
    </St.LoginWrapper>
  );
};

export default Login;

const St = {
  LoginWrapper: styled.div`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.Gam_Header};
  `,

  LoginContainer: styled.div`
    background-color: ${({ theme }) => theme.colors.Gam_Header};
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    padding: 29.5rem 0 33.3rem;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  LoginTitle: styled.h1`
    margin-top: 15.5rem;
    width: 26.4rem;
    white-space: nowrap;
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_26};
    color: ${({ theme }) => theme.colors.Gam_White};
  `,
  LoginButton: styled.button`
    margin-top: 3rem;
    width: 33.5rem;
    padding: 1rem 7.5rem 1.1rem 7.6rem;
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.colors.Gam_KaKao};
    border: none;
    box-sizing: border-box;
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_16};
        white-space: nowrap;
        color: ${({ theme }) => theme.colors.Gam_Login};
      }
    }
  `,
};
