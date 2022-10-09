import React, { useState } from 'react'
import Iconify from './Iconify'
import '@/assets/css/slider.css'
const Slider = ()=>{
    const slide_items=[
        {
            id:0,
            title:'Chào mừng bạn đến với website Bán đồ ăn nhanh KingFood ',
            img:'http://amoon.com.vn/wp-content/uploads/2020/04/8-sai-lam-luyen-tap-9-1400x787.jpg',
            description:'Thiên đường đồ ăn nhanh đáp ứng mọi nhu cầu về ẩm thực ',
        },
        {
            id:1,
            title:'Chào mừng bạn đến với website Bán đồ ăn nhanh KingFood ',
            img:'https://img-global.cpcdn.com/recipes/0a236ab53cdacd70/1200x630cq70/photo.jpg',
            description:'Thiên đường đồ ăn nhanh đáp ứng mọi nhu cầu về ẩm thực ',
        },
        {
            id:2,
            title:'Chào mừng bạn đến với website Bán đồ ăn nhanh KingFood ',
            img:'https://nld.mediacdn.vn/291774122806476800/2021/10/28/tai-xuong-16353823362312089797013.jpg',
            description:'Thiên đường đồ ăn nhanh đáp ứng mọi nhu cầu về ẩm thực ',
        },
    ]
    const [slideIndex,setSlideIndex] = useState(0)
    const nextSlide = ()=>{
        setSlideIndex(slideIndex === slide_items.length -1? 0:slideIndex +1)
    }
    const prevSlide=()=>{
        setSlideIndex(slideIndex === 0?slide_items.length -1:slideIndex -1)
    }
    return (
        <div className="slide-container">
            <div className="arrow left">
                <Iconify icon={'bi:arrow-left-circle'} onClick={prevSlide} />
            </div>
            <div className="slide-wrapper">
                {slide_items.map((item)=>(
                <div className={item.id === slideIndex ?'slide active':'slide'} key={item.id}>
                    {item.id ===slideIndex && (
                    <div className="slide-slide" key={item.id}>
                        <div className="slide-img">
                            <img src={item.img} />
                        </div>
                        <div className="slide-imginfo">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <button>Click</button>
                        </div>
                    </div> )}
                </div>
                ))}
            </div>
            <div className="arrow right">
                <Iconify icon={'bi:arrow-right-circle'} onClick={nextSlide}  />
            </div>
        </div>
    )
}
export default Slider