import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava02.jpg'
import ava03 from '../../assets/images/ava03.jpg'

const Testimonials = () => {

    const settings ={
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            
            
        ]

    }
  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p> reviews reviews reviews reviews reviews reviews reviews </p>

        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} className="testimonial-img" alt ="" />
            <div>
                <h6 className="mb-0 mt-3"> Hari Bahadur</h6>
                <p>User</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p> reviews reviews reviews reviews reviews reviews reviews </p>

        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava02} className="testimonial-img" alt ="" />
            <div>
                <h6 className="mb-0 mt-3"> Aayusha Lamichhane</h6>
                <p>User</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p> reviews reviews reviews reviews reviews reviews reviews </p>

        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} className="testimonial-img" alt ="" />
            <div>
                <h6 className="mb-0 mt-3"> Anshu Shrestha </h6>
                <p>User</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p> reviews reviews reviews reviews reviews reviews reviews </p>

        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} className="testimonial-img" alt ="" />
            <div>
                <h6 className="mb-0 mt-3"> Anju shrestha  </h6>
                <p>User</p>
            </div>
        </div>
    </div>


  </Slider>
}

export default Testimonials