import React, { Component } from 'react'
import styled from 'styled-components'

const Iframe = styled.div`
  border: 0;
  width: 100%;
  height: ${props => props.height};
  display: ${props => (props.show ? 'block' : 'none')};
`

const Textarea = styled.textarea`
  width: 100%;
  height: ${props => props.height};
  overflow: scroll;
  margin: 0;
  border: 0;
  font: inherit;
  padding: 10px;
  background: #FBFCFE;
  font-family: ${props => props.theme.monospace};
  display: ${props => (props.show ? 'block' : 'none')};
`

export default props => (
  <div>
    <Iframe
      show={props.tab == 'preview'}
      height={props.height}
      dangerouslySetInnerHTML={{
        __html: `<iframe src=${`data:text/html;charset=utf-8,${props.errors.length > 0 ? buildErrorPage(props.errors) : encodeURI(props.html)}`} style="height:100%; width:100%; border: 0;"></iframe>`,
      }}
    />
    <Textarea disabled wrap='off' id="html" show={props.tab == 'code'} height={props.height} value={props.html} />
  </div>
)

function buildErrorPage(errors = []) {
  const title = `${errors.length} validation ${errors.length > 1 ? 'errors' : 'error'}`
  return `
  <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          background: #262626;
          color: #e8e8e8;
          font-family: Menlo, Consolas, monospace
        }

        h3 {
          background: #E36049;
          border-radius: 3px;
          padding: 3px 8px;
          display: inline-block;
        }

        #errors {
          width: 80%;
          max-width: 700px;
        }

        .message {
          margin-bottom: 1em;
        }

        .selector {
          margin-bottom: .25em;
        }

        .hidden {
          opacity: 0;
        }
      </style>
    </head>
    <body>
      <h3>${title}</h3><br />

      <div id="errors">
        ${errors.map((error) => `
          <div class="message">
            <div class="selector">&gt; ${error.selector}</div>
            <span class="hidden">&gt;</span> ${error.toString()}
          </div>`).join('')}
      </div>
      <script src="/reload/reload.js"> </script>
    </body>
  </html>
  `
}
