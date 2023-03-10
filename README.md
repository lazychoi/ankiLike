# 순수 자바스크립트로 rich text editor 만들기

<img src="https://github.com/lazychoi/ankiLike/blob/main/images/Screenshot2022-12-305.05.37.png?raw=true">

- 기간: 2022년 12월 28일 - 30일
- [UI출처(execCommand() 사용)](https://youtu.be/la-0HOaNL10){target=_blank}
- [여기를 눌러 사용해볼 수 있다](https://lazychoi.github.io/ankiLike/editor.html)

## 마친 직후 느낌

향후 중단될 수 있는(deprecated) execCommand() 메서드를 사용하지 않고 `contenteditable` 속성과 `document.getSelection()` 함수를 주로 사용해 구현했다. 

사용자가 영역을 선택할 때와 선택하지 않을 때, 커서가 편집 영역에 있을 때와 없을 때, 버튼을 누를 때 생각하지 못한 상황이 발생했다. DOM을 만들고 없애고 필요한 곳에 넣고 빼는 일이 쉽지 않다는 걸 절감했다. 기본적인 작동은 하지만 이곳저곳에서 예상한대로 작동하지 않는 경우가 종종 발생한다. 버튼 하나마다 신경써야 할 부분이 한두 가지가 아니다. 아래아 한글과 MS워드 제작자에게 경의를 표한다.

구현해야 할 기능과 잡아야 할 버그는 많지만 일단 멈추고 시행착오를 통해 배운 것을 정리하며 난잡한 코드도 정리해야겠다. 

리치 텍스트 편집기는 위 링크를 눌러 사용해볼 수 있고, 소스 코드는 editor.html, css/editor.css, js/editor.js 세 파일이다.

## 배운 부분 정리(미완성)

- UI
  - [자바스크립트 map() 함수로 드롭다운 버튼 목록 생성 -> 폰트, 폰트 사이즈](https://github.com/lazychoi/ankiLike/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-map()-%EC%9C%BC%EB%A1%9C-%EB%93%9C%EB%A1%AD%EB%8B%A4%EC%9A%B4-%EB%B2%84%ED%8A%BC-%EB%AA%A9%EB%A1%9D-%EC%83%9D%EC%84%B1)
- [DOM 이해](https://lazychoi.github.io/books/dom_enlightenment.html)
- 자바스크립트
  - [선택한 영역의 부모 태그 가져오기](https://github.com/lazychoi/ankiLike/wiki/%EC%84%A0%ED%83%9D-%EC%98%81%EC%97%AD%EC%9D%98-%EB%B6%80%EB%AA%A8-%ED%83%9C%EA%B7%B8-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0(Selection-Object-%EB%B6%84%EC%84%9D))
  - [선택한 영역의 텍스트 가져오기](#)
  - [선택한 영역의 시작 인덱스와 끝 인덱스 가져오기](#)
  - [선택한 영역의 텍스트 중 줄바꿈 문자를 <br> 태그로 바꾸기](#)
  - [현재 커서 위치의 부모 태그 가져오기](#)
  - [현재 커서 위치의 모든 형제를 선택 영역으로 설정하기](#)
  - [노드를 만들어 선택한 영역을 포함하기](#)
  - [새로 만든 노드에 속성 추가하기](#)
  - [선택한 영역을 삭제하기](#)
  - [선택한 영역에 새로운 노드 추가하기](#)
- 구현하지 못한 부분 
  - [문단과 문장 구분하여 처리하기(미완성)](#)
  - [텍스트 상태를 실시간 반영하여 버튼의 활성화 비활성화 상태 변경](#)
  - [리스트 태그 넣기](#)
  
 
