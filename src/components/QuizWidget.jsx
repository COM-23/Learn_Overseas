import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import './QuizWidget.css';

const questions = [
  { id: 1, text: "What is your primary goal for studying abroad?", options: ["Career Growth", "Academic Excellence", "Global Networking", "Immigration"] },
  { id: 2, text: "Which region do you prefer?", options: ["North America", "Europe", "Oceania", "Asia"] },
  { id: 3, text: "What is your budget per year?", options: ["Under $20k", "$20k - $40k", "$40k - $60k", "Over $60k"] },
];

const QuizWidget = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentStep]: option });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <motion.div 
      className="quiz-widget"
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <div className="quiz-header">
        <Globe size={24} className="quiz-icon" />
        <h2>Find Your Perfect Fit</h2>
        <p>Take our 3-step quiz to get personalized university recommendations.</p>
      </div>

      <div className="quiz-progress">
        {questions.map((q, index) => (
          <div key={q.id} className={`progress-dot ${index <= currentStep ? 'active' : ''}`} />
        ))}
      </div>

      <div className="quiz-content">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div 
              key={currentStep}
              className="quiz-question-container"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="quiz-question">{questions[currentStep].text}</h3>
              <div className="quiz-options">
                {questions[currentStep].options.map((option, idx) => (
                  <motion.button 
                    key={idx} 
                    className="quiz-option"
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.02, backgroundColor: 'var(--bg-surface)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              className="quiz-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>We have your profile!</h3>
              <p>Based on your answers, we have <strong>14 university matches</strong> perfect for you.</p>
              <button className="btn-primary" style={{ marginTop: '24px' }}>
                View Your Matches <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizWidget;
