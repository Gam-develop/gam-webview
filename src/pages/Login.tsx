import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';
import { ReactComponent as IcKaKao } from '../assets/icon/IcKaKao.svg';
import AppConfig from '../common/constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { adminLogin } from '../lib/api/login';
import { LoginDto } from '../lib/api/dto/login.dto';
import { PRO_TYPE } from '../types/enum';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { magazineTokenState } from '../recoil/atom';

const Login = () => {
  const [clickLogin, setClickLogin] = useState(false);
  const params = new LoginDto();
  const navigate = useNavigate();
  const handleClickLogin = () => {
    setClickLogin(true);
  };
  const setMagazineToken = useSetRecoilState(magazineTokenState);
  const token = useRecoilValue(magazineTokenState);

  useEffect(() => {
    if (clickLogin) {
      const url = `https://kauth.kakao.com/oauth/authorize?client_id=${AppConfig.KEYS.KEY_JS}&redirect_uri=${AppConfig.REDIRECT_URL}&response_type=code`;
      window.location.href = url;
    }
  }, [clickLogin]);

  useEffect(() => {
    // URL에서 코드 파라미터 가져오기
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      const grant_type = 'authorization_code';
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${AppConfig.KEYS.KEY_JS}&redirect_uri=${AppConfig.REDIRECT_URL}&code=${code}`,
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .then(async (res) => {
          if (res.data) {
            params.token = res.data.access_token;
            params.providerType = PRO_TYPE.KA;
            params.deviceToken = '';
            await getAdminUser(params);
          }
        })
        .catch((e) => console.error(e));
    }
  }, []);

  const getAdminUser = (params: LoginDto) => {
    adminLogin(params)
      .then((res) => {
        if (res.data) {
          const tokenParams = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };
          setMagazineToken(tokenParams);
          navigate('/magazine/list');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <St.LoginWrapper>
      <St.LoginContainer>
        <IcGam style={{ width: '454px', height: '454px' }} />
        <St.LoginTitle>매거진 작성 어드민 페이지</St.LoginTitle>
        <St.LoginButton onClick={handleClickLogin}>
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
