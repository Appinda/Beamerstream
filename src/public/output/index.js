let elements = {};

function initElements(){
  elements.lyrics = $(".lyrics");
}

function setLyricsStyle(style){
  elements.lyrics.css(style)
}
function setLyrics(rawtext){
  let text = decodeLyrics(rawtext); 
  if(rawtext != ""){
    // $(".lyrics").fadeIn(500);
    elements.lyrics.show();

    let html = text;
    html = html.replace(/{sm}/g, "<small>").replace(/{\/sm}/g, "</small>"); // Small
    html = html.replace(/{y}/g, "<span class='stl-y'>").replace(/{\/y}/g, "</span>"); // Yellow

    elements.lyrics.html(html)
  }else{
    elements.lyrics.hide();
  }
}

function decodeLyrics(text){
  let rawtext = text;
  rawtext = rawtext.replace(/\n/g, "<br/>");
  return rawtext;
}
function encodeLyrics(rawtext){
  let text = rawtext;
  text = text.replace(/<\/?br\/?>/g, "\n");
  return text;
}

$(() => {

  initElements();
  setLyricsStyle({
    'font-family': 'Helvetica, Arial, sans-serif',
    'font-size': '52px',
    'text-align': 'center',
    // 'white-space': 'nowrap'
  });

  let socket = io();
  socket.on('setText', (args) => {
    let text = decodeLyrics(args.text);
    setLyrics(text)
  });
  socket.on('setStyle', (style) => {
    elements.lyrics.css({
      fontSize: style.fontSize||undefined
    });
  });
})