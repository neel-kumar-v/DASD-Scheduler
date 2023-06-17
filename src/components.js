class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = 
    `
    <style>
    .retract {
      transform: translateY(-100%);
    }
    </style>
    <nav class="relative px-4 py-4 flex justify-between items-center transition-all bg-white">
      <a class="text-3xl font-bold leading-none" href="#">
        DASD
      </a>
      <ul class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  mx-auto flex items-center w-auto space-x-6">
        <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Home</a></li>
        <li class="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><a class="text-sm text-blue-600 font-bold" href="#">Reports</a></li>

      </ul>
      <a class="inline-block ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">Log Out</a>
      <button class="inline-block  aspect-square w-6 bg-gray-50 hover:bg-gray-100 text-xl text-black font-bold rounded-full outline outline-offset-1 outline-1 outline-black transition duration-200" id="retract" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </nav>


    
    `
    const retractButton = this.querySelector("#retract");
    const navbar = this.querySelector("nav");

    retractButton.addEventListener("click", () => {
      navbar.classList.toggle("retract");
    });
  }
}

customElements.define('navbar-component', Navbar);