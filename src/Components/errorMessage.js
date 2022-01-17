export default function errorMessage({ title, zipcode, detailAddress, officialname, belong, information, authentication }) {
  const errors = {};

  if (!title) {
    errors.title = "제목이 입력되지 않았습니다.";
  }

  if (!zipcode) {
    errors.zipcode = "주소가 입력되지 않았습니다.";
  }

  if (!detailAddress) {
    errors.detailAddress = "상세주소가 입력되지 않았습니다.";
  }

  if (!officialname) {
    errors.officialname = "담당자 이름이 입력되지 않았습니다.";
  }

  if (!belong) {
    errors.belong = "담당자 소속이 입력되지 않았습니다.";
  }
  if (!information) {
    errors.information = "상세내용이 입력되지 않았습니다.";
  }

  if (!authentication) {
    errors.information = "인증방법을 선택해주세요.";
  }
  return errors;
}