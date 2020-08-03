import React, { Component } from "react";
import InputRange from 'react-input-range';
import ProgressBar from 'react-bootstrap/ProgressBar'

class Main extends Component {
    state = {
        message: "Servey",
        question: ["The content of the day was useful and interesting", "On average how would you rate the seminar", "The day was structured and well oranised", "Overall how entertaining the event", "The instructor stimulated my interest in coruse topic", "The instructor was well prepared and organized for every class", "The teacher answers questions carefully and completely", "The teacher is well prepared foe class sessions", "This class is not too slow or fast to learn in class", "The rules in class help us to learn"],
        answer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        currentIndex: 0,
        percentageCompleted: 0,
        progressbarColor: "info",
        isLast: false,
        showResult: false,
        result: ""
    }
    render() {
        return <div>
            {this.state.showResult ?
                <div>
                    <h3>Total No Of Questions: {this.state.question.length}</h3>
                    <h3>Total No Of Question answered: {this.state.answer.filter(x => x > 0).length}</h3>
                    <h3>Result: {this.state.result}</h3>
                </div>
                :
                <div>
                    <h3>Current Progess: </h3>
                    <ProgressBar variant={this.state.progressbarColor} now={this.state.percentageCompleted} label={`${this.state.percentageCompleted}%`} />
                    <br /><br />
                    <h5>Question: {this.state.question[this.state.currentIndex]}</h5>
                    <br />
                    <InputRange maxValue={10} minValue={0} value={this.state.answer[this.state.currentIndex]} onChange={value => this.rangeChange({ value })} />
                    <br />
                    <br />
                    <button type="submit" onClick={this.preQuestion} >Previous Question</button>&nbsp;&nbsp;
                    {this.state.isLast ? <button type="submit" onClick={this.submitResult} >Submit</button> : <button type="submit" onClick={this.nextQuestion} >Next Question</button>}
                </div>
            }
        </div>;
    }
    nextQuestion = () => {
        let answeredCount = this.state.answer.filter(x => x > 0).length;
        let percentageCompleted = parseInt((answeredCount / this.state.answer.length) * 100);
        let color = "info";
        let result = "";
        if (percentageCompleted <= 33) {
            color = "danger";
            result = "Bad";
        }
        else if (percentageCompleted > 33 && percentageCompleted <= 66) {
            color = "warning";
            result = "Average";
        }
        else if (percentageCompleted > 66) {
            color = "success";
            result = "Good";
        }

        let isLast = false;
        if (this.state.currentIndex == this.state.question.length - 2)
            isLast = true;

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            percentageCompleted: percentageCompleted,
            progressbarColor: color,
            isLast: isLast,
            result: result
        });
    }
    preQuestion = () => {
        this.setState({ currentIndex: this.state.currentIndex - 1 });
    }

    submitResult = () => {
        this.setState({ showResult: true });
    }

    rangeChange = (e) => {
        let answer = this.state.answer;
        answer[this.state.currentIndex] = e.value;
        this.setState({ answer: answer });
        console.log(this.state);
    }
}
export default Main;