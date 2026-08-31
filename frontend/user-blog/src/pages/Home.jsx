import foodR from '../assets/food.jpg'

export default function Home() {
    return (
        <>
            <div className="flex mt-20 justify-center w-screen h-screen bg-white">
                <div>
                    <div className="text-2xl ml-6 mr-100">
                        <h1 className="pb-10 text-black font-bold text-3xl">Blogs</h1>
                        <p className='font-semibold'>Finding the right tools to grow your online presence can feel overwhelming. With so many options available today, it is easy to get stuck in "analysis paralysis" while trying to make the perfect choice. In this guide, we break down the top strategies to help you streamline your workflow, boost your productivity, and finally achieve your business goals.</p>
                    </div>
                </div>
                <div className='mr-10'>
                    <img src={foodR} className='h-100 w-500' />
                </div>
            </div >
        </>

    )
}

