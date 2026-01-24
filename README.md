# siheom-front-test-study

프론트엔드 테스트 스터디를 위한 실습 자료입니다.

## 기술 스택

- **Runtime**: [Bun](https://bun.com) v1.3.4+
- **Testing**: [Vitest](https://vitest.dev) 4.0.17
- **UI Testing**: [React Testing Library](https://testing-library.com/react)
- **Component Development**: [Storybook](https://storybook.js.org) 10.1.11
- **Framework**: React with [TanStack Router](https://tanstack.com/router)
- **Styling**: Tailwind CSS 4.1.18
- **Form Management**: React Hook Form + Valibot
- **TypeScript**: 5.9.3+

## 설치

```bash
bun install
```

## 개발 명령어

### 개발 서버 실행
```bash
bun run dev
```

### 테스트 실행
```bash
# 모든 테스트 실행
bun run test

# Watch 모드로 테스트 실행
bun run test --watch

# 커버리지 포함 테스트 실행
bun run test --coverage
```

### Storybook 실행
```bash
bun run storybook
```

### 코드 품질 검사
```bash
# 린트 검사 및 자동 수정
bun run lint

# 코드 포맷팅
bun run format

# 타입 체크
bun run typecheck

# 모든 검사 실행 (lint + format + typecheck + test)
bun run check
```

## 프로젝트 구조

### Week 2: 단위 테스트 기초
`src/week2/` 디렉토리에서는 다음 주제들을 다룹니다:

- **invariant**: 조건 검증 유틸리티 함수 테스트
- **standard-schema**: 표준 스키마 검증 및 파싱 테스트
- **transaction**: 회계 거래(Transaction) 도메인 로직 및 파서 테스트
  - 거래 데이터 구조 및 타입 정의
  - 거래 파싱 로직 테스트
  - 회계 분개(Posting) 처리

### Week 3: UI 컴포넌트 테스트
`src/week3/` 디렉토리에서는 다음 주제들을 다룹니다:

- **TransactionList**: 거래 목록 컴포넌트 테스트
  - Storybook을 활용한 컴포넌트 스토리 작성
  - 접근성(A11y) 스냅샷 테스트
  - 사용자 인터랙션 테스트

### Week 4: 폼 테스트
`src/week4/` 디렉토리에서는 다음 주제들을 다룹니다:

- **NewTransactionForm**: 새 거래 추가 폼 테스트
  - 복잡한 폼 필드 테스트 (날짜 선택, 콤보박스, 멀티 셀렉트 등)
  - 폼 유효성 검사 테스트
  - 사용자 액션 시뮬레이션 (입력, 클릭, 키보드 이벤트)
  - 접근성 에러 메시지 테스트

## 테스트 환경

프로젝트는 두 가지 테스트 환경을 지원합니다:

1. **Node 환경**: 단위 테스트 (`*.test.ts`)
   - 순수 함수 및 도메인 로직 테스트
   - 빠른 실행 속도

2. **Browser 환경**: UI 컴포넌트 테스트 (`*.test.tsx`)
   - React 컴포넌트 렌더링 테스트
   - 실제 브라우저 환경에서의 동작 검증
   - Playwright를 사용한 브라우저 인스턴스 관리

## 커스텀 테스트 유틸리티 (Siheom)

프로젝트는 `src/siheom/` 디렉토리에 커스텀 테스트 유틸리티를 제공합니다:

- `query`: 접근성 쿼리 헬퍼
- `actions`: 사용자 액션 시뮬레이션
- `assertions`: 접근성 기반 어설션
- `given`: 테스트 설정 헬퍼
- `runSiheom`: 테스트 실행 헬퍼

## 주요 의존성

### 프로덕션 의존성
- `@tanstack/react-router`: 라우팅
- `react-hook-form`: 폼 관리
- `valibot`: 스키마 검증
- `@standard-schema/spec`: 표준 스키마 스펙
- `react-aria-components`: 접근성 컴포넌트
- `tailwindcss`: 스타일링

### 개발 의존성
- `vitest`: 테스트 프레임워크
- `@testing-library/react`: React 컴포넌트 테스트
- `@testing-library/user-event`: 사용자 이벤트 시뮬레이션
- `@vitest/browser-playwright`: 브라우저 테스트 환경
- `storybook`: 컴포넌트 개발 도구
- `oxlint`, `oxfmt`: 린터 및 포맷터

## 참고 자료

- [Vitest 공식 문서](https://vitest.dev)
- [React Testing Library 공식 문서](https://testing-library.com/react)
- [Storybook 공식 문서](https://storybook.js.org)
- [Bun 공식 문서](https://bun.com/docs)
