function buildRenderTree(domNode, cssOM){
  // 하나의 DOM 노드와 CSSOM을 받아서 렌더 트리를 생성하는 함수
  if (!domNode || domNode.type !== 'element') return null;
  // domNode가 유효하지 않거나 element 타입이 아니면 null 반환

  const matchedRules = cssOM.find(rule => rule.selector === domNode.tag);
  // 현재 dom 요소의 태그 이름과 일치하는 cssom 규칙이 있는지 확인
  // 예를 들어 DOM노드가 <h1>이면 cssOM에서 selector가 'h1'인 규칙을 찾음
  const computedstyle = {};
  // matchedRules가 존재하면 해당 규칙의 선언부를 computedstyle 객체에 추가

  if (matchedRules) {
    // 매칭된 CSS 규칙이 존재한다면
    matchedRules.declarations.forEach(decl => {
      computedstyle[decl.property] = decl.value;
    });
    // 해당 규칙의 선언부를 순회하며 각 스타일 속성 값을 추출해 computedstyle 객체에 추가
  }

  const renderNode = {
    tag: domNode.tag,
    style: computedstyle,
    children: []
  };
  domNode.children.forEach(child => {
    const renderChild = buildRenderTree(child, cssOM);
    if (renderChild) {
      renderNode.children.push(renderChild);
    }
    // DOM의 하위 요소들을 재귀적으로 탐색하면서 각 자식 노드에 대해 동일한 buildRenderTree 과정 반복 => 전체 dom을 순회하며 스타일이 적용된 렌더 트리를 동시에 구성
  });

  return renderNode;
  // 모든 하위 요소들을 처리한 후 최종적으로 스타일이 적용된 렌더 트리 노드를 반환
}