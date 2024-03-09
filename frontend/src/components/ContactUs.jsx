import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactUs() {
  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h2 class="text-xs text-yellow-400 tracking-widest font-medium title-font mb-1">CONTACT ME</h2>
      <h1 class="md:text-2xl text-2xl font-medium title-font text-white">Have a question or feedback? We're here to help! Reach out to us anytime, and we'll get back to you as soon as possible. Your satisfaction is our priority.m</h1>
    </div>
    <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
    <Link to='mailto:manishkumarp0105@gmail.com'>
      <button class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
      <i class="fa-regular fa-envelope text-2xl "></i>
      </button>
        </Link>
      <Link to="https://www.linkedin.com/in/manish-kumar-99b781233/" target="_blank">
      <button class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
      <i class="fa-brands fa-linkedin-in text-2xl"></i>
      </button>
      </Link>
    </div>
  </div>
</section>
    </div>
  )
}
