## 과제 체크포인트
### 배포 링크
🔗https://nohgh.github.io/front_5th_chapter2-3
### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기
- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요?
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?


### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?


## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제에서 좋았던 부분

이번 과제를 진행하며 좋았던 부분은 FSD라는 하나의 멘탈모델을 학습하면서 자연스럽게 클린코드를 지향하고, 

어떻게 하면 선언적으로 코드를 적을 수 있는지 함께 생각해볼 수 있어서 좋았던 과제였습니다.

---
### 과제를 하면서 느낀점

사실 저번 5주차 과제를 하면서, 계층에 대한 내용이 과제를 끝마치는 시점까지 잘 와닿지 않았습니다.

이번 6주차 과제 초반에도 사실 여러 레이어(계층)이 어떻게 구분이 되는지 잘 감이 오지 않았던 때도 있었지만, 

api와 컴포넌트들을 모두 분리하고 각 컴포넌트를 FSD아키텍쳐에 맞게 배치를 하다보니 

FSD에서 제공하는 레이어를 토대로 계층에 대한 이해를 할 수 있었습니다.

---
## 과제를 진행한 과정
< 구현 전 >

- 1.  **리펙터링 이전, 관리자 페이지의 UI요소와 동작에 대한 이해**
![image](https://github.com/user-attachments/assets/b474d9a5-8164-477c-8cdf-79f984abb887)

FSD로 잘 리펙터링을 하기 위해서는 페이지를 구성하는 각 요소들의 특징을 잘 알수 있어야 한다고 생각하였습니다.

피그잼을 통해서, 리펙터링을 하기 이전에 각 요소가 어떻게 구성되고 어떤 컴포넌트에 위치되는지 파악하였습니다.

이후에 feature 위주로 어떻게 동작하는지 집중하여 분석을 진행하였습니다.

![image](https://github.com/user-attachments/assets/f745c138-f3cd-4768-bf5d-c7a8913eac31)

(사실 이렇게 분리를 해서 이해할려고 해도, 어떤 요소가 어떤 레이어에 위치해야할까 잘 와닿지 않았습니다.)


- 2. **FSD의 개념적인 이해와 FSD 공식 홈페이지에서 제공하는 Example를 토대로 이해**
 
![image](https://github.com/user-attachments/assets/eac9cdb1-0b0b-4e92-b34b-d0d304e70260)

FSD에 대한 추상적인 개념을 더 잘 이해하기 위해, 발제자료와 멘토링, QnA, 각종 포스트에서 설명하는 내용들을 정리하였습니다.

또한 공식 홈페이지에서 제공하는 예시 웹페이지를 참고 받아 잘 적용된 FSD를 이해하고자 하였습니다.

해당 과정에서 FSD는 적용하는 프로젝트의 성질마다 또 사람(팀)마다 다양하게 해석되고 설정될 수 있다고 생각하였습니다.

<**구현**>

1. **타입 분리**

기존의 코드에서 적용되 않은 엔티티에 대한 타입을 정의하고, 여러 타입 오류를 수정하였습니다.



2. **헷갈리지 않을, 명확하게 분리할 수 있는 요소들 위주로 분리**

해당 단계에서 기존의 코드와 다른 분들의 코드를 보면 Header와 Footer가 Widget에 위치해 있었습니다.

제가 생각한 바로는 Widget은 Shared, Entities, Features 3개의 레이어에서 사용되는 요소들을 조합하는 레이어로 비교적 복잡하게 구성된 UI가 적합하다고 생각하였습니다.

하지만 관리자 페이지의 Header와 Footer는 복잡한 구조가 아니라고 생각하였고, 변경이 된다면 Header에서 변경이 될것 같은데 Header의 경우 추후에 다른 레이어로 옮겨도, 큰 비용이 발생하지 않을거라 생각하였습니다.

따라서 Header, Footer를 shared/ui에 위치 시켰습니다.

또한 shared/ui에 다른 컴포넌트들에서 재사용되는 Button, Card,Dialog등과 같은 요소를 위치시켰으며, HighLightText의 경우 테스트 요소를 반환하기 때문에 lib보다는 ui에 위치시켜 컴포넌트 처럼 호출 할 수 있도록 하였습니다.
```JSX
              <HighlightText text={comment.body} highlight={searchQuery} />
```



3. **Entities레이어에 각 도메인의 타입을 정의**

post, comment, user에 대한 타입을 명시하여 Entities  상위의 레이어에서 재사용할 수 있도록 하였습니다.



4. **Features 레이어에 각 엔티티의 동작과 UI를 동시에 분리**


제가 작성한 FSD구조에서는 비교적 Features에 많은 컴포넌트와 로직이 들어있습니다.

앞서 페이지를 이해하는 과정에서 동작 위주로 살펴보다보니, Feature 레이어로 구조를 세분화하게 된것 같습니다.

Features에는 로직과 연결되는 여러 UI가 있기 때문에 각각을 featuers/entities/ui에 위치시켰습니다.



5. **Widget과 Pages 구성**

4번 과정까지 만든 요소들을 조합하여, Widget과 Pages룰 구성하였습니다.

Widget에서는 최대한 write를 줄이고 read로 만들기 위해서 선언적으로 컴포넌트를 위치시켰습니다.

또한 Modal과 같이 여러 컴포넌트들이 와야하는 경우, ModalWrapper를 만들어 더욱 추상화하여 상위 레이어인 pages에서 더 깔끔하게 유지해보고자 하였습니다.

(모달의 경우, 기본 로직을 feature에서 대부분 가져오고 복합적인 UI만 제공한다고 생각하여 widget에 위치시켰습니다.)

```JSX

//widget/modal/ModalWrapper
const ModalWrapper = () => {
  return (
    <>
      <AddPostModal />
      <EditCommentModal />
      <AddCommentModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserModal />
    </>
  );
};

export default ModalWrapper;


//pages/PostManagerPage
const PostsManager = () => {
  usePostManager();

  return (
    <PostManage className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <PostContent />
      <ModalWrapper />
    </PostManage>
  );
};

export default PostsManager;

```
