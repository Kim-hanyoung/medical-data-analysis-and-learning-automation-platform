# 🛡️ 의료 데이터 분석 및 학습 자동화 플랫폼

임상 전문의를 목표로 하는 학생들을 위한, AI 기반 이미지 판독 훈련 및 자동 문제풀이·해설·분석 일체화 웹 플랫폼

![Animation](https://github.com/user-attachments/assets/e82a308e-1073-4cb9-be70-154d506ef2bb)


---

## 🚀 주요 기능

- **AI 기반 의료 이미지 분석**: 생성형 모델(Stable Diffusion, CycleGAN, DCGAN)을 활용하여 X-ray 등 의료 영상을 합성하고, 학습 데이터 다양성 및 품질을 확보
- **자동 문제 생성 및 풀이**: LLM(Qwen2.5) 기반으로 판독 문제·선지·정답을 자동 생성하고, 맞춤형 해설 제공
- **실시간 판독 훈련**: 사용자가 업로드한 이미지 또는 제공된 데이터에 대해 판독 연습을 진행하고 평가 피드백을 즉시 제공
- **LLM 기반 해설 & 근거 제시**: 정답만 제시하는 것이 아니라 판독 근거와 시각적 특징 설명으로 임상적 이해도 향상
- **로그인 및 기록 저장 기능**: JWT 인증 기반 사용자 관리 및 학습 결과 DB 저장
- **학습 리포트 분석**: 정답률, 진행도, 오답 유형 등을 시각화하여 개인별 학습 패턴 분석 및 리포트 제공

---

## 🧪 기술 스택

### 🖥️ Backend & LLM
[![Python](https://img.shields.io/badge/Python3.10-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Ollama](https://img.shields.io/badge/Ollama-000000?logo=ollama&logoColor=white)](https://ollama.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)

### 🤖 사용 모델
[![Stable Diffusion](https://img.shields.io/badge/Stable%20Diffusion-000000?logo=ai&logoColor=white)](https://stablediffusionweb.com/)
[![DCGAN](https://img.shields.io/badge/DCGAN-FF6B81?logo=deep-learning&logoColor=white)](https://papers.nips.cc/)
[![CycleGAN](https://img.shields.io/badge/CycleGAN-6E44FF?logo=deep-learning&logoColor=white)](https://junyanz.github.io/CycleGAN/)
[![ConvNeXt](https://img.shields.io/badge/ConvNeXt-0A84FF?logo=deep-learning&logoColor=white)](https://arxiv.org/abs/2201.03545)
[![EfficientNetB0](https://img.shields.io/badge/EfficientNet--B0-00C853?logo=deep-learning&logoColor=white)](https://arxiv.org/abs/1905.11946)
[![Qwen2.5](https://img.shields.io/badge/Qwen2.5--3B--Instruct-3C3C3C?logo=ai&logoColor=white)](https://qwen.ai/)

### 🌐 Frontend
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)

### 🛠️ Tools / Platform
[![Kaggle](https://img.shields.io/badge/Kaggle-20BEFF?logo=kaggle&logoColor=white)](https://www.kaggle.com/)
[![Colab](https://img.shields.io/badge/Google%20Colab-F9AB00?logo=googlecolab&logoColor=white)](https://colab.research.google.com/)
[![VSCode](https://img.shields.io/badge/VSCode-0078D4?logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)](https://www.notion.so/)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)


## 📦 설치 방법

### 1. 레포지토리 클론

```bash
git clone [해당 레파지토리 주소]
```

### 2. 백엔드 환경 변수 설정

/backend/.env 파일 생성 후 아래 내용 입력:

```bash
DB_URL=mysql+pymysql://fastapi_user:mysql1234@192.168.0.198:3306/team_ai_quiz_db?charset=utf8mb4
JWT_SECRET=change-this-to-a-random-secret
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
OPENAI_API_KEY=
LLM_BASE_URL=http://localhost:11434/v1
LLM_MODEL=qwen2.5:3b-instruct
LLM_API_KEY=ollama
```

### 3. 프런트엔드 실행

```bash
# Node.js 설치 후
npm install vite
npm run start
```

### 4. 백엔드 실행

```bash
# Python 3.10 환경 추천
cd backend
pip install -r requirements.txt
pip install uvicorn
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
```

### 5. LLM

```bash
# ollama를 로컬에 다운로드
# qwen 2.5:3b-instruct 다운로드(로컬 사양에 따라 다른 모델 사용 가능)
#로컬에서 사용한 이유 api의 토큰 제한이 없고 데이터의 유출 방지
```

## 📂 프로젝트 구조

```bash
# 루트
.
├─ backend
│  ├─ alembic
│  ├─ app
│  │  ├─ core
│  │  ├─ models
│  │  ├─ routers
│  │  ├─ schemas
│  │  ├─ services
│  │  ├─ static
│  │  ├─ __init__.py
│  │  ├─ db.py
│  │  └─ main.py
│  ├─ .env(생성필요)                 
│  ├─ alembic.ini
│  ├─ requirements.txt
│  └─ test_db.py
│
├─ .storybook             
│
├─ public                  
│
├─ src                     
│  ├─ api
│  ├─ components
│  │  ├─ App.jsx
│  │  ├─ App.test.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.jsx
│  │  ├─ MainPage.jsx
│  │  ├─ Quiz.jsx
│  │  ├─ QuizStart.jsx
│  │  ├─ Signup.jsx
│  │  ├─ StartPage.jsx
│  │  └─ reportWebVitals.ts
│  ├─ stories
│  ├─ styles
│  ├─ index.js
│  ├─ logo.svg
│  ├─ react-app-env.d.ts
│  └─ setupTests.ts
│
├─ .env                     
├─ .gitignore
├─ index.js                 
├─ package.json
├─ package-lock.json
└─ README.md


## 📊 사용 데이터셋

| 이름 | 설명 | 출처 |
|---|---|---|
| 소아 복부 X-ray 합성데이터 | AI를 이용해 소아 복부 X-ray 합성 이미지 데이터셋 | [AIHub](https://aihub.or.kr/aihubdata/data/view.do?pageIndex=1&currMenu=&topMenu=&srchOptnCnd=OPTNCND001&searchKeyword=%EC%A0%84%EA%B8%B0+%EC%84%A4%EB%B9%84&srchDetailCnd=DETAILCND001&srchOrder=ORDER001&srchPagePer=80&srchDataRealmCode=REALM005&aihubDataSe=data&dataSetSn=71771) |
| 피부종양 이미지 합성 데이터 | 피부종양 합성 이미지 데이터셋 | [AIHub](https://aihub.or.kr/aihubdata/data/view.do?pageIndex=1&currMenu=&topMenu=&srchOptnCnd=OPTNCND001&searchKeyword=%EC%A0%84%EA%B8%B0+%EC%84%A4%EB%B9%84&srchDetailCnd=DETAILCND001&srchOrder=ORDER001&srchPagePer=80&srchDataRealmCode=REALM005&aihubDataSe=data&dataSetSn=71771) |


## 🗓️ 프로젝트 기간

2025년 9월 16일 ~ 10월 17일 (1달)

## 🎯 기대 효과

본 프로그램은 기존의 임상 실습 중심 교육을 보완하여 학생들이 언제 어디서든 판독 훈련을 반복적으로 수행할 수 있는 기반을 마련한다. 

이를 통해 학습자의 자기 주도적 학습을 촉진하고, 나아가 영상 판독 역량을 단계적으로 향상 시켜 전문성 강화에 기여할 수 있을 것으로 기대된다.

산업재해 현황의 체계적 파악 및 시각화


## 🛠️ 향후 개선 사항

DB와 LLM에 라벨링 데이터를 반영해 정다과 풀이의 정밀도를 높이는 방향으로 개선 필요

이미 생선된 이미지와 라벨을 DB에 저장, 랜덤으로 해서 이미지를 자동으로 생성하는 방식으로 개선

문제 풀이만 하는 게 아니라 사전에 학습을 위한 페이지 제작의 필요성

모바일이 더 접근성등이 뛰어나보여 향후 모바일 및 반응형 웹


## 👥 팀원 역할

| 이름 | 역할 |
|---|---|
| 신소연 | 데이터 선정, 데이터 모델링, DB 구축, PPT 제작 |
| 김유현 | 데이터 선정, 데이터 모델링, PPT 제작 |
| 김한영 | 데이터 선정, 백엔드 총괄, 데이터 모델링 |
| 원유진 | 데이터 선정, 프론트 총괄 |
| 정윤환 | 데이터 선정, 데이터 모델링 |
| 조민수 | 데이터 선정, 프로젝트 기획, 데이터 모델링, 발표 |


## 📄 라이선스

MIT License (또는 원하는 라이선스를 명시해주세요)

## 🙋 Q&A

문의사항은 Issues 또는 Discussions 탭을 통해 남겨주세요.
