# friends

## 프렌즈
봉사매칭 솔루션
봉사자가 필요한 병원, 기관 등등 어디든지 봉사자 모집글을 게시 할 수 있다.
봉사하고 싶은 사람들은 게시글을 보고 채팅이나 댓글을 통해 매칭된다.
누구나 쉽게 봉사를 할 수 있도록 누구나 쉽게 봉사자를 구할 수 있도록 하는 것이 프렌즈의 목표이다.
마치 당근마켓 처럼.

## 기능
1. 봉사자를 원하는 기관에서 게시글을 올린다.
  - 게시글에는 모집중, 모집완료 두가지 상태가 있음
  - 제목, 봉사 날짜, 인원수, 분야, 장소, 상세 내용, 게시날짜
  - 글 작성 전에 비밀번호 작성
  - 수정하기 버튼을 클릭하면 비밀번호 체크 후 수정 가능
  - 게시글 모달창에 프로필 클릭 시 그 기관에서 올린 게시글들과 프로필 확인 가능

2. 봉사자들이 게시글을 보고 채팅이나 댓글로 기관과 소통한다.

3. 회원가입
  - 최대한 간단한 회원가입
  - 별명, 이메일, 비밀번호, 봉사기관일 경우 기관명

##
react, scss, bootstrap, bootstrap-icon

## front-end 기능 구현 todo-list
  1. 회원가입
    - 회원가입 화면 (이메일, 별명, 비밀번호, 비밀번호 체크, 가입 이유) -ok
    - 가입 이유 -> '봉사자의 도움이 필요해요' 일 경우 소속 작성 input 출력 -ok 
    - 이메일 체크 메세지 출력 -ok
    - 비밀번호 체크 알림창
    - 가입완료 메세지 출력
    - 가입 정보 백엔드로 전달

  2. 로그인 
    - 로그인 모달 디자인 - ok
    - 로그인 버튼 클릭 시 로그인 완료 -> board 페이지 출력, 회원가입, 로그인 버튼 대신 로그아웃 버튼 출력
    - 아이디 또는 패스워드 틀리거나 입력값이 없을 때 오류메세지 출력
    - 로그인 모달 안에 있는 회원가입 버튼 클릭시 모달창 close, 회원가입 페이지 출력

  3. 게시글 작성
  4. 게시글 수정
  5. 토큰 기반
  6. 채팅 (socket)
  7. 프로필
  8. 게시판 -ok
  9. 클릭한 게시글 상세내용 페이지 -ok 

## back-end 기능 구현 todo-list

### 2021.12.18
  - 바닐라js로 만든 volunteerMatching 프로젝트를 react로 리팩토링 시작
  - 기존과 동일하게 scss, bootstrap, icon사용, react추가
  - header 퍼블리싱 진행 
  - board 퍼블리싱 진행

### 2021.12.19
  - Board.js ListDetailModal.js 
    게시글 상세 내용 모달

### 2021.12.20
  - 게시글 상세 내용 모달 디자인
  - Header.js/LogInModal.js/SignInModal.js
    로그인, 회원가입 버튼 클릭 시 모달 출력.

### 2021.12.23
  - 게시글 상세 내용 보기 클릭 시 해당 상세내용 페이지 이동으로 수정.

### 2021.12.25
  - 게시글 상세내용 2차 : 게시글 상세 내용 보기 클릭 시 해당 페이지로 이동. 해당 내용 출력

### 2021.12.26 
  - 게시글 상세내용 3차 : 게시글 상세 페이지 퍼블리싱
  - 회원가입 페이지 이동으로 수정
  - 로그인 모달 디자인

### 2021.12.27
  - 로그인 모달 내부에 회원가입 버튼 클릭시 회원가입 페이지로 이동, 모달창 close
  - 회원가입 1차 : 회원가입 페이지 퍼블리싱, 비밀번호 2차 확인, 가입이유 기능, 회원가입 페이지 input 컴포넌트화
