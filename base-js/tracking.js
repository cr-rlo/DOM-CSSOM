// /js/tracking.js (ANSWER)
// 이 파일은 사용자가 버튼을 눌렀을 때 그 기록을 서버에 보내는 역할

// async 특성상 '언제' 실행될지 확정적이지 않으므로 큐잉 패턴으로 안정화
// 파일이 다운로드 되는 데 시간이 얼마나 걸릴지 알 수 없다 => 예측 불가능하다
// 만약 사용자가 파일 다운 완료보다 빨리 버튼을 누른다해도 사용자가 버튼을 누른 기록을 저장해야하기 때문에 큐 필요 => 파일 다운이 완료되면 큐 처리

console.log("[tracking] START (ANSWER) — async 로드");
// 브라우저가 이 트래킹 파일을 백그라운드(async)에서 다운로드하느라 바쁘다가 다운로드를 끝내고 실행을 시작했다고 개발자 도구 콘솔창에 글자를 띄워주는 것

// 사전 정의된 큐가 있으면 흡수(없으면 생성)
window.analyticsQueue = window.analyticsQueue || [];
// window는 전역 보관함으로 여기에 변수를 만들면 웹사이트 어디서든 사용 가능
// analyticsQueue는 통계를 기록하기 위해 기다리는 queue
// || []는 만약 analyticsQueue이 이미 존재한다면 그것을 그대로 쓰고, 없다면 빈 큐를 새로 만들라는 의미


// 실제 track 함수 바인딩 (SDK 준비된 것처럼 동작)
window.track = function(event, payload) {
  console.log("[tracking] event:", event, payload);
};
// window에 진짜 기록을 담당하는 track이라는 이름의 함수(기능)을 새로 만들어 등록
// 파일이 다운로드 되기 전에는 이 함수가 존재하지도 않았지만, 파일이 도착해서 실행되는 바로 이 순간부터 기록 기능 활성화
// 이 함수를 부르면 사용자가 무슨 행동을(event) 했는지 상세정보(payload)와 함께 콘솔창에 기록

// 로딩 중 쌓였던 호출이 있다면 순서대로 flush
if (window.analyticsQueue.length) {
  // 큐가 한 줄이라도 존재하는지 여부 검사
  console.log("[tracking] flushing queued events:", window.analyticsQueue.length);
  // 큐에 쌓여있던 기록들을 flush하겠다는 안내 문구를 콘솔에 출력
  while (window.analyticsQueue.length) {
    // 큐에 기록이 남아있는 동안 그 작업이 0개가 될 때까지 반복 실행
    const [e, p] = window.analyticsQueue.shift();
    // 큐에 가장 먼저 쌓인 클릭 기록을 shift()라는 명령어로 튀어나오게 해서 뺴냄 -> 빼낸 값을 e와 p라는 작은 상자에 각각 담아둠
    window.track(e, p);
    // 대기실 줄 맨 앞에서 꺼내온 기록(e,p)를 진짜 기록함수 window.track에 넣어 출력
  }
}

window.TRACKING_READY = true;
console.log("[tracking] READY (ANSWER)");
