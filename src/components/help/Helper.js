import React from "react";

const Helper = () => {
  return (
    <>
      <h3>도움말</h3>
      <ul>
        <li>웹사이트 접속 시 소리를 재생할 수 있는 확장 프로그램입니다.</li>
        <br />
        <li>
          먼저, 왼쪽 탭에서 .mp3, .m4a 파일 업로드 또는 유튜브 공유를 통해
          사운드를 생성해야합니다.
        </li>
        <br />
        <li>
          소리를 재생하고 싶은 URL을 입력하고 사운드 목록에서 유튜브 영상이나
          <br />
          오디오 파일을 선택하고 저장할 수 있습니다.
        </li>
        <br />
        <li>
          URL이 정확히 일치해야하므로 직접 URL을 입력하기보다 복사
          붙여넣기해주세요.
        </li>
        <br />
        <li>
          유튜브 사운드를 생성하고 싶을때에는 <br />
          유튜브 영상 -{">"} 공유하기 -{">"} 퍼가기 부분에 있는 <br />
          {"<"}iframe{">"} 태그 부분 전체를 복사 후 iframe 부분에 붙여넣기
          하시면 됩니다.
        </li>
        <br />
        <li>
          유튜브의 경우 영상 주인이 퍼가기를 허용했을 경우에만 사용할 수
          있습니다.
        </li>
        <br />
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
        <br />
        <li>
          버그제보 및 건의사항:{" "}
          <a
            href="https://www.instagram.com/gakdony/?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            💼
          </a>
        </li>
      </ul>
    </>
  );
};

export default Helper;
