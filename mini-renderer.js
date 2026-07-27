function miniRenderer(html, css){
  const dom = parseHTML(html);
  // html 문자열을 받아 태그를 토큰으로 분리
  // 토큰을 기반으로 DOM트리 구성
  // 각 노드는 tagName, attributes, children 속성을 가짐
  // 부모-자식-형제 관계가 명확히 연결된 구조로 메모리에 저장
  // 이 구조가 브라우저 화면 구성의 첫 번째 기반
  const cssom = parseCSS(css);
  // CSS 문자열을 받아 선택자, 속성, 값을 파싱
  // 이를 토대로 적용 가능한 규칙 목록 생성
  // 여기까지가 CRP 전반부 -> 문서 해석 + 스타일 정보 추출 단계
  // 외부 CSS는 반드시 <head>안에서 불러오기
  // DOM과 CSSOM을 동시에 파싱해 렌더링 지연 방지 목적
  const renderTree = buildRenderTree(dom, cssom);
  // DOM과 CSSOM을 받아 실제 화면에 표시될 요소만 필터링
  // 각 요소에 CSS 속성값 적용 -> Render Tree 구성
  // 이 시점부터 화면 계산, 그리기 작업 본격 시작

  renderTree.layout();
  // 각 노드를 순차적으로 순회하며 각 노드의 좌표 너비 높이 계산
  // 부모 위피 기준 자식 위치 재귀 계산

  renderTree.paint();
  // 레이아웃 정보가 계산된 각 노드에 대해 그릴 스타일 결정
  // 가상 캔버스에 색상, 테두리, 텍스트 등을 실제로 그림 -> 픽셀 찍기 단계

  renderTree.composite();
  // paint 결과가 저장된 여러 레이어를 하나의 최종 화면으로 조합 -> 각 레이어는 GPU에서 처리
  // GPU 가속 계층 의미
}