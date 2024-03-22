/** 
 *  Render Song - done
 *  Scroll top - done
 *  Play/ pause/ seek 
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

const app = {
    song:[
        {
            name: 'Yêu em 2 ngày',
            singer: 'Duong Domic',
            path:'../Music/song1.mp3',
            image: './Assets/Img/pic1.jpg'
        },
        {
            name: 'Over',
            singer: 'Khoi Vu',
            path:'../Music/song2.mp3',
            image: './Assets/Img/pic2.jpg'
        },
        {
            name: 'Rose',
            singer: 'The Chainsmoker',
            path:'../Music/song3.mp3',
            image: './Assets/Img/pic3.jpg'
        },
        {
            name: 'All we know',
            singer: 'The chainsmoker',
            path:'../Music/song4.mp3',
            image: './Assets/Img/pic4.jpg'
        },
        {
            name: 'Takeaway',
            singer: 'The Chainsmoker',
            path:'../Music/song5.mp3',
            image: './Assets/Img/pic5.jpg'
        },
        {
            name: 'Paris',
            singer: 'The chainsmoker',
            path:'../Music/song6.mp3',
            image: './Assets/Img/pic6.jpg'
        }
    ],
    render() {
        // NOTE: Render song 
        // This ở đât là app
        const html = this.song.map((song)=> {
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

    // Xử lý sự kiện
    handelEvent(){
        // NOTE: Scroll top 
        // lấy ra chiều dài của thè cd
        const cdWidth = cd.offsetWidth
        document.onscroll = () => {
            // scrollTop là đang lấy giá trị của việc cuộn trang
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            // Muốn thu nhỏ ảnh thumb thì lấy kích thước width của cd trừ đi giá trị cuộn trang 
            const newCdWidth = cdWidth - scrollTop
            // Điều kiện - nếu newCdWidth > 0 thì lấy giá trị của newCdWidth còn không thì set về 0
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth > 0 ? newCdWidth / cdWidth : 0
        }
            
    },
    start() {
        // this ở đây cũng là app 
        this.handelEvent()
        this.render()
    },
}

app.start()