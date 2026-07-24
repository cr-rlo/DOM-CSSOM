function layout(renderNode, parentX = 0, parentY = 0){
  // 렌더 트리 노드와 부모 좌표를 받아서 레이아웃을 계산하는 함수
  // 부모 위치에 따라 자식 위치가 결정되며, 최상위 루트 요소는 (0,0) 좌표에서 시작
  const fontSize = parseInt(renderNode.style['font-size'] || '16px');
  // font-size 속성을 찾아 높이 계산에 사용, 없으면 기본값 16px 사용
  const height = fontSize;
  // 요소의 높이는 font-size로 결정, 단순화된 가정
  const width = 300; 
  // 요소의 너비는 고정값 300px로 설정, 실제 레이아웃에서는 다양한 요소에 따라 달라질 수 있음

  const x = parentX;
  const y = parentY;
  // 자식의 좌표는 부모 좌표를 기준으로 설정, 현재는 단순히 부모 좌표를 그대로 사용

  renderNode.layout = { x, y, width, height };
  // 각 노드에 layout 정보를 추가, x, y 좌표와 width, height를 포함
  // 브라우저도 내부적으로 box 정보를 각 노드에 부착해 배치 준비
  // 이 값들이 offsetTop, offsetLeft, offsetWidth, offsetHeight 등으로 활용될 수 있음
  let currentY = y + height;
  // 현재 요소의 하단 좌표를 기준으로 다음 자식의 y 좌표를 계산, 자식 요소들은 위로 겹치지 않고 부모 요소 아래에 배치됨 -> 세로로 정렬되도록 배치

  renderNode.children.forEach(child => {
    layout(child, x, currentY);
    currentY += child.layout.height;
  }); 
  // 모든 자식 요소에 재귀적으로 레이아웃 계산 수행
  // 각 자식은 부모의 x 좌표를 그대로 사용하고, y 좌표는 currentY를 기준으로 아래로 순차 배치, 자식의 높이만큼 currentY를 증가시켜 다음 자식의 위치를 결정
  // 실제 브라우저도 이러한 방식으로 DOM 트리의 각 요소를 순회하며 레이아웃을 계산하고, 부모-자식 관계에 따라 위치를 결정

  return renderNode;

}

const renderTree = {
  tag: 'body',
  style: {},
  children: [
    {
      tag: 'h1',
      style: { 'color': 'blue', 'font-size': '24px' },
      children: []
    },
    {
      tag: 'p',
      style: { 'color': 'gray' },
      children: []
    }
  ]
};

console.log('\n 레이아웃 계산 시작');
const layoutTree = layout(renderTree);
console.dir(layoutTree, { depth: null });
