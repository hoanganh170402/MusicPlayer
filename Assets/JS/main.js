/** 
 *  Render Song - done
 *  Scroll top - done
 *  Play/ pause/ seek - done
 *  CD rotate
 *  Next / prev
 *  Random
 *  Next / repeat when ended
 *  Active song
 *  Scroll active song into view
 *  Play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = 
{

    currentIndex: 0,
    isPlaying:false,
    song:[
        {
            name: 'Yêu em 2 ngày',
            singer: 'Duong Domic',
            path:'./Assets/Music/song1.mp3',
            image: './Assets/Img/pic1.jpg'
        },
        {
            name: 'Over',
            singer: 'Khoi Vu',
            path:'./Assets/Music/song2.mp3',
            image: './Assets/Img/pic2.jpg'
        },
        {
            name: 'Rose',
            singer: 'The Chainsmoker',
            path:'./Assets/Music/song3.mp3',
            image: './Assets/Img/pic3.jpg'
        },
        {
            name: 'All we know',
            singer: 'The chainsmoker',
            path:'./Assets/Music/song4.mp3',
            image: './Assets/Img/pic4.jpg'
        },
        {
            name: 'Takeaway',
            singer: 'The Chainsmoker',
            path:'./Assets/Music/song5.mp3',
            image: './Assets/Img/pic5.jpg'
        },
        {
            name: 'Paris',
            singer: 'The chainsmoker',
            path:'./Assets/Music/song6.mp3',
            image: './Assets/Img/pic6.jpg'
        }
    ],

    render() 
    {
        // NOTE: Render song 
        // This ở đât là app
        const html = this.song.map((song)=> 
        {
            return ` 
            <div class="song">
                    <div class="thumb" style="background-image:url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = html.join('')
    },

    defineProperties() 
    {
        // This ở đây là app
        Object.defineProperty(this,'currentSong', 
        {
            get() 
            {
                return this.song[this.currentIndex]
            }
        })
    },

    // Xử lý sự kiện
    handelEvent()
    {
        // NOTE: Scroll top 
        // lấy ra chiều dài của thè cd
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lí CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration:8000, // hoàn thành 1 vòng quay trong 8 giây
            iterations: Infinity // Lặp vô hạn
        })
        cdThumbAnimate.pause()

        // Phóng to thu nhỏ CD
        document.onscroll = () => 
        {
            // scrollTop là đang lấy giá trị của việc cuộn trang
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            // Muốn thu nhỏ ảnh thumb thì lấy kích thước width của cd trừ đi giá trị cuộn trang 
            const newCdWidth = cdWidth - scrollTop
            // Điều kiện - nếu newCdWidth > 0 thì lấy giá trị của newCdWidth còn không thì set về 0
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth > 0 ? newCdWidth / cdWidth : 0
        }
        
        // Xử lý khi click play 
        playBtn.onclick = () => 
        {
            if(_this.isPlaying)
            {
                audio.pause()
            }
            else
            {
                audio.play()
            }
        }
        // Khi nhạc được phát
        audio.onplay = () =>
        {
            this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi nhạc bị dừng 
        audio.onpause = () => 
        {
            this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = () => 
        {
            // Nếu không phải là NAN
            if(audio.duration) 
            {
                // audio.currentTime là thời gian hiện tại
                // audio.duration là tổng thời lượng bài hát
                // Tính phần trăm cho progress
                const progressPercent = audio.currentTime *100 / audio.duration 

                // Thanh đổi value trong progress thành gí trị phần trăm ở trên
                progress.value = progressPercent
            }
        }

        // Xử lí khi tua bài hát
        progress.onchange = (e) => 
        {
            // Số phần trăm muốn thay đổi
            currentPercent = e.target.value
            seekTime = currentPercent / 100 * audio.duration

            // Thay đổi thời gian hiện tại thành thời gian gian tua 
            audio.currentTime = seekTime
        }

        // Khi next bài hát
        nextBtn.onclick = () =>
        {
            _this.nextSong()
            audio.play()
        }

        // Khi prev bài hát
        prevBtn.onclick = () =>
        {
            _this.prevSong()
            audio.play()
        }
    },

    // Load ra bài hát đầu tiên 
    loadCurrentSong () 
    {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    nextSong() 
    {
        this.currentIndex++
        if(this.currentIndex >= this.song.length)
        {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong()
    {
        this.currentIndex--
        if(this.currentIndex < 0)
        {
            this.currentIndex = this.song.length - 1
        }
        this.loadCurrentSong()
    },

    getCurrentSong() 
    {
        return this.song[this.currentIndex]
    },


    start() 
    {
        // this ở đây cũng là app 

        // Định nghĩa các thuộc tính của object
        this.defineProperties()
        console.log(this.getCurrentSong());

        // Lắng nghe và sử lý các sự kiện
        this.handelEvent()

        // Load current song
        this.loadCurrentSong()

        // Render playlist
        this.render()
    },
}

app.start()