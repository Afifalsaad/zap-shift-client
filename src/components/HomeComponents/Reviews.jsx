import React, { use } from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = ({ reviews }) => {
  const data = use(reviews);
  console.log(data);

  return (
    <div>
      <div>
        <h3 className="text-center text-secondary font-bold text-5xl my-20">
          Reviews
        </h3>
      </div>
      <div>
        <>
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper">
            {data.map((d) => (
              <SwiperSlide>
                <div className="rounded-2xl p-8 bg-base-100 shadow-sm border border-gray-200 max-w-md">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-4xl text-[#c3dfe2] mb-4" />

                  {/* Quote Text */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {d.review}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-300 my-4"></div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        className="rounded-full"
                        src={d.user_photoURL}
                        alt=""
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-emerald-900">
                        {d.userName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Senior Product Designer
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default Reviews;
