import {
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

function About() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container px-6 py-12 mx-auto'>
        <div>
          <p className='font-medium text-colorPrimary'>Liên hệ chúng tôi</p>

          <h1 className='mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>
            Trò chuyện với đội ngũ thân thiện của chúng tôi
          </h1>

          <p className='mt-3 text-gray-500 dark:text-gray-400'>
            Chúng tôi rất mong nhận được phản hồi từ bạn. Vui lòng điền vào mẫu
            này hoặc gửi cho chúng tôi một email.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2'>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
            <div>
              <span className='inline-block p-3 text-colorPrimary rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <EnvelopeIcon className='w-6 h-6' />
              </span>

              <h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
                Email
              </h2>
              <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                Our friendly team is here to help.
              </p>
              <p className='mt-2 text-sm text-colorPrimary dark:text-blue-400'>
                hello@merakiui.com
              </p>
            </div>

            <div>
              <span className='inline-block p-3 text-colorPrimary rounded-full bg-orange-100/80'>
                <ChatBubbleLeftEllipsisIcon className='w-6 h-6' />
              </span>

              <h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
                Live chat
              </h2>
              <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                Our friendly team is here to help.
              </p>
              <p className='mt-2 text-sm text-colorPrimary dark:text-blue-400'>
                Start new chat
              </p>
            </div>

            <div>
              <span className='inline-block p-3 text-colorPrimary rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <MapPinIcon className='w-6 h-6' />
              </span>

              <h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
                Office
              </h2>
              <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                Come say hello at our office HQ.
              </p>
              <p className='mt-2 text-sm text-colorPrimary dark:text-blue-400'>
                100 Smith Street Collingwood VIC 3066 AU
              </p>
            </div>

            <div>
              <span className='inline-block p-3 text-colorPrimary rounded-full bg-blue-100/80 dark:bg-gray-800'>
                <PhoneIcon className='w-6 h-6' />
              </span>

              <h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
                Phone
              </h2>
              <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                Mon-Fri from 8am to 5pm.
              </p>
              <p className='mt-2 text-sm text-colorPrimary dark:text-blue-400'>
                +1 (555) 000-0000
              </p>
            </div>
          </div>

          <div className='p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8'>
            <form>
              <div className='-mx-2 md:items-center md:flex'>
                <div className='flex-1 px-2'>
                  <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                    Họ
                  </label>
                  <input
                    type='text'
                    placeholder='John '
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-orange-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='flex-1 px-2 mt-4 md:mt-0'>
                  <label className='block mb-2 text-sm text-gray-600'>
                    Tên
                  </label>
                  <input
                    type='text'
                    placeholder='Doe'
                    className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
              </div>

              <div className='mt-4'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                  Địa chỉ Email
                </label>
                <input
                  type='email'
                  placeholder='johndoe@example.com'
                  className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg d focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div className='w-full mt-4'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                  Lời nhắn
                </label>
                <textarea
                  className='block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='Message'
                ></textarea>
              </div>

              <button className='w-[150px] px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-colorPrimary rounded-lg hover:bg-orange-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
