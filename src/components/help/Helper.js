import React from "react";

const Helper = () => {
  return (
    <>
      <h2>도움말</h2>
      <ul>
        <li>
          URL 부분에 URL을 입력하시고 파일 드롭다운 목록에서 유튜브 영상이나
          <br />
          오디오 파일을 선택할 수 있습니다.
        </li>
        <li>
          유튜브 동영상을 업로드하고 싶을때에는 <br />
          유튜브 영상 -{">"} 공유하기 -{">"} 퍼가기 부분에 있는 <br />
          {"<"}iframe{">"} 태그 부분 전체를 복사 붙여넣기 하시면 됩니다.
        </li>
        <li>
          <a
            href="https://www.y2mate.com/kr/youtube-mp3/9EDZixuODrw"
            target="_blank"
            rel="noopener noreferrer"
          >
            유튜브 음원 추출 사이트
          </a>
        </li>

        <li>
          <a
            href="https://mp3cut.net/ko/"
            target="_blank"
            rel="noopener noreferrer"
          >
            mp3 파일 자르는 사이트
          </a>
        </li>
      </ul>
    </>
  );
};

export default Helper;
