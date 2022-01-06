# FRIEDNS

## 프렌즈 
### (봉사매칭 플랫폼)
기관이나 병원은 봉사자 모집글을 게시하고 <br/>
봉사활동을 원하는 사람들은 게시글을 보고 참여할 수 있다 <br/>
누구나 쉽게 참여하고, 누구나 쉽게 모집할 수 있도록 <br/>
봉사활동의 선순환을 만드는 것이 프렌즈의 목표!

![image](https://user-images.githubusercontent.com/70701879/147481910-8128c650-abca-4f80-ba37-24d1f5a72b9e.png)

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
scss파일은 페이지별로 만듬

  1. 회원가입
    - 회원가입 화면 (이메일, 별명, 비밀번호, 비밀번호 체크, 가입 이유) -ok
    - 가입 이유 -> '봉사자의 도움이 필요해요' 일 경우 소속 작성 input 출력 -ok 
    - 이메일 체크 메세지 출력 -ok
    - 비밀번호 체크 메세지 -ok
    - 가입완료 메세지 출력 -ok
    - input이 빈값이면 알림 메세지 -ok
    - 별명 중복체크 버튼 클릭했는지 확인, 클릭했으면 확인완료
    - 가입 정보 백엔드로 전달 -ok
    - 회원가입 완료 시 '회원가입이 완료되었다' 페이지 메일인증해달라 끝. 홈으로 버튼 -ok

  2. 로그인 
    - 로그인 모달 디자인 - ok
    - 로그인 버튼 클릭 시 로그인 완료 -> board 페이지 출력, 회원가입, 로그인 버튼 대신 로그아웃 버튼 출력
    - 아이디 또는 패스워드 틀리거나 입력값이 없을 때 오류메세지 출력
    - 로그인 모달 안에 있는 회원가입 버튼 클릭시 모달창 close, 회원가입 페이지 출력 -ok

  3. 게시글 작성
    - 게시글 작성 폼 퍼블리싱 -ok
    - 봉사 일자 react bootstrap datepicker 활용 -ok
    - 봉사인원, 봉사 분야 select box -ok
    - 봉사 장소 : 우편번호 찾기 api활용, 상세주소 입력칸 출력 -ok
    - 상세내용 입력칸 -ok
    - 등록하기 버튼 -> 작성 완료 알림창 -> 게시판 메인 화면으로 
    - input 빈값이면 알림메세지 출력
    - 게시글 내용 백엔드로 전달

  4. 게시글 수정
    - 수정하기 버튼 클릭 시 수정 폼 페이지 보여주기(백엔드에서 데이터 불러오기)
    - 수정완료 버튼 
    - 수정하기 버튼 클릭 시 수정된 데이터 백엔드로 전달
    - 삭제하기 버튼 클릭 시 데이터 삭제

  5. 토큰 기반
  6. 채팅 (socket)

  7. 프로필
    - 별명, 봉사자 또는 봉사기관, 소속,(봉사자일 경우 빈값), 본인 게시물 출력
    - 수정되기 전 수정하기 버튼 disable, 수정 후 버튼 활성화
    - 내가 작성한 게시글 보여주기
    - 게시글에 수정하기, 삭제하기 버튼
    - 수정하기 클릭시 게시글 수정 페이지으로 이동

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
  - 게시글 작성하기 페이지 이동

### 2021.12.28
  - 게시글 작성 폼 페이지 퍼블리싱
  - 카카오 우편번호 찾기 api활용

### 2021.12.29
  - 카카오 우편번호 찾기 
  - 우편찾기에서 주소 클릭 -> input에 주소 출력
  - 게시글 작성 폼 페이지 디자인

### 2021.12.31
  - 회원가입 페이지에 input값이 빈값일때 에러메세지 출력
  - 회원가입 페이지 세부기능(정규표현식, 빈값 메세지, 회원가입 완료 알림창)

### 2022.01.02
  - 회원가입 값 체크 로직 완료
  - 회원가입 완료 후 완료 메세지 페이지
  - 프로필 페이지 

### 2022.01.03
  - 파일 정리(페이지, 컴포넌트 분리)
  - 프로필 페이지 (회원정보, 내가 작성한 게시물, 수정, 삭제 버튼)
  - 글 작성하기 폼 리팩토링
  - 수정하기 페이지

### 2022.01.04
  - 게시판 상세보기 페이지 api 연결

### 2022.01.06
  - 회원가입 api 연결

### 2022.01.07 
  - 별명 중복체크 체크 했을 시 '확인완료'로 바꿔주기, 체크 안하면 알림창 뜨기
  - radio value 가져오기
  - 비밀번호 재확인 input 입력 안했을때 메세지
