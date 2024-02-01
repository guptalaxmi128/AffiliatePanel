import React, { useEffect, useState } from "react";
import { Checkbox, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getResult,
  getUserQuiz,
  submitQuizAnswer,
} from "../../../../../actions/userQuiz/userQuiz";
import "./Quiz.css";

const Quiz = ({ lessonId }) => {
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const userQuiz = useSelector((state) => state.userQuiz.quizs);
  const result = useSelector((state) => state.userQuiz.quizResults);
  // console.log(result)

  useEffect(() => {
    if (lessonId) {
      dispatch(getUserQuiz(lessonId));
    }
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (lessonId) {
      dispatch(getResult(lessonId));
    }
  }, [dispatch, lessonId]);

  const handleSubmit = async () => {
    try {
      const formattedAnswers = userQuiz?.data.map((quizItem) => {
        const selectedOptions = selectedAnswers[quizItem.id] || {};
        const answerArray = Object.keys(selectedOptions).filter(
          (key) => selectedOptions[key]
        );

        return {
          quizId: quizItem.id,
          answer: answerArray,
        };
      });

      console.log({ answers: formattedAnswers });
      const res = await dispatch(
        submitQuizAnswer({ answers: formattedAnswers })
      );
      console.log("API Response:", res);

      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message || "An error occurred");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("Failed to submit quiz answers. Please try again.");
    }
  };

  return (
    <div className="user-quiz-container">
      <div className="user-quiz-subcontainer">
        {userQuiz?.data && userQuiz?.data.length > 0 ? (
          userQuiz?.data.map((quizItem, index) => (
            <div key={quizItem.id} style={{ margin: "12px" }}>
              <h3>{`Question ${index + 1}. ${quizItem.quizQuestion}`}</h3>
              <Checkbox.Group
                value={Object.keys(selectedAnswers[quizItem.id] || {})}
                onChange={(checkedValues) => {
                  setSelectedAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [quizItem.id]: checkedValues.reduce(
                      (acc, option) => ({ ...acc, [option]: true }),
                      {}
                    ),
                  }));
                }}
              >
                {Object.entries(quizItem.option).map(
                  ([key, value], optionIndex) => (
                    <Checkbox key={optionIndex} value={key}>
                      {value}
                    </Checkbox>
                  )
                )}
              </Checkbox.Group>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
        {userQuiz?.data && userQuiz?.data.length > 0 && (
          <Button type="default" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
