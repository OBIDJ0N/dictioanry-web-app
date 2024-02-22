import React, { Component } from "react";
import axios from 'axios';
import './style.css'
import { newWindow } from '../../assets/icons/index'
import { search } from "../../assets/icons";

class WordDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      audioUrl: null,
      isPlaying: false,
      inputValue: ''
    };
    this.audioRef = React.createRef();
  }

  getData = () => {
    const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.inputValue}`;
    axios.get(api)
      .then(res => {
        const audioUrl = res.data[0].phonetics.find(item => item.audio)?.audio || null;
        this.setState({ data: res.data[0], audioUrl, isPlaying: false }, () => {
          if (this.state.isPlaying) {
            this.audioPlay();
          }
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        this.setState({ error: "No Definitions Found" })
      })
  }

  audioPlay = () => {
    if (this.state.audioUrl) {
      this.setState({ isPlaying: true }, () => {
        this.audioRef.current.play();
      });
    }
  }

  handleInput = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputValue !== "") {
      this.getData()
    }
    this.setState({ inputValue: '' })
  }

  render() {
    const { isPlaying, data, inputValue, error } = this.state;
    const meanings = data.meanings || [];
    console.log(data);
    return (
      <div className="mt-6 dark:text-white">
        <form className="mt-[3.25rem] flex items-center justify-between bg-light_gray p-5 rounded-2xl dark:bg-dark_gray">
          <input
            style={{ backgroundColor: 'transparent' }}
            className="input-search w-full focus: outline-none placeholder:text-gray font-bold text-[1.25rem] dark:text-white max-md:text-sm"
            type="text"
            placeholder="Search for any word..."
            onChange={this.handleInput}
            value={inputValue} />
          <button type="submit" onClick={this.handleSubmit}>
            <img src={search} alt="search" />
          </button>
        </form>
        <>
          {error && (
            <div className="mt-24 text-center">
              <p className="text-3xl">😕</p>
              <p className="mt-11 text-lg font-bold">{error}</p>
              <p className="text-base mt-6">Sorry pal, we couldn't find definitions for the word you were looking for.</p>
            </div>
          )}
        </>
        <>
          {Object.keys(data).length > 0 && (
            <div className="flex justify-between mt-5">
              <div>
                <h1 className="text-3xl font-bold max-md:text-2xl">
                  {data.word}
                </h1>
                <p className="text-violet text-xl mt-4 max-md:text-base max-md:">{data.phonetic}</p>
              </div>
              <button className="play-btn relative bg-light_violet w-[75px] h-[75px] rounded-full hover:bg-violet hover:before:border-l-white" onClick={this.audioPlay}></button>
              {isPlaying && true}
              <audio ref={this.audioRef} src={this.state.audioUrl}></audio>
            </div>
          )}
        </>
        <>
          {meanings.map((meaning, index) => (
            <div className="data-content" key={index}>
              <h2 className="meaning-form mt-10 text-xl font-bold italic max-md:mt-8 max-md: max-md:text-sm">
                {
                  meaning.partOfSpeech
                }
              </h2>
              <h3 className="mt-10 text-lg">Meaning</h3>
              <ul className="mt-4">
                {
                  meaning.definitions.map((items, idx) => (
                    <li className="mt-[.8125rem] relative ps-4 text-base before:inline-block before:top-[0.6rem] before:absolute before:left-0 before:w-[5px] before:h-[5px] before:bg-violet before:rounded-full dark:text-white max-md:text-sm" key={idx}>{items.definition}
                      <p className="text-gray mt-2 max-md:text-xs">{items.example}</p>
                    </li>
                  ))
                }
              </ul>
              <div>
                {
                  meaning.synonyms.length > 0 && (
                    <h3 className="text-lg text-gray mt-8">
                      Synonyms
                      {meaning.synonyms.map((item, idx) => (
                        <span key={idx} className="first:ml-2 inline-block text-violet mr-2 text-base max-md:text-sm">{item}</span>
                      ))}
                    </h3>
                  )}
              </div>
              <div>
                {
                  meaning.antonyms.length > 0 && (
                    <h3 className="text-lg text-gray mt-8 mr-2">Antonyms
                      {meaning.antonyms.map((item, idx) => (
                        <span key={idx} className="first:ml-2 inline-block text-violet mr-2 text-base max-md:text-sm">{item}</span>
                      ))}
                    </h3>
                  )}
              </div>
            </div>
          ))}
        </>
        <>
          {data.sourceUrls && (
            <div className="border-t-[1px] border-light_gray pt-6 mt-6">
              <p>Source</p>
              <a href={data.sourceUrls} className="flex items-center gap-2">{data.sourceUrls}
                <img src={newWindow} alt="newWindow" />
              </a>
            </div>
          )}
        </>
      </div>
    );
  }
}

export default WordDefinition;
