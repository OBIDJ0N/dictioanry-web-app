import { Component } from "react";
import { logo } from "../../assets/icons";
import { arrow } from "../../assets/icons";
import './style.css'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      font: 'Sans Serif',
      fontNames: ['Sans Serif', 'Serif', 'Mono'],
      fontFamilies: ['Lora, sans-serif', 'Inconsolata, sans-serif', 'Inter, sans-serif',],
      showOptions: false
    }
  }

  componentDidMount() {
    const options = document.querySelectorAll('.options span');
    options.forEach((option, idx) => {
      option.addEventListener('click', () => {
        document.body.style.fontFamily = this.state.fontFamilies[idx]
        this.setState({
          font: this.state.fontNames[idx]
        })
        options.forEach((opt, index) => {
          if (idx === index) {
            opt.classList.add('active-class')
          } else {
            opt.classList.remove('active-class')
          }
        })
      })
    })
  }


  render() {
    const { font, showOptions } = this.state
    const { darkModeToggle } = this.props
    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <img src={logo} alt="logo img" />
          </div>
          <div className="flex items-center">
            <div onClick={() => this.setState({ showOptions: !showOptions })} className="font-theme cursor-pointer relative flex items-center justify-end gap-[18px]">
              <div className="flex justify-center">
                <div className="dark:text-white">{font}</div>
                <div className={`${showOptions ? 'show' : ''} options cursor-pointer rounded-lg hidden flex-col absolute top-8 right-0 w-[9.5rem] p-6 bg-[#fff] gap-2 dark:text-white dark:bg-dark_gray`}>
                  {this.state.fontNames.map((option, idx) => (
                    <span
                      key={idx}>
                      {option}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <img src={arrow} alt="arrow" />
              </div>
            </div>
            <div className="block w-[1px] h-[38px] bg-light_white mx-[1.625rem]"></div>
            <div onClick={darkModeToggle} className="toggle flex gap-5 items-center">
              <label htmlFor="dark-mode" className="cursor-pointer w-10 flex items-center h-5 relative rounded-[20px] bg-gray before:w-[14px] before:h-[14px] before:bg-white before:absolute before:rounded-full before:mx-[3px] before:top-auto dark:bg-violet"></label>
              <div className="moon-img cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path className="dark:stroke-violet" fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Navbar
