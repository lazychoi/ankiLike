# 순수 자바스크립트로 rich text editor 만들기

- 기간: 2022년 12월 28일 - 30일

![](https://github.com/lazychoi/ankiLike/blob/main/images/Screenshot2022-12-305.05.37.png?raw=true)

향후 중단될 수 있는(deprecated) execCommand() 함수를 사용하지 않고 `contenteditable` 속성과 `document.getSelection()` 함수를 주로 사용해 구현했다. 

사용자가 영역을 선택할 때와 선택하지 않을 때, 커서가 편집 영역에 있을 때와 없을 때, 버튼을 누를 때 생각하지 못한 상황이 발생했다. DOM을 만들고 없애고 필요한 곳에 넣고 빼는 일이 쉽지 않다는 걸 절감했다. 기본적인 작동은 하지만 이곳저곳에서 예상한대로 작동하지 않는 경우가 종종 발생한다. 버튼 하나마다 신경써야 할 부분이 한두 가지가 아니다. 아래아 한글과 MS워드 제작자에게 경의를 표한다.

구현해야 할 기능과 잡아야 할 버그는 많지만 일단 멈추고 시행착오를 통해 배운 것을 정리하자. 


===> [여기를 눌러 사용해볼 수 있다](https://lazychoi.github.io/ankiLike/editor.html)
