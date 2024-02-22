import { Component } from "react";
import Navbar from '../navbar/navbar';
import WordDefinition from '../word-definition/wordDefinition'
import './app.css'

class App extends Component {
    constructor(props) {
        super(props)
    }
    darkModeToggle = () => {
        const el = document.querySelector('.toggle label');
        if (el) {
            el.classList.toggle('before-styled');
            document.body.classList.toggle('dark');
        }
    }


    render() {
        return (
            <div className="max-container my-[3.5rem]">
                <Navbar darkModeToggle={this.darkModeToggle} />
                <WordDefinition />
            </div>
        )
    }
}

export default App