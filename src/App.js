import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { Button } from "@material-ui/core";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import "./App.css";

const turndownService = new TurndownService();
turndownService.use(gfm);

function App() {
  const [text, setText] = useState("");
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const markdown = turndownService.turndown(text);
    const file = new Blob([markdown], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
  };

  const editorConfiguration = {
    toolbar: [
      "heading",
      "fontSize",
      "fontFamily",
      "|",
      "bold",
      "italic",
      "underline",
      "blockQuote",
      "bulletedList",
      "numberedList",
      "highlight",
      "superscript",
      "subscript",
      "specialCharacters",
      "|",
      // "alignment",
      "indent",
      "outdent",
      "|",
      "code",
      "codeBlock",
      "link",
      // "uploadImage",
      // "imageTextAlternative",
      // "imageStyle:full",
      // "imageStyle:side",
      "mediaEmbed",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "selectAll",
      "undo",
      "redo",
    ],
  };
  return (
    <div className="App">
      <div className="head">
        <h2>README.md Generator</h2>
      </div>
      <div className="button">
        <Button variant="contained" color="primary" onClick={downloadTxtFile}>
          Download
        </Button>
      </div>
      <CKEditor
        editor={Editor}
        data={text}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
          // console.log(Array.from(editor.ui.componentFactory.names()));
        }}
        config={editorConfiguration}
        onChange={(event, editor) => {
          console.log(editor);
          const data = editor.getData();
          setText(data);
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
}

export default App;
