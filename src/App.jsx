import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const data = [
    {
      "question": "What is the primary function of React in web development?",
      "options": [
        "A) To manage the database",
        "B) To style the user interface",
        "C) To handle routing in single-page applications",
        "D) To build user interfaces"
      ],
      "correctAns": "D"
    },
    {
      "question": "Which of the following is a state management library commonly used with React?",
      "options": [
        "A) Redux",
        "B) Express",
        "C) Lodash",
        "D) Axios"
      ],
      "correctAns": "A"
    },
    {
      "question": "What is the purpose of the useRecoilState hook in Recoil?",
      "options": [
        "A) To manage component lifecycle",
        "B) To handle API requests",
        "C) To read and write state",
        "D) To apply CSS styles"
      ],
      "correctAns": "C"
    },
    {
      "question": "Which component in Chakra UI is used to create a button?",
      "options": [
        "A) <Box>",
        "B) <Button>",
        "C) <Text>",
        "D) <Grid>"
      ],
      "correctAns": "B"
    },
    {
      "question": "In react-router-dom, which component is used to define a route?",
      "options": [
        "A) <Link>",
        "B) <Router>",
        "C) <Route>",
        "D) <Switch>"
      ],
      "correctAns": "C"
    }
  ]
  
  const [page, setPage] = useState(0)
  const [number, setNumber] = useState(1)
  const [score, setScore] = useState(0);
  const [showCorrectAns, setShowCorrectAns] = useState(false)
  const [showLast, setShowLast] = useState([])

  useEffect(() => {
    setPage(Math.floor(Math.random() * data.length))
  }, [])

  const handleNext = () => {
    setTimeout(() => {
      setNumber(prev => prev + 1)
      setPage((prev) => (prev + 1) % data.length)
      setShowCorrectAns(false)
    }, 1000)
  }

  const handleReset = () => {
    setScore(0)
    setNumber(1)
    setPage(Math.floor(Math.random() * data.length))
    setShowLast([])
  }

  const checkQuestion = (opt) => {
    if (opt.includes(data[page].correctAns)) {
      setScore(score + 1)
    } else {
      setShowLast(prev => [
        ...prev, 
        {
          question: data[page].question,
          correctAns: data[page].correctAns
        }
      ])
    }
    setShowCorrectAns(true)
    handleNext()
  }

  console.log(score);

  return (
    <div className="quiz-container">
      {number <= 5 ? (
        <>
          <h1>Quiz App</h1>
          <h2>Current Score: {score}</h2>
          <p>Question {number}/5</p>
          <h2>{data[page].question}</h2>
          {data[page].options.map((opt, idx) => (
            <p key={idx} onClick={() => { checkQuestion(opt) }} style={{ cursor: "pointer" }}>{opt}</p>
          ))}
          {showCorrectAns && <p  style={{backgroundColor:"green", color:"white", fontSize:"1rem"}}>Correct Ans of the question is: {data[page].correctAns}</p>}
        </>
      ) : (
        <>
          <h1>Your Score is {score} out of 5</h1>
          <h2>Questions you got wrong:</h2>
          {showLast.map((item, idx) => (
            <div key={idx}>
              <h3>{item.question}</h3>
              <p>Correct Answer: {item.correctAns}</p>
            </div>
          ))}
          <button onClick={handleReset}>Play again..?</button>
        </>
      )}
    </div>
  )
}

export default App
