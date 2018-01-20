// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

var razina = 1;
var broj_karata = 3;


$(".modal").html("<h2 class='winner'>Odaberi broj parova:</h2><button id='prva'>4</button> <button id='druga'>8</button><button id='treca'>12</button>");
$("#prva").click(function() {
  razina = "1";
  igra()
})
$("#druga").click(function() {
  razina = "2";
  igra()
})
$("#treca").click(function() {
  razina = "3";
  igra()
})


function igra() {

  if (razina == 1) {
    broj_karata = 4;

  } else if (razina == 2) {
    broj_karata = 8;
  } else {
    broj_karata = 12
  }
  $("footer").fadeIn(1000);
  $(".modal").fadeOut(1000);
  $(".modal-overlay").delay(1000).slideUp(1000);
  $(".game").show("slow");
  //localStorage.clear();

  var br = 1;
  var sec = 0;
  var pokusaj = 0;
  var vrijeme = 1;

  var najbolje_vrijeme;
  var najmanji_broj_pokusaja;
  var karte;

  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  setInterval(function() {
    if (vrijeme == 1) {
      $("#seconds").html(pad(++sec % 60));
      $("#minutes").html(pad(parseInt(sec / 60, 10)));
    }
  }, 1000);
  var Memory = {

    init: function(cards) {
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $(".restart");
      this.cardsArray = $.merge(cards, cards);

      this.shuffleCards(this.cardsArray);

      this.setup();
    },

    shuffleCards: function(cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function() {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.binding();
      this.paused = false;
      this.guess = null;
      this.$cards = $(this.shuffle(this.cardsArray));

    },

    binding: function() {
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function() {

      var _ = Memory;
      var $card = $(this);
      if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {

        $card.find(".inside").addClass("picked");
        if (!_.guess) {
          _.guess = $(this).attr("data-id");
          $(this).find('p').toggle();
        } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
          $(".picked").addClass("matched");
          _.guess = null;
          $(".matched").find('p').remove();
          pokusaj++;


          switch ($(this).attr('data-id')) {
            case "1":
              vrijeme = 0;
              $.playSound('zvuk/bucina_truba.ogg');
              swal({
                title: 'Bučina truba',
                html: '<img src="slike/Bucпina-truba.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Bučina je glazbalo koje se izrađivalo od suhe tikve kojoj se odrezao vrh s jedne strane i polovica okruglog dijela s druge strane, izvadio se unutarnji dio, očistio od koštica i stavio sušiti u dimnjak kuće. Unutarnji se dio potom vrtio nad slabim plamenom kako bi se dodatno ispržile i one preostale niti. U uski se otvor najčešće utaknuo pisak i u njega se puhalo.</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });

              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "2":
              vrijeme = 0;
              $.playSound('zvuk/diple_bez_mjesine.ogg');
              swal({
                title: 'Diple bez mješine',
                html: '<img src="slike/diple-bez-mjesine.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Diple su dvocijevne sviraljke s rupicama i jednostrukim jezičkom tipa klarineta uglavnom izrađene od javorova drveta. Nekoć rasprostranjene cijelom Dalmacijom danas su se održale u dalmatinskom zaleđu, sjevernoj Dalmaciji i nekim otocima (primjerice, Korčuli).</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "3":
              vrijeme = 0;
              $.playSound('zvuk/dvojnice.ogg');
              swal({
                title: 'Dvojnice',
                html: '<img src="slike/Dvojnice.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Dvocijevne svirale tipa flaute u pojedinim krajevima dobivaju razne nazive: dvojnice, dvojke, volarice, vidulice, duplice i slično. Izrađene su iz jednog komada drveta javora, šljive, klena ili bazge, unutar kojeg su izbušene dvije paralelne cijevi s rupicama za prebiranje. Vrlo su često bogato ukrašene rezbarenjem, paljenjem, rovašenjem ili bocanjem a ornamenti su uglavnom geometrijski (polukrug, crta, kosa crta i slično). Dvocijevne svirale koristile su se kao solistička glazbala i najčešće ih je čovjek svirao za sebe, čuvajući stoku na ispaši ili u vrijeme dokolice.</p>',
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "4":
              vrijeme = 0;
              $.playSound('zvuk/trstenica.ogg');
              swal({
                title: 'Trstenice',
                html: '<img src="slike/Trstenice.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Trstenice, orgljice (panove svirale) svirale su se u Hrvatskom zagorju i sjevernije prema Međimurju prelazeći hrvatsku granicu prema Mariboru i šire. Radi se o glazbalu čije su cijevi u koje se upuhuje zrak izrađene od trstike, pri čemu je važno pronaći trstike što sličnije debljine, povezane u nizu između dviju daščica. Najveća cijev koja daje najdublji ton nalazi se u sredini a prema krajevima su cjevčice sve kraće. Andske folklorne glazbene skupine kao putujući svirači proširile su andsku inačicu panovih svirala koja je danas u Hrvatskoj puno popularnija i poznatija od one iz Hrvatskog zagorja. Cijevi na tim panovim sviralama poredane su prema veličini, od najdulje prema najkraćoj. Panove svirale iz Hrvatskog zagorja danas više nisu u uporabi a nekad su se koristile kao solističko glazbalo koje su svirali uglavnom pastiri.</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "5":
              vrijeme = 0;
              $.playSound('zvuk/jedinka.ogg');
              swal({
                title: 'Jedinka',
                html: '<img src="slike/Jedinka.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Jednocijevne sviraljke tipa flaute s nizom rupica za prebiranje, ovisno o lokalitetu, imaju razne nazive: žveglica, jedinka, duduk, svirala, ćurominka, slavić, fistula, ćurlik, kavela, strančica. Ova su se glazbala koristila kao solistička i signalna glazbala, a izrađivana su od drveta. Često su ih izrađivali pastiri za vlastitu zabavu. Ovakav tip glazbala rasprostranjen je među svim južnim Slavenima. U Zbirci glazbala većinom su s područja sjeverozapadne Hrvatske, točnije Hrvatskog zagorja, zatim iz Dalmacije, Ravnih kotara i Like; nekolicina ih je iz Bosne i Hercegovine a jedne su iz Bugarske.</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();
              });
              break;
            case "6":
              vrijeme = 0;
              $.playSound('zvuk/rog_nocnih_strazara.ogg');
              swal({
                title: 'Rog noćnih stražara',
                html: '<img src="slike/rog-nocnih-strazara.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Životinjski rogovi kao što su kravarski rog, rog noćnih stražara i kozarski rog izrađeni su od roga vola, bivola ili koze. Rog bi se odstranio sa životinje, dobro očistio s unutarnje i vanjske strane te dodatno ostrugao suhom travom kako bi bio što glađi. Rog noćnih stražara, za razliku od druga dva, ima još dodatni pisak od trske koji se umeće u tanji otvor te pričvršćuje lanom i lijepi voskom.</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "7":
              vrijeme = 0;
              $.playSound('zvuk/diple_s_mjehom.ogg');
              swal({
                title: 'Diple s mjehurom',
                html: '<img src="slike/Diple-s-mjehurom.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;">Mih, mišnice ili mješnice sastoje se od štavljene životinjske kože (najčešće jareće ili kozje) u koju se upuhuje zrak kroz dulac ili kanelu te prebiralice na kojima se svira.</p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "8":
              vrijeme = 0;
              swal({
                title: 'Dude',
                html: '<img src="slike/Dude.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;"></p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "9":
              vrijeme = 0;
              swal({
                title: 'Sopile',
                html: '<img src="slike/Sopile.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;"></p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;
            case "10":
              vrijeme = 0;
              swal({
                title: 'Grmavica',
                html: '<img src="slike/Grmavica.jpg" class="ikone"/>' +
                  '<p style="text-align:justify;"></p>',
                showCloseButton: true,
                confirmButtonText: 'dalje',
              }, function(isConfirm) {

              });
              $('.swal2-confirm').click(function() {
                vrijeme = 1;
                $.stopSound();

              });
              break;


          }

        } else {
          pokusaj++;
          $(this).find('p').toggle();
          _.guess = null;
          _.paused = true;
          setTimeout(function() {
            $(".picked").removeClass("picked");
            Memory.paused = false;
            $(".brojevi").show();
          }, 1200);
        }
        if ($(".matched").length == $(".card").length) {
          _.win();
        }
      }
    },

    win: function() {
      this.paused = true;
      setTimeout(function() {
        Memory.showModal();
        Memory.$game.fadeOut();

      }, 1000);
    },

    showModal: function() {
      var minute = Math.floor(sec / 60);
      var sekunde = sec - minute * 60;
      this.$overlay.show();
      this.$modal.fadeIn("slow");

      if (razina == 1) {
        var najvrijeme = localStorage.getItem('najvrijeme');
        if (najvrijeme === undefined || najvrijeme === null) {
          najvrijeme = sec;
          localStorage.setItem('najvrijeme', sec);

          // If the user has more points than the currently stored high score then
          if (sec < najvrijeme) {
            // Set the high score to the users' current points
            najvrijeme = sec;
            // Store the high score
            localStorage.setItem('najvrijeme', sec);
          }
        }

        var najpokusaji = localStorage.getItem('najpokusaji');

        if (najpokusaji === undefined || najpokusaji === null) {
          najpokusaji = pokusaj;
          localStorage.setItem('najpokusaji', pokusaj);
        }

        // If the user has more points than the currently stored high score then
        if (pokusaj < najpokusaji) {
          // Set the high score to the users' current points
          najpokusaji = pokusaj;
          // Store the high score
          localStorage.setItem('najpokusaji', pokusaj);
        }
      } else if (razina == 2) {
        var najvrijeme = localStorage.getItem('najvrijeme2');
        if (najvrijeme === undefined || najvrijeme === null) {
          najvrijeme = sec;
          localStorage.setItem('najvrijeme2', sec);

          // If the user has more points than the currently stored high score then
          if (sec < najvrijeme) {
            // Set the high score to the users' current points
            najvrijeme = sec;
            // Store the high score
            localStorage.setItem('najvrijeme2', sec);
          }
        }
        var najpokusaji = localStorage.getItem('najpokusaji2');

        if (najpokusaji === undefined || najpokusaji === null) {
          najpokusaji = pokusaj;
          localStorage.setItem('najpokusaji2', pokusaj);
        }

        // If the user has more points than the currently stored high score then
        if (pokusaj < najpokusaji) {
          // Set the high score to the users' current points
          najpokusaji = pokusaj;
          // Store the high score
          localStorage.setItem('najpokusaji2', pokusaj);
        }
      } else {
        var najvrijeme = localStorage.getItem('najvrijeme3');
        if (najvrijeme === undefined || najvrijeme === null) {
          najvrijeme = sec;
          localStorage.setItem('najvrijeme3', sec);
          // If the user has more points than the currently stored high score then
          if (sec < najvrijeme) {
            // Set the high score to the users' current points
            najvrijeme = sec;
            // Store the high score
            localStorage.setItem('najvrijeme3', sec);
          }
        }

        var najpokusaji = localStorage.getItem('najpokusaji3');

        if (najpokusaji === undefined || najpokusaji === null) {
          najpokusaji = pokusaj;
          localStorage.setItem('najpokusaji3', pokusaj);
        }

        // If the user has more points than the currently stored high score then
        if (pokusaj < najpokusaji) {
          // Set the high score to the users' current points
          najpokusaji = pokusaj;
          // Store the high score
          localStorage.setItem('najpokusaji3', pokusaj);
        }
      }

      // Return the high score

      var naj_minute = Math.floor(najvrijeme / 60);
      var naj_sekunde = najvrijeme - naj_minute * 60;
      $(".modal").show();
      $(".modal-overlay").show();
      $(".winner").hide();


      $(".modal").html("<div class='winner'>Bravo!</div><div class='time'><br>broj pokušaja : " + pokusaj + "</br>najmanji broj pokušaja u razini:"+najpokusaji+"<br>vrijeme igre : " + najvrijeme + " : " + sekunde + "</br>najbolje vrijeme: "+naj_minute + " : " + naj_sekunde+"<p><br><br><a onclick='window.location.reload()' style='color:black; cursor:pointer;'>nova igra</a></p></div>");



    },

    hideModal: function() {
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function() {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
      pokusaj = 0;
      sec = 0;
      br = 1;
    },

    // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
    shuffle: function(array) {
      var counter = array.length,
        temp, index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function() {
      var frag = '';
      br = 1;
      this.$cards.each(function(k, v) {
        frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
      <div class="front"><img src="' + v.img + '"\
      alt="' + v.name + '" /></div>\
      <div class="back"><p class="brojevi">' + br + '</p></div></div>\
      </div>';
        if (br < cards.length) {
          br++;
        };
      });
      return frag;
    }
  };

  var cards = [{
    name: "Bučina truba",
    img: "slike/Bucпina-truba.jpg",
    id: 1,
  }, {
    name: "Diple bez mješine",
    img: "slike/diple-bez-mjesine.jpg",
    id: 2
  }, {
    name: "Dvojnice",
    img: "slike/Dvojnice.jpg",
    id: 3
  }, {
    name: "Trstenice",
    img: "slike/Trstenice.jpg",
    id: 4
  }, {
    name: "Jedinka",
    img: "slike/Jedinka.jpg",
    id: 5
  }, {
    name: "Rog noćnih stražara",
    img: "slike/rog-nocnih-strazara.jpg",
    id: 6
  }, {
    name: "Diple s mjehurom",
    img: "slike/Diple-s-mjehurom.jpg",
    id: 7
  }, {
    name: "Dude",
    img: "slike/Dude.jpg",
    id: 8
  }, {
    name: "Sopile",
    img: "slike/Sopile.jpg",
    id: 9
  }, {
    name: "Grmavica",
    img: "slike/Grmavica.jpg",
    id: 10
  }];

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  cards = shuffle(cards);

  cards = cards.slice(0, broj_karata);

  var brojKarata = cards.length;
  Memory.init(cards);

  if (razina == 1) {
    $(".card").css({
      "width": "25%",
      "height": "50%"
    })
  } else if (razina == 2) {
    $(".card").css({
      "width": "25%",
      "height": "25%"
    })
  } else if (razina == 3) {
    $(".card").css({
      "width": "16.66666%",
      "height": "25%"
    })
  }
}
