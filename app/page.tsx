import { Launchpad } from "./components/Launchpad"
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react"

import bg from "./images/banner.jpg"
import Testimonial from "./components/Testimonial"
import Pricing from "./components/Pricing"

import anaysis_bg from "./images/analysis.png"
import apps_bg from "./images/3rdoartyapps.png"
import events_bg from "./images/events.jpg"


export default function Home() {
  
  return (
    <main >
      <div className="">
        <div className=" xl:pl-80 xl:pr-80 h-[52rem]  xl:pt-4 xl:pb-4 bg-image sm:pl-40 sm:pr-40 sm:pt-4 sm:pb-4" style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
        }}>
          <div className="flex gap-4 text-center items-center">
            <h1 className="font-extrabold text-2xl " color="#323232">Blink</h1>

            <Chip className="bg-blue-500 py-1.5 pl-2.5 pr-3 text-xs font-semibold text-white transition hover:border-slate-700/20" size="sm">v1.0</Chip>
          </div>

          <div className="xl:pt-16 sm:pt-6 gap-4 grid-flow-row text-center items-center justify-center">
            <div className="xl:p-4 sm:p-2 order-first flex items-center justify-center gap-4 text-[0.8125rem] leading-6 text-slate-500 lg:justify-start">

              <p>
                14+ APPLICATINS
              </p>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="w-0.5 fill-current"><circle cx="1" cy="1" r="1"></circle></svg>

              <p>
                100 PRE DEFINE TEMPLATES
              </p>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="w-0.5 fill-current"><circle cx="1" cy="1" r="1"></circle></svg>
            </div>
            <h1 className="text-center text-6xl sm:text-6xl font-extrabold leading-9 tracking-tight  md:text-6xl" color="#323232">
              Creating you from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Your Brand</span></h1>
              <p className="text-6xl text-center font-extrabold" >Create, Schedule, share With Blink at your side.</p>
            <br>

            </br>
            <br>
            </br>

            <p className="pt-2">Beautiful, fast and modern Event Managment Platform.</p>
            <Launchpad></Launchpad>
          </div>




        </div>
        <br>
            </br>
            <br>
            </br>
        <h2 className="text-3xl font-bold text-center mb-8">What we offer?</h2>


        <div className="xl:pl-80 xl:pr-80 sm:pl-4 sm:pr-4 gap-4 grid xl:grid-cols-3 sm:grid-cols-1  justify-stretch pt-8 pb-8">
          <Card className="p-4"> <Image
        alt="Woman listing to music"
        className="justify-center  m-5 h-32"
        width={300}
        isZoomed
        isBlurred
        height={50}
        src={events_bg.src}
      />
            <CardHeader className="font-semibold">
              Power Event&ldquo;s
            </CardHeader>
            <CardBody>
              <p>Create events using auto generated prompt using Chat GPT, with rich images using midjurney, create sheduele and forgot</p>
            </CardBody>
          </Card>

          <Card className="p-4">
          <Image
        alt="Woman listing to music"
        className="justify-center  m-5 h-32"
        width={300}
        isZoomed
        isBlurred
        height={50}
        src={apps_bg.src}
      />
            <CardHeader className="font-semibold">
              3rd Party Applications
            </CardHeader>
            <CardBody>
              <p>Share your event on top most social networking applications like Facebook, Linkdin,Tweeter, and more ..</p>
              <div className="flex justify-between p-4 gap-4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5" /><stop offset=".328" stop-color="#ff543f" /><stop offset=".348" stop-color="#fc5245" /><stop offset=".504" stop-color="#e64771" /><stop offset=".643" stop-color="#d53e91" /><stop offset=".761" stop-color="#cc39a4" /><stop offset=".841" stop-color="#c837ab" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9" /><stop offset=".999" stop-color="#4168c9" stop-opacity="0" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" /><circle cx="31.5" cy="16.5" r="1.5" fill="#fff" /><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="_osn9zIN2f6RhTsY8WhY4a" x1="10.341" x2="40.798" y1="8.312" y2="38.769" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4" /><stop offset="1" stop-color="#007ad9" /></linearGradient><path fill="url(#_osn9zIN2f6RhTsY8WhY4a)" d="M46.105,11.02c-1.551,0.687-3.219,1.145-4.979,1.362c1.789-1.062,3.166-2.756,3.812-4.758 c-1.674,0.981-3.529,1.702-5.502,2.082C37.86,8.036,35.612,7,33.122,7c-4.783,0-8.661,3.843-8.661,8.582 c0,0.671,0.079,1.324,0.226,1.958c-7.196-0.361-13.579-3.782-17.849-8.974c-0.75,1.269-1.172,2.754-1.172,4.322 c0,2.979,1.525,5.602,3.851,7.147c-1.42-0.043-2.756-0.438-3.926-1.072c0,0.026,0,0.064,0,0.101c0,4.163,2.986,7.63,6.944,8.419 c-0.723,0.198-1.488,0.308-2.276,0.308c-0.559,0-1.104-0.063-1.632-0.158c1.102,3.402,4.299,5.889,8.087,5.963 c-2.964,2.298-6.697,3.674-10.756,3.674c-0.701,0-1.387-0.04-2.065-0.122C7.73,39.577,12.283,41,17.171,41 c15.927,0,24.641-13.079,24.641-24.426c0-0.372-0.012-0.742-0.029-1.108C43.483,14.265,44.948,12.751,46.105,11.02" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#0078d4" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path d="M30,35v-9c0-1.103-0.897-2-2-2s-2,0.897-2,2v9h-6V18h6v1.027C27.04,18.359,28.252,18,29.5,18 c3.584,0,6.5,2.916,6.5,6.5V35H30z M13,35V18h2.966C14.247,18,13,16.738,13,14.999C13,13.261,14.267,12,16.011,12 c1.696,0,2.953,1.252,2.989,2.979C19,16.733,17.733,18,15.988,18H19v17H13z" opacity=".05" /><path d="M30.5,34.5V26c0-1.378-1.121-2.5-2.5-2.5s-2.5,1.122-2.5,2.5v8.5h-5v-16h5v1.534 c1.09-0.977,2.512-1.534,4-1.534c3.309,0,6,2.691,6,6v10H30.5z M13.5,34.5v-16h5v16H13.5z M15.966,17.5 c-1.429,0-2.466-1.052-2.466-2.501c0-1.448,1.056-2.499,2.511-2.499c1.436,0,2.459,1.023,2.489,2.489 c0,1.459-1.057,2.511-2.512,2.511H15.966z" opacity=".07" /><path fill="#fff" d="M14,19h4v15h-4V19z M15.988,17h-0.022C14.772,17,14,16.11,14,14.999C14,13.864,14.796,13,16.011,13 c1.217,0,1.966,0.864,1.989,1.999C18,16.11,17.228,17,15.988,17z M35,24.5c0-3.038-2.462-5.5-5.5-5.5 c-1.862,0-3.505,0.928-4.5,2.344V19h-4v15h4v-8c0-1.657,1.343-3,3-3s3,1.343,3,3v8h4C35,34,35,24.921,35,24.5z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" clip-rule="evenodd"><linearGradient id="k87TA_gnBJ8uBlK4qfs8ia" x1="6.718" x2="35.097" y1="12.801" y2="41.18" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#dfe9f2" /><stop offset=".391" stop-color="#d6e0e9" /><stop offset="1" stop-color="#bfc8d1" /></linearGradient><path fill="url(#k87TA_gnBJ8uBlK4qfs8ia)" d="M37.848,9.86C34.073,6.083,29.052,4.002,23.709,4C12.693,4,3.727,12.962,3.722,23.979 c-0.001,3.367,0.849,6.685,2.461,9.622L3.598,43.04c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297 c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98 C43.698,18.656,41.621,13.636,37.848,9.86z" /><linearGradient id="k87TA_gnBJ8uBlK4qfs8ib" x1="15.389" x2="28.863" y1="10.726" y2="39.265" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2ecc75" /><stop offset="1" stop-color="#0b964a" /></linearGradient><path fill="url(#k87TA_gnBJ8uBlK4qfs8ib)" d="M34.871,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774 c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006 c8.698,0,15.777-7.077,15.78-15.776C39.49,19.778,37.851,15.814,34.871,12.832z" /><path d="M28.893,33.879c-0.995,0-2.354-0.254-5.087-1.331c-3.06-1.208-6.066-3.83-8.464-7.384l-0.077-0.113 c-0.642-0.857-2.132-3.107-2.132-5.5c0-2.58,1.288-3.953,1.838-4.54l0.085-0.091C15.815,14.089,16.709,14,17.058,14 c0.369,0.004,0.682,0,0.953,0.012c0.654,0.026,1.399,0.215,1.936,1.409l0,0c0.25,0.558,0.676,1.605,1.009,2.426 c0.213,0.527,0.386,0.955,0.439,1.069c0.294,0.586,0.308,1.167,0.036,1.714l-0.065,0.133c-0.128,0.262-0.261,0.533-0.544,0.863 l-0.235,0.282c-0.162,0.197-0.325,0.393-0.47,0.545c0.389,0.641,1.206,1.856,2.331,2.86c1.394,1.241,2.588,1.76,3.229,2.039 c0.127,0.055,0.233,0.102,0.317,0.142c0.405-0.47,1.072-1.271,1.302-1.614c0.77-1.156,1.877-0.755,2.24-0.622 c0.569,0.206,3.323,1.576,3.35,1.589l0.255,0.125c0.419,0.203,0.813,0.394,1.062,0.808c0.395,0.661,0.176,2.073-0.193,3.105 c-0.534,1.503-2.828,2.805-4.054,2.915l-0.226,0.024C29.465,33.855,29.196,33.879,28.893,33.879z M17.216,16 c-0.14,0-0.385-0.058-0.686,0.27l-0.101,0.109c-0.453,0.483-1.297,1.383-1.297,3.172c0,1.843,1.326,3.757,1.732,4.3 c0.027,0.036,0.071,0.101,0.135,0.194c2.175,3.223,4.853,5.582,7.541,6.642c3.384,1.335,4.253,1.234,4.956,1.151l0.278-0.03 c0.609-0.055,2.122-0.951,2.351-1.594c0.209-0.585,0.276-1.087,0.287-1.374c-0.044-0.021-0.092-0.043-0.143-0.067l-0.283-0.139 c-0.637-0.32-2.779-1.366-3.131-1.495c-0.442,0.608-1.262,1.565-1.479,1.814c-0.407,0.467-1.127,0.909-2.229,0.354 c-0.066-0.033-0.156-0.071-0.268-0.12c-0.691-0.301-2.13-0.926-3.763-2.38c-1.469-1.311-2.474-2.904-2.838-3.529 c-0.445-0.761-0.322-1.495,0.366-2.18c0.12-0.12,0.257-0.291,0.397-0.46l0.262-0.314c0.118-0.137,0.161-0.226,0.267-0.441 l0.035-0.071c-0.092-0.204-0.278-0.659-0.502-1.213c-0.323-0.797-0.736-1.815-0.979-2.357v0c-0.065-0.144-0.114-0.215-0.138-0.245 c0.005,0.015-0.029,0.016-0.058,0.014C17.706,16,17.463,16,17.216,16z M32.407,28.615L32.407,28.615L32.407,28.615z M19.642,19.736 L19.642,19.736L19.642,19.736z" opacity=".05" /><path d="M28.889,33.384c-0.846,0-2.155-0.22-4.899-1.302c-2.967-1.17-5.891-3.727-8.233-7.198l-0.087-0.128 c-0.616-0.822-2.037-2.962-2.037-5.206c0-2.382,1.193-3.654,1.703-4.198l0.089-0.096c0.625-0.683,1.351-0.756,1.634-0.756 c0.377,0.003,0.667,0,0.931,0.012c0.492,0.02,1.057,0.124,1.502,1.114l0,0c0.249,0.554,0.671,1.594,1.001,2.409 c0.225,0.555,0.405,1.002,0.452,1.097c0.082,0.165,0.338,0.674,0.039,1.275l-0.067,0.136c-0.125,0.255-0.233,0.476-0.475,0.758 L20.2,21.59c-0.173,0.21-0.346,0.419-0.496,0.569c-0.216,0.215-0.216,0.215-0.13,0.362c0.328,0.563,1.232,1.998,2.541,3.165 c1.453,1.295,2.696,1.834,3.363,2.124c0.144,0.062,0.259,0.113,0.344,0.156c0.293,0.146,0.323,0.116,0.427-0.002 c0.288-0.328,1.168-1.364,1.463-1.807c0.554-0.83,1.269-0.57,1.654-0.431c0.506,0.184,3.039,1.437,3.296,1.566l0.262,0.128 c0.38,0.184,0.68,0.329,0.852,0.614c0.254,0.426,0.149,1.603-0.235,2.681c-0.488,1.371-2.646,2.497-3.628,2.585l-0.239,0.026 C29.441,33.354,29.196,33.384,28.889,33.384z M17.201,15.5c-0.026,0-0.052,0-0.078,0c-0.183,0-0.595,0.031-0.962,0.432l-0.097,0.104 c-0.465,0.496-1.432,1.528-1.432,3.514c0,1.943,1.281,3.864,1.832,4.6c0.025,0.033,0.064,0.09,0.121,0.174 c2.231,3.306,4.991,5.73,7.772,6.828c3.505,1.382,4.445,1.271,5.197,1.183l0.267-0.029c0.693-0.062,2.451-1.013,2.776-1.925 c0.333-0.932,0.347-1.71,0.296-1.877c0.007,0.006-0.232-0.098-0.405-0.182l-0.276-0.136c-0.623-0.313-2.806-1.381-3.188-1.52 c-0.36-0.13-0.361-0.133-0.48,0.046c-0.349,0.521-1.32,1.657-1.542,1.91c-0.642,0.735-1.384,0.359-1.629,0.236 c-0.072-0.036-0.171-0.078-0.293-0.131c-0.668-0.291-2.057-0.895-3.63-2.296c-1.416-1.262-2.387-2.803-2.739-3.407 c-0.476-0.814,0.059-1.347,0.287-1.574c0.13-0.13,0.28-0.313,0.431-0.497l0.255-0.306c0.159-0.186,0.226-0.322,0.336-0.547 l0.07-0.143c0.049-0.098,0.058-0.189-0.04-0.383c-0.052-0.104-0.245-0.578-0.483-1.167c-0.326-0.803-0.741-1.829-0.987-2.374l0,0 c-0.229-0.509-0.363-0.515-0.632-0.525C17.717,15.5,17.461,15.5,17.201,15.5z" opacity=".07" /><path fill="#fff" fill-rule="evenodd" d="M19.035,15.831c-0.355-0.79-0.729-0.806-1.068-0.82 C17.69,14.999,17.374,15,17.058,15s-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956s1.7,4.59,1.937,4.906 c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255 c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543 c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119 c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968 c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831 C20.379,19.115,19.457,16.769,19.035,15.831z" clip-rule="evenodd" /></svg> */}
              </div>
            </CardBody>
          </Card>
          <Card className="p-4 items-center"  >
          <Image
        alt="Woman listing to music"
        className="justify-center  m-5 h-32"
        width={300}
        isZoomed
        isBlurred
        height={50}
        src={anaysis_bg.src}
      />
            <CardHeader className="font-semibold">
              <p>Analysis</p>

            </CardHeader>
            <CardBody>
              <p>Find social imapact of your share events to know your place </p>
            </CardBody>
          </Card>
        </div>


        <div className=" w-full xl:pl-80 xl:pr-80 sm:pl-4 sm:pr-4 grid xl:grid-cols-1 sm:grid-cols-1  justify-stretch pt-8 pb-8">
                <Testimonial/>
        </div>

        <div className=" w-full h-80 pl-80 pr-80 gap-4 grid grid-cols-1 sm:grid-cols-1  justify-stretch pt-8 pb-8">
                <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>

                <Pricing/>
        </div>


        <br></br>
      <br></br>
      <br></br>

      <footer className="text-center px-4  py-4 h-12 sm:h-20 w-full  pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center space-y-3 sm:mb-0 mb-3 border-gray-200">
        <div className="text-gray-500">
          </div>
        <div className="flex space-x-4 pb-4 sm:pb-0">
            <a className="group" aria-label="Twitter" target="_blank" href="https://twitter.com/leap_api">
              <svg aria-hidden="true" className="h-6 w-6 fill-gray-500 group-hover:fill-gray-300"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84"></path></svg></a><a className="group" aria-label="GitHub" target="_blank" href="https://github.com/leap-ai/headshots-starter">
                <svg aria-hidden="true" className="h-6 w-6 fill-gray-500 group-hover:fill-gray-300"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"></path>
                </svg>
            </a>
        </div>
        </footer>

      </div>
     

    </main>
  )
}
