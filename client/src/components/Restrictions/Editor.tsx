import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export interface EditorProps {
  restrictions: any;
  handleSave: (data: any) => void;
}

const Editor: React.SFC<EditorProps> = (props) => {
  const { restrictions, handleSave } = props;
  const editor = useRef<any>();
  useEffect(() => {
    editor.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
      data: restrictions,
    });
    return () => {
      console.log("component loaded", editor);
      editor.current?.destroy();
    };
  }, [restrictions]);
  return (
    <>
      <div id="editorjs" />
      <button
        onClick={() => {
          editor.current.save().then((data: any) => {
            handleSave(data);
          });
        }}
      >
        Save
      </button>
    </>
  );
};

export default Editor;
