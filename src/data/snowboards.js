import beginnerFront from '../img/products/snowboard-beginner-front.png'
import beginnerBack from '../img/products/snowboard-beginner-back.png'
import intermediateFront from '../img/products/snowboard-intermediate-front.png'
import intermediateBack from '../img/products/snowboard-intermediate-back.png'
import expertFront from '../img/products/snowboard-expert-front.png'
import expertBack from '../img/products/snowboard-expert-back.png'

export const snowboards = [
    {
        level: 'Beginner',
        images: [
            {
                src: beginnerFront,
                alt: 'Beginner Snowboard - Front'
            },
            {
                src: beginnerBack,
                alt: 'Beginner Snowboard - Back'
            }
        ],
        price: 0.012
    },
    {
        level: 'Intermediate',
        images: [
            {
                src: intermediateFront,
                alt: 'Intermediate Snowboard - Front'
            },
            {
                src: intermediateBack,
                alt: 'Intermediate Snowboard - Back'
            }
        ],
        price: 0.014
    },
    {
        level: 'Expert',
        images: [
            {
                src: expertFront,
                alt: 'Expert Snowboard - Front'
            },
            {
                src: expertBack,
                alt: 'Expert Snowboard - Back'
            }
        ],
        price: 0.019
    }
]