window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron')

let SONG1 = {
  "format": 1,
  "meta": {
    "name": "Sovereign over us",
    "author": "Michael W. Smith",
    "ccli": "Capitol Christian Music Group"
  },
  "theme": 0,
  "lyrics": {
    "order": "V1 C1 V2 C1 C1 B1 B1 C1 E1",
    "V1": "There is strength within the sorrow%nThere is beauty in our tears%sAnd You meet us in our mourning%nWith a love that casts out fear%sYou are working in our waiting%nYou're sanctifying us%sWhen beyond our understanding%nYou're teaching us to trust",
    "C1": "Your plans are still to prosper%nYou have not forgotten us%sYou're with us in the fire and the flood%nYou're faithful forever%sPerfect in love%nYou are sovereign over us",
    "V2": "You are wisdom unimagined%nWho could understand Your ways%sReigning high above the Heavens%nReaching down in endless grace%sYou're the lifter of the lowly%nCompassionate and kind%sYou surround and You uphold me%nAnd Your promises are my delight",
    "B1": "Even what the enemy means for evil%nYou turn it for our good%sYou turn it for our good and for Your glory%nEven in the valley, You are faithful%sYou're working for our good%nYou're working for our good and for Your glory",
    "E1": "You're faithful forever%nPerfect in love%s%nYou are sovereign over us"
  }
}

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
  for(let versename of order){
    if(!song.lyrics.hasOwnProperty(versename)) { console.error(`Error while parsing song! Verse order contains verse "${versename}", which has not been specified in lyrics.`); continue; }
    let verse = song.lyrics[versename].replace(/%n/g, "<br/>");
    let verses = verse.split("%s");
    for(let verse of verses){
      $(".outputlist").append(`<div>${verse}</div>`);
    }
  }
  listenOutputlist();
}
function unloadSong(){
  $(".outputlist").empty();
}

function listenOutputlist(){
  $(".outputlist > div").click(e => {
    $(".outputlist > .active").removeClass("active");
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
  });
}

// ===========================================
//                  RUNTIME
// ===========================================

$(() => {
  
  // ARROWS
  $(document).keydown(e => {
    if (e.key == "ArrowUp") {
      up();
    }
    if (e.key == "ArrowDown") {
      down();
    }
  });

  // HIDE
  $("#btn_hide").click((e) => {
    $(".outputlist > .active").removeClass("active");
    setText("");
  });

  loadSong(SONG1);
});

