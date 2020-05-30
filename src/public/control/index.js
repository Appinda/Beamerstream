window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron')

// ===========================================
//                  IPC
// ===========================================

ipcRenderer.on('sendSongs', (event, arg) => {
  loadSonglist(arg.songs);
});
ipcRenderer.send('getSongs')

// ===========================================
//                FUNCTIONS
// ===========================================

function up() {
  let active = $(".outputlist > .active");
  let prev = $(".outputlist > .active").prev();
  if (prev.length == 0) return false;
  prev.addClass("active");
  active.removeClass("active");
  setCurrentText();
  return true;
}
function down() {
  let active = $(".outputlist > .active");
  let next = $(".outputlist > .active").next();
  if (next.length == 0) return false;
  next.addClass("active");
  active.removeClass("active");
  setCurrentText();
  return true;
}

function decodeLyrics(text) {
  let rawtext = text;
  rawtext = rawtext.replace(/\n/g, "<br/>");
  return rawtext;
}
function encodeLyrics(rawtext) {
  let text = rawtext;
  text = text.replace(/<\/?br\/?>/g, "\n");
  return text;
}

function setCurrentText() {
  let html = $(".outputlist > .active").html();
  setText(html);
}
function setText(text) {
  ipcRenderer.send('setText', { text: encodeLyrics(text) })
}

function loadSonglist(songlist){
  clearSonglist();
  for (let songid in songlist) {
    let song = songlist[songid];
    $(".songlist").append(`<div data-id="${song.id}">${song.name} <small>- ${song.author}</small></div>`);
  }
  listenSonglist();
}
function clearSonglist(){
  $(".songlist").empty();
}

async function loadSongById(id){
  let song = await fetchSongById(id);
  loadSong(song);
}
async function fetchSongById(id){
  return new Promise((resolve) => {
    ipcRenderer.once('sendSong', (event, args) => {
      resolve(args);
    });
    ipcRenderer.send('getSong', {id: id})
  });
}
function loadSong(song){
  unloadSong();
  let order = song.lyrics.order.split(" ");
  if(order == "") {
    console.error(`Song "${song.meta.name}" has no lyrics.`);
    return false;
  }
  for(let versename of order){
    if(!song.lyrics.hasOwnProperty(versename)) { console.error(`Error while parsing song! Verse order contains verse "${versename}", which has not been specified in lyrics.`); continue; }
    let verse = song.lyrics[versename].replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/%n/g, "<br/>").replace(/{sm}/g, "<small>").replace(/{\/sm}/g, "</small>").replace(/{y}/g, "<span class='stl-y'>").replace(/{\/y}/g, "</span>");
    let verses = verse.split("%s");
    for(let verse of verses){
      $(".outputlist").append(`<div>${verse}</div>`);
    }
  }
  listenOutputlist();
  return true;
}
function unloadSong(){
  $(".outputlist").empty();
}
function deselectOutput(){
  $(".outputlist > .active").removeClass("active");
}
function listenOutputlist(){
  $(".outputlist > div").click(e => {
    deselectOutput();
    $(e.target).addClass("active");
    setCurrentText();
  });
}
function listenSonglist(){
  // SOCKETLIST CLICK
  $(".songlist > div").click(e => {
    $(".songlist > .active").removeClass("active");
    $(e.target).addClass("active");
  });

  // DOUBLE CLICK SONGLIST
  $(".songlist > div").dblclick(e => {
    let id = $(e.target).attr('data-id');
    loadSongById(id);
    $(".songlist > .active").removeClass("active");
    $(e.target).addClass("active");
  });
}
function setFontSize(size){
  size = size + 'px';
  ipcRenderer.send('setStyle', {fontSize: size});
}

// ===========================================
//                  RUNTIME
// ===========================================

$(() => {
  
  // ARROWS
  $(document).keydown(e => {
    if($(e.target).prop("tagName") !== "BODY") return;
    if (e.key == "ArrowUp") {
      up();
    }
    if (e.key == "ArrowDown") {
      down();
    }
  });

  // HIDE
  $(".btn_hide").click((e) => {
    deselectOutput();
    setText("");
  });
  $(".btn_fadeout").click((e) => {
    deselectOutput();
    setText("");
  });

  // FONTSIZE
  $("#input_fontsize").change((e) => {
    let fontsize = parseInt(e.target.value);
    setFontSize(fontsize);
  })
});

