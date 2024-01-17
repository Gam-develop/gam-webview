# Gam-web

Gam 서비스의 매거진 웹뷰, 어드민을 제공합니다.

<br/>

## Stacks

![Static Badge](https://img.shields.io/badge/react-18.2.0-blue)
![Static Badge](https://img.shields.io/badge/vite-4.4.0-yellow)
![Static Badge](https://img.shields.io/badge/recoil-0.7.6-green)

<br/>

## Folders

```
src
|_ assets
|_ components
|_ lib
|_ recoil
|_ styles
|_ types
```

- **assets**: 아이콘 등 필요한 정적 파일들을 저장합니다.
- **components**: 컴포넌트를 저장합니다.
- **lib**: swr hooks / api 요청 / axios 설정 / 토큰 관리 모듈을 저장합니다.
- **pages**: 페이지 파일을 저장합니다.
  모듈을 저장합니다.
- **recoil**: recoil 전역상태 관련 파일을 저장합니다.
- **style**: 전역적으로 사용하는 styled-components 파일을 저장합니다.
- **types**: Typescript interface를 저장합니다.

## Routes

- **/**: 어드민 매거진 리스트
- **/magazine/create**: 어드민 매거진 생성
- **/magazine/:magazineId**: 매거진 웹뷰
