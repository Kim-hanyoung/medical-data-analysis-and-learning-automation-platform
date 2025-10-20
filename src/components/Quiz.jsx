// src/components/Quiz.jsx
import React, { useEffect, useState } from 'react';
import '../styles/quiz.css';
import { getRandomQuiz } from '../api/quiz';
import { submitAnswer } from '../api/answer';

const Quiz = ({ onComplete, onBackToMain }) => {
  const [quiz, setQuiz] = useState(null);
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null); // { correct, correct_choice_id, explanation? }
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0); // 푼 문제 개수
  const [totalQuizzes] = useState(5); // 전체 퀴즈 개수 (5문제)

  // 페이지 전용 body 스타일
  useEffect(() => {
    document.body.classList.add('quiz-body');
    return () => document.body.classList.remove('quiz-body');
  }, []);

  // 브라우저 뒤로가기 감지
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      onBackToMain();
    };

    // 히스토리 엔트리 추가
    window.history.pushState(null, '', window.location.href);
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBackToMain]);

  // 첫 문제 로드
  useEffect(() => {
    loadRandom();
  }, []);

  const loadRandom = async () => {
    try {
      const q = await getRandomQuiz();
      setQuiz(q);
    } catch (error) {
      console.log('백엔드 연결 실패, 더미 데이터 사용');
      // 더미 데이터 사용
      const dummyQuiz = {
        quiz_id: Math.random().toString(36).substr(2, 9),
        quiz_title: "샘플 문제 " + Math.floor(Math.random() * 10 + 1),
        image_url: "",
        choices: [
          { choice_id: 1, content: "선청성유문협착증" },
          { choice_id: 2, content: "정상" },
          { choice_id: 3, content: "변비" },
          { choice_id: 4, content: "기복증" }
        ]
      };
      setQuiz(dummyQuiz);
    }
  };

  // 보기 선택 -> 채점(백엔드) -> LLM 해설 포함
  const handleSelectAnswer = async (choice_id) => {
    if (!quiz || isAnswered) return;
    setPicked(choice_id);
    setIsAnswered(true);

    try {
      const r = await submitAnswer({ quiz_id: quiz.quiz_id, choice_id });
      setResult(r);
    } catch (error) {
      console.log('백엔드 연결 실패, 더미 결과 사용');
      // 더미 결과 사용
      const dummyResult = {
        correct: Math.random() > 0.5,
        correct_choice_id: Math.floor(Math.random() * 4) + 1,
        explanation: "더미 해설입니다."
      };
      setResult(dummyResult);
    }
    
    setShowFeedback(true);
    
    // 2초 후 자동으로 다음 문제로 이동
    setTimeout(() => {
      handleNextQuestion();
    }, 6000);
  };

  // 다음 문제
  const handleNextQuestion = async () => {
    const newCount = solvedCount + 1;
    setSolvedCount(newCount);
    
    // 5문제를 다 풀면 Dashboard로 이동
    if (newCount >= totalQuizzes) {
      setTimeout(() => {
        onComplete();
      }, 500);
      return;
    }
    
    setShowFeedback(false);
    setIsAnswered(false);
    setPicked(null);
    setResult(null);
    await loadRandom();
  };

  if (!quiz) return <div className="quiz-container">문제를 불러오는 중...</div>;

  const imgSrc = quiz.image_url
    ? (quiz.image_url.startsWith('http')
        ? quiz.image_url
        : `${process.env.REACT_APP_API_BASE}${quiz.image_url.startsWith('/') ? '' : '/'}${quiz.image_url}`)
    : null;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>의료 데이터 분석 퀴즈</h1>
        <p>해당 이미지를 보고 이미지에 해당하는 답을 고르세요!</p>
        <div className="quiz-progress">
          <span className="progress-text">{solvedCount + 1} / {totalQuizzes}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((solvedCount + 1) / totalQuizzes) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-header">
            <h2>{quiz.quiz_title}</h2>
          </div>

          <div className="question-layout">
            <div className="question-image">
              {imgSrc && <img src={imgSrc} alt="문제 이미지" />}
            </div>

            <div className="options">
              {quiz.choices.map((c) => {
                const isSelected = picked === c.choice_id;
                const isCorrect = result?.correct_choice_id === c.choice_id;
                const showResult = showFeedback && (isSelected || isCorrect);
                return (
                  <button
                    key={c.choice_id}
                    className={`option-btn ${isSelected ? 'selected' : ''} ${
                      showResult ? (isCorrect ? 'correct' : 'incorrect') : ''
                    }`}
                    onClick={() => handleSelectAnswer(c.choice_id)}
                    disabled={isAnswered}
                    type="button"
                  >
                    <span className="option-text">{c.content}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="feedback-message">
              {result?.correct ? (
                <div className="feedback correct">
                  <i className="fas fa-check-circle"></i>
                  <span>정답입니다! 🎉</span>
                </div>
              ) : (
                <div className="feedback incorrect">
                  <i className="fas fa-times-circle"></i>
                  <span>틀렸습니다.</span>
                </div>
              )}

              {/* ⬇️ 오답 해설: 백엔드 LLM 또는 fallback 문구 */}
              {!result?.correct && result?.explanation && (
                <div className="explanation-box">
                  <div className="explanation-header">
                    <i className="fas fa-lightbulb"></i>
                    <span>해설</span>
                  </div>
                  <p className="explanation-text">{result.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="quiz-navigation">
            <button className="nav-btn prev-btn" onClick={onComplete} type="button">
              대시보드로
            </button>
            <button className="nav-btn next-btn" onClick={handleNextQuestion} type="button">
              다음 문제 <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
