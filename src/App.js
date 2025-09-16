import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const MainContainer = styled.div`
  font-family: 'Roboto';
  min-height: 100vh;
  background-color: #223a5f;
  padding: 20px;
  color: white;
`

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid white;
  padding: 10px 20px;
`

const Headings = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
`

const ScoreCard = styled.div`
  background-color: white;
  color: #223a5f;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`

const ChoiceButton = styled.button`
  background: transparent;
  border: none;
  margin: 10px;
  cursor: pointer;
`

const ResultView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  color: white;
`

const ChoicesView = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin: 20px auto;
`

const RulesButton = styled.button`
  background-color: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
`

class App extends Component {
  state = {
    score: 0,
    isOpen: false,
    isGameOver: false,
    myChoice: null,
    opponentChoice: null,
    result: '',
  }

  openPopup = () => {
    this.setState({isOpen: true})
  }

  closePopup = () => {
    this.setState({isOpen: false})
  }

  playAgain = () => {
    this.setState({
      isGameOver: false,
      myChoice: null,
      opponentChoice: null,
      result: '',
    })
  }

  getResult = (myChoice, opponentChoice) => {
    if (myChoice.id === opponentChoice.id) {
      return 'IT IS DRAW'
    }
    if (
      (myChoice.id === 'PAPER' && opponentChoice.id === 'ROCK') ||
      (myChoice.id === 'SCISSORS' && opponentChoice.id === 'PAPER') ||
      (myChoice.id === 'ROCK' && opponentChoice.id === 'SCISSORS')
    ) {
      return 'YOU WON'
    }
    return 'YOU LOSE'
  }

  onClickChoice = choice => {
    const opponent = choicesList[Math.floor(Math.random() * 3)]
    const result = this.getResult(choice, opponent)

    this.setState(prevState => {
      let newScore = prevState.score
      if (result === 'YOU WON') {
        newScore += 1
      } else if (result === 'YOU LOSE') {
        newScore -= 1
      }

      return {
        result,
        score: newScore,
        myChoice: choice,
        opponentChoice: opponent,
        isGameOver: true,
      }
    })
  }

  getUpdatedScore = (result, prevScore) => {
    if (result === 'YOU WON') return prevScore + 1
    if (result === 'YOU LOSE') return prevScore - 1
    return prevScore
  }

  renderGameView = () => (
    <ButtonsContainer>
      <Row>
        <ChoiceButton
          data-testid="rockButton"
          onClick={() => this.onClickChoice(choicesList[0])}
        >
          <img
            src={choicesList[0].imageUrl}
            alt={choicesList[0].id}
            className="play-button"
          />
        </ChoiceButton>
        <ChoiceButton
          data-testid="scissorsButton"
          onClick={() => this.onClickChoice(choicesList[1])}
        >
          <img
            src={choicesList[1].imageUrl}
            alt={choicesList[1].id}
            className="play-button"
          />
        </ChoiceButton>
      </Row>
      <Row>
        <ChoiceButton
          data-testid="paperButton"
          onClick={() => this.onClickChoice(choicesList[2])}
        >
          <img
            src={choicesList[2].imageUrl}
            alt={choicesList[2].id}
            className="play-button"
          />
        </ChoiceButton>
      </Row>
    </ButtonsContainer>
  )

  renderResultView = () => {
    const {myChoice, opponentChoice, result} = this.state
    return (
      <ResultView>
        <ChoicesView>
          <div>
            <h3>You</h3>
            <img
              src={myChoice.imageUrl}
              alt="your choice"
              className="play-button"
            />
          </div>
          <div>
            <h3>Opponent</h3>
            <img
              src={opponentChoice.imageUrl}
              alt="opponent choice"
              className="play-button"
            />
          </div>
        </ChoicesView>
        <h2>{result}</h2>
        <button
          type="button"
          onClick={this.playAgain}
          className="btn trigger-button"
        >
          PLAY AGAIN
        </button>
      </ResultView>
    )
  }

  render() {
    const {score, isOpen, isGameOver} = this.state
    return (
      <MainContainer>
        <Navbar>
          <Headings>
            <span>ROCK</span>
            <span>PAPER</span>
            <span>SCISSORS</span>
          </Headings>
          <ScoreCard>
            <p>Score</p>
            <h2>{score}</h2>
          </ScoreCard>
        </Navbar>

        {isGameOver ? this.renderResultView() : this.renderGameView()}

        <div className="popup-container">
          <Popup
            open={isOpen}
            modal
            onClose={this.closePopup}
            trigger={<RulesButton type="button">RULES</RulesButton>}
          >
            {close => (
              <div style={{background: 'white', padding: '20px'}}>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    float: 'right',
                  }}
                  onClick={close}
                  data-testid="close"
                >
                  <RiCloseLine size={24} />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="popup-image"
                />
              </div>
            )}
          </Popup>
        </div>
      </MainContainer>
    )
  }
}

export default App
