import marked from "marked";

export function parseHtml(raw: string, assetsHost: string) {
  const renderer: marked.RendererObject = {
    image(href:string, title:string, text:string){
      return `<img src="${assetsHost}${href}" alt="${text}" class="${title}">`;
    },
  };
  marked.use({ renderer });
  return marked(raw)
}
 