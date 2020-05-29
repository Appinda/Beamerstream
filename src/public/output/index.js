let elements = {};

function initElements(){
  elements.lyrics = $("#lyrics");
}

function setLyricsStyle(style){
  elements.lyrics.css(style)
}
function setLyrics(rawtext){
  let text = decodeLyrics(rawtext); 
  if(rawtext != ""){
    $("#lyrics").fadeIn(500);
    $("#lyrics").html(text)
    $("#lyrics").attr('title', text);
  }else{
    $("#lyrics").fadeOut(500);
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
    'font-size': '4em',
    'text-align': 'center',
  });

  let socket = io();
  socket.on('setText', (args) => {
    let text = decodeLyrics(args.text);
    setLyrics(text)
  });
})