// import CSS into JS
import './style.css'
import { dom } from './modules'

//-----------------------------------------------------------------------------

function loadDropdown() {
  dom.addElement(
    'body',
    'div',
    'dropdown',
    { class: 'dropdown button' },
    { click: (e) => dom.toggleVisibility(e.target.querySelectorAll('*')) },
  )

  dom.addElement('.dropdown', 'div', '', { class: 'menu' })
  dom.addElement('.menu', 'div', 'selection1', { class: 'menuElement' })
  dom.addElement('.menu', 'div', 'selection2', { class: 'menuElement' })
  dom.addElement('.menu', 'div', 'selection3', { class: 'menuElement' })
}

loadDropdown()

//-----------------------------------------------------------------------------

function loadCarousel() {
  // create the carousel container
  dom.addElement('body', 'div', '', { class: 'carousel' })
  // create the slides
  const slides = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
  ]
  slides.forEach((slide, index) => {
    const id = Date.now() + index
    const count = index + 1

    dom.addElement('.carousel', 'div', '', {
      'data-id': id,
      'data-position': count,
      class: 'slide',
      // style: 'display: none',
    })
    dom.addElement(`[data-id = '${id}']`, 'img', '', { src: slide })
    dom.addElement(`[data-id = '${id}']`, 'div', `${count}/${slides.length}`, {
      class: 'counter',
    })
  })
  // create the buttons
  dom.addElement(
    '.carousel',
    'div',
    'chevron_left',
    {
      class: 'material-symbols-outlined prev',
    },
    {
      click: () => {
        const oldSlide = [...document.querySelectorAll('.slide')].find(
          (slide) => slide.style.display === 'block',
        )
        let position = parseInt(oldSlide.dataset.position) - 1
        if (position < 1) position = slides.length

        goToPosition(position)
      },
    },
  )
  dom.addElement(
    '.carousel',
    'div',
    'chevron_right',
    {
      class: 'material-symbols-outlined next',
    },
    {
      click: () => {
        const oldSlide = [...document.querySelectorAll('.slide')].find(
          (slide) => slide.style.display === 'block',
        )
        let position = parseInt(oldSlide.dataset.position) + 1
        if (position > slides.length) position = 1

        goToPosition(position)
      },
    },
  )

  // create the dots
  dom.addElement('.carousel', 'div', '', { class: 'dots' })
  document.querySelectorAll('.slide').forEach((slide, index) => {
    dom.addElement(
      '.dots',
      'div',
      '',
      { class: 'dot' },
      {
        click: () => goToPosition(index + 1),
      },
    )
  })

  // global function
  let timeout
  function goToPosition(position) {
    document.querySelectorAll('.slide').forEach((slide) => {
      slide.style.display = 'none'
    })
    document.querySelector(`[data-position = '${position}']`).style.display =
      'block'
    const dots = document.querySelectorAll('.dot')
    dots.forEach((dot) => dot.classList.remove('active'))
    dots[position - 1].classList.add('active')

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      const oldSlide = [...document.querySelectorAll('.slide')].find(
        (slide) => slide.style.display === 'block',
      )
      let position = parseInt(oldSlide.dataset.position) + 1
      if (position > slides.length) position = 1

      goToPosition(position)
    }, 5000)
  }

  goToPosition(1)
}

loadCarousel()

//-----------------------------------------------------------------------------
