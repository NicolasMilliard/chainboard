import beginnerFront from '../img/products/snowboard-beginner-front.png'
import beginnerBack from '../img/products/snowboard-beginner-back.png'
import intermediateFront from '../img/products/snowboard-intermediate-front.png'
import intermediateBack from '../img/products/snowboard-intermediate-back.png'
import expertFront from '../img/products/snowboard-expert-front.png'
import expertBack from '../img/products/snowboard-expert-back.png'

export const snowboards = [
    {
        level: 'beginner',
        images: [
            {
                id: 1,
                src: beginnerFront,
                alt: 'Beginner Snowboard - Front'
            },
            // {
            //     id: 2,
            //     src: beginnerBack,
            //     alt: 'Beginner Snowboard - Back'
            // }
        ],
        price: 0.012
    },
    {
        level: 'intermediate',
        images: [
            {
                id: 3,
                src: intermediateFront,
                alt: 'Intermediate Snowboard - Front'
            },
            // {
            //     id: 4,
            //     src: intermediateBack,
            //     alt: 'Intermediate Snowboard - Back'
            // }
        ],
        price: 0.014
    },
    {
        level: 'expert',
        images: [
            {
                id: 5,
                src: expertFront,
                alt: 'Expert Snowboard - Front'
            },
            // {
            //     id: 6,
            //     src: expertBack,
            //     alt: 'Expert Snowboard - Back'
            // }
        ],
        price: 0.019
    }
]