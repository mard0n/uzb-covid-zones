import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
export const editorToHTMLParser = (blocks: any = []) => {
  return blocks?.map((block: any, index: number) => {
    const text = ReactHtmlParser(block.data.text);
    let elemToReturn: any;
    switch (block?.type) {
      case "delimiter":
        elemToReturn = <br />;

      case "header":
        switch (block?.data?.level) {
          case 1:
            elemToReturn = <h1>{text}</h1>;
            break;
          case 2:
            elemToReturn = <h2>{text}</h2>;
            break;
          case 3:
            elemToReturn = <h3>{text}</h3>;
            break;
          case 4:
            elemToReturn = <h4>{text}</h4>;
            break;
          case 5:
            elemToReturn = <h5>{text}</h5>;
            break;
          case 6:
            elemToReturn = <h6>{text}</h6>;
            break;
          default:
            elemToReturn = <h4>{text}</h4>;
            break;
        }
        break;

      case "paragraph":
        elemToReturn = <p>{text}</p>;
        break;

      case "list":
        const list = block.data.items.map((i: any) => (
          <li key={i}>{ReactHtmlParser(i)}</li>
        ));
        switch (block?.data?.style) {
          case "unordered":
            elemToReturn = <ul>{list}</ul>;
            break;

          default:
            elemToReturn = <ol>{list}</ol>;
        }
        break;

      case "image":
        let caption = block.data.caption ? block.data.caption : "Image";
        elemToReturn = <img src={block.data.file.url} alt={caption} />;
        break;

      default:
        elemToReturn = <></>;
    }
    return <Fragment key={index}>{elemToReturn}</Fragment>;
  });
};
