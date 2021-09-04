const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnNextSong = $('.forward')
const btnBackSong = $('.backward')
const clickSong = $('.listSong')

const obj = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,

  listSongs: [
    {
      name: 'Mashup Cung danh thoi',
      singer: 'Duc Phuc, Erik, HoaMinzy',
      path: './link/audio/song1.mp3',
      pathImg: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Duong toi cho em ve',
      singer: "Bui Truong Linh",
      path: './link/audio/song2.mp3',
      pathImg: 'https://avatar-ex-swe.nixcdn.com/song/2020/07/02/5/d/c/9/1593687560557_640.jpg'
    },
    {
      name: 'Thich em hoi nhieu',
      singer: 'Wren Evans x Freak D',
      path: './link/audio/song3.mp3',
      pathImg: 'https://i1.sndcdn.com/artworks-gjuwJety5q5z8W9x-uK95Lw-t500x500.jpg'
    },
    {
      name: 'Tro Dua',
      singer: 'Quang Đăng Trần x Dino',
      path: './link/audio/song4.mp3',
      pathImg: 'https://i.ytimg.com/vi/Gx0RnmWOjcg/maxresdefault.jpg'
    },
    {
      name: "Bo em vao ba lo",
      singer: "Tân Trần x Freak D",
      path: './link/audio/song5.mp3',
      pathImg: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/2/d/1/92d1087e7b366b4cf7d1539d37e5f610.jpg"
    },
    {
      name: 'On My Way',
      singer: 'LiLy',
      path: './link/audio/song6.mp3',
      pathImg: 'https://avatar-ex-swe.nixcdn.com/song/2021/04/23/e/1/4/7/1619160025485_640.jpg'
    },
    {
      name: 'That Girl',
      singer: 'Olly Murs s',
      path: './link/audio/song7.mp3',
      pathImg: 'https://www.voca.vn/assets/img/news/that%20girl-1545280005.jpg'
    },
    {
      name: 'Anh The Day',
      singer: 'Thanh Hung',
      path: './link/audio/song8.mp3',
      pathImg: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/a/9/4/d/a94d404a69d40e168ca844460c729aa5.jpg'
    },
    {
      name: 'Beautiful in white',
      singer: 'Westlife ',
      path: './link/audio/song9.mp3',
      pathImg: 'https://images.genius.com/112bda3f1ad54c9717ed853a45b267bb.600x600x1.jpg'
    },
    {
      name: 'Em Muon Lai Chi',
      singer: 'Binh Gold',
      path: './link/audio/song10.mp3',
      pathImg: 'https://i1.sndcdn.com/artworks-000646512973-1941kp-t500x500.jpg'
    },
    {
      name: 'Love Yourself',
      singer: 'Justin Beiber',
      path: './link/audio/song11.mp3',
      pathImg: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Nguoi em co do',
      singer: 'Rum x Daa',
      path: './link/audio/song12.mp3',
      pathImg: 'https://i.scdn.co/image/ab67616d0000b27303df497347697182cc4aa908'
    },
    {
      name: 'To The Moon',
      singer: 'holligan',
      path: './link/audio/song13.mp3',
      pathImg: 'https://avatar-ex-swe.nixcdn.com/song/2020/07/02/5/d/c/9/1593664626011_640.jpg'
    },
    {
      name: 'Yeu Thuong ngay do',
      singer: 'Soobin Hoang Son',
      path: './link/audio/song14.mp3',
      pathImg: 'https://avatar-ex-swe.nixcdn.com/song/2018/04/10/d/c/7/b/1523334524077_640.jpg'
    },
    {
      name: 'Bukan Pho',
      singer: 'DJ DeSa',
      path: './link/audio/song15.mp3',
      pathImg: 'https://i.ytimg.com/vi/sGU0CHrSFT4/maxresdefault.jpg'
    },
    {
      name: 'Có hẹn với thanh xuân',
      singer: 'Monstar',
      path: './link/audio/song16.mp3',
      pathImg: 'https://i.ytimg.com/vi/vpRi8S6uXAg/maxresdefault.jpg'
    },
    {
      name: 'Sau tất cả',
      singer: 'Erik',
      path: './link/audio/song17.mp3',
      pathImg: 'data:image/jpeg;base64,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'
    },
    {
      name: 'lemon tree',
      singer: 'Gustixa',
      path: './link/audio/song18.mp3',
      pathImg: 'https://i.ytimg.com/vi/l2UiY2wivTs/maxresdefault.jpg'
    },
    {
      name: 'Não cá vàng',
      singer: 'Only C x Lou Hoàng',
      path: './link/audio/song19.mp3',
      pathImg: 'https://yeutrithuc.com/wp-content/uploads/2017/04/nao-ca-vang-la-gi-tim-hieu-hoi-chung-va-trao-luu-nao-ca-vang-8.jpg'
    },
    {
      name: 'Phượng Buồn',
      singer: 'H2k',
      path: './link/audio/song20.mp3',
      pathImg: 'https://i.ytimg.com/vi/31NuzJ_aTUk/maxresdefault.jpg'
    },
    {
      name: 'Tát nước đầu đình',
      singer: 'Lynk Lee x Binz',
      path: './link/audio/song21.mp3',
      pathImg: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/covers/5/b/5b0e1e9f8bc5a40c9062cc20ef85929d_1441510933.jpg'
    },
  ],

  render: function () {
    const htmls = this.listSongs.map((song, index) => {
      return `
                <div class="nameMusicAndSinger ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p> 
                </div>
            `;
    });
    $(".listSong").innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.listSongs[this.currentIndex];
      },
    });
  },

  loadCurrentSong: function() {
    const nameSong = $('.playList .song .nameMusicAndSinger .title')
    const nameSinger = $('.playList .song .nameMusicAndSinger .author')
    const audio = $('#audio')
    const img = $('.container .temp1 .headPhone .back img')

    nameSong.textContent = this.currentSong.name
    nameSinger.textContent = this.currentSong.singer
    audio.src = this.currentSong.path
    img.src = this.currentSong.pathImg
  },

  nextSong: function() {  
    this.currentIndex++;
      if(this.currentIndex >= this.listSongs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
  },

  backSong: function() {
    this.currentIndex--;
      if(this.currentIndex < 0) {
        this.currentIndex = this.listSongs.length - 1;
      }
      this.loadCurrentSong();
  },

  handEvent: function() {
    const _this = this;

    // next bai hat
    btnNextSong.onclick = function() {
      if(_this.isRandom) {
        _this.playRanDomSong();
      } else {
        _this.nextSong();
      }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
    }

    // back bai hat
    btnBackSong.onclick = function() {
      if(_this.isRandom) {
        _this.playRanDomSong();
      } else {
        _this.backSong();
      }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
    }

    // click vao trong song
    clickSong.onclick = function(e) {
      const songNode = e.target.closest('.nameMusicAndSinger:not(.active)')
        if(songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
    },

    // khi ket thuc bai hat se xuat hien bai hat moi
    // audio.onended = function () {
    //   if (_this.isRepeat) {
    //     audio.play();
    //   } else {
    //     nextBtn.click();
    //   }
    // };
      audio.onended = function() {
        if(_this.isRepeat) {
          audio.play();
        } else {
          btnNextSong.click();
        }
      }
  },

  playRanDomSong: function() {
    let newIndex; 
      do {
        newIndex = Math.floor(Math.random() * this.listSongs.length);
      } while(newIndex === this.currentIndex);

      this.currentIndex = newIndex;
      this.loadCurrentSong();
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".listSong .active").scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }, 300);
  },
 
  start: function () {
      // định nghĩa các thuộc tính cho object
    this.defineProperties()

    this.scrollToActiveSong()

    // Xu ly cac su kien 
    this.handEvent()

    // tải bài hát lên giao diện khi chạy ứng dụng
    this.loadCurrentSong()

    // xuất ra danh sách các bài hát
    this.render();
  },
};

obj.start();
