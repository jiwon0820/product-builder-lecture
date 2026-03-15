# 동물상 테스트 (Animal Face Test) - Blueprint (v2.0)

## 개요
- **기능:** 이미지 파일을 업로드하여 AI(Teachable Machine)가 강아지상/고양이상 여부를 판별.
- **디자인 컨셉:** 미니멀리즘, 민트 그린 포인트, 부드러운 그림자, 다크 모드 지원.

## 상세 디자인 (UI/UX)
- **레이아웃:** 화면 중앙에 부드러운 그림자가 있는 화이트/다크 카드 배치.
- **포인트 컬러:** 민트 그린 (`oklch(0.8 0.1 160)` 계열).
- **입력 방식:** 파일 선택기(Input type="file") 및 드롭존 형태의 원형 프리뷰 영역.
- **다크 모드:** 우측 상단 토글 버튼을 통한 테마 전환.

## 기술 스택
- **HTML5:** Semantic Markup, File API.
- **CSS3:** Modern CSS (OKLCH, CSS Variables, Transistions).
- **JS:** Teachable Machine Image SDK, Async/Await.

## 현재 작업 단계: v2.0 개편
1.  HTML 구조 변경 (파일 업로드 및 다크 모드 토글 추가).
2.  CSS 스타일 전면 수정 (민트 그린 테마 및 다크 모드 구현).
3.  JavaScript 로직 변경 (Webcam 제거 -> Image File 처리 로직 도입).
