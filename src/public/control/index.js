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

function decodeLyrics(text) {
  let rawtext = text;
  rawtext = rawtext.replace(/\n/g, "<br/>");
  return rawtext;
}
function encodeLyrics(rawtext) {
  if(rawtext == null) throw "Parameter error";
  let text = rawtext;
  text = text.replace(/<\/?br\/?>/g, "\n");
  return text;
}

function setCurrentText() {
  let html = $(".outputlist > .active").html();
  if(html) setText(html);
}
function setText(text) {
  ipcRenderer.send('setText', { text: encodeLyrics(text) })
}

function loadSonglist(songlist){
  clearSonglist();
  for (let songid in songlist) {
    let song = songlist[songid];
    $(".songlist").append(`<div class="hover" data-id="${song.id}">${song.name} <small>- ${song.author}</small></div>`);
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
    $(".outputlist").append(`<div class="title">${getVerseFullName(versename)}</div>`);
    for(let verse of verses){
      $(".outputlist").append(`<div class="verse hover">${verse}</div>`);
    }
  }
  listenOutputlist();
  return true;
}
function getVerseFullName(shortname){
  if(shortname.startsWith("V")) return shortname.replace('V', 'Verse ')
  if(shortname.startsWith("C")) return shortname.replace('C', 'Chorus ')
  if(shortname.startsWith("E")) return shortname.replace('E', 'Ending ')
  if(shortname.startsWith("O")) return shortname.replace('O', 'Other ')
  if(shortname.startsWith("B")) return shortname.replace('B', 'Bridge ')
  if(shortname.startsWith("P")) return shortname.replace('P', 'Pre-Chorus ')
  return shortname;
}
function unloadSong(){
  $(".outputlist").empty();
}
function deselectOutput(){
  $(".outputlist > .active").removeClass("active");
}
function listenOutputlist(){
  $(".outputlist > div.hover").click(e => {
    deselectOutput();
    $(e.target).addClass("active");
    setCurrentText();
  });
}
function listenSonglist(){
  // SOCKETLIST CLICK
  $(".songlist > div.hover").click(e => {
    $(".songlist > .active").removeClass("active");
    $(e.target).addClass("active");
  });

  // DOUBLE CLICK SONGLIST
  $(".songlist > div.hover").dblclick(e => {
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
function hide(){
  deselectOutput();
  setText("");
  return true;
}
function up() {
  let active = $(".outputlist > .active");
  let prev = active.prev();
  while(!prev.hasClass("hover")) {
    prev = prev.prev();
    if (prev.length == 0) return false;
  }
  prev.addClass("active");
  active.removeClass("active");
  setCurrentText();
  return true;
}
function down() {
  let active = $(".outputlist > .active");
  let next = active.next();
  while(!next.hasClass("hover")) {
    next = next.next();
    if (next.length == 0) return false;
  }
  next.addClass("active");
  active.removeClass("active");
  setCurrentText();
  return true;
}

// ===========================================
//                  RUNTIME
// ===========================================

$(() => {
  
  // ARROWS
  $(document).keydown(e => {
    if($(e.target).prop("tagName") !== "BODY") return;
    switch(e.key){
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
      case "w":
        hide();
        break;
      // default:
        // console.log(e.key);
    }
  });

  // HIDE
  $(".btn_hide").click((e) => {
    hide();
  });
  $(".btn_fadeout").click((e) => {
    hide();
  });

  // FONTSIZE
  $("#input_fontsize").change((e) => {
    let fontsize = parseInt(e.target.value);
    setFontSize(fontsize);
  })
});

