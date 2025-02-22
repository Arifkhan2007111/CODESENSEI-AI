import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import Markdown from 'react-markdown'
import rehyprHilight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"

import Nav from "./Nav";

const UI = ()=> {

    const [code, setCode] = useState(`
        // Enter Your Code Here`)

    const [review, setReview] = useState('')

    async function reviewCode() {
        try {
            const response = await axios.post('http://localhost:8000/ai/get-review', { prompt: code });
            setReview(response.data)
        } catch (error) {
            console.error("Error reviewing code:", error.response ? error.response.data : error.message);
        }
    }
    

    useEffect(() =>{
        prism.highlightAll()
    })

    return(
        <>
            <div className="main">
                <Nav />
                <div id="root1">
                    <div className="left">
                        <div className="wrapper">
                            <div className="typing-demo">
                                Start Writing Your Code
                            </div>
                        </div>
                        <hr />
                        <div className="code">
                            <Editor
                                value={code}
                                onValueChange={code => setCode(code)}
                                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                                padding={10}
                                style={{
                                    fontSize: 16, 
                                    fontFamily: '"Fira Code", monospace',
                                    color: "#f8f8f2",
                                    lineHeight: "1.5",
                                    height: "100%",
                                    width: "100%",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                }}
                            />
                        </div>
                        <hr />
                        <div 
                            onClick={reviewCode}
                            className="submit-btn">
                                <h2>SUBMIT</h2>
                        </div>
                    </div>
                    <div className="right">
                        <Markdown
                            rehypePlugins = {[rehyprHilight]}
                        >{review}</Markdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UI