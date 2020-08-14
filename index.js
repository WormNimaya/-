let content = document.getElementsByClassName('content')[0]
let list = document.getElementsByClassName('list')[0]
let items = document.getElementsByClassName('list-item')

let points = document.getElementsByClassName('point-item')

let pointWrap = document.getElementsByClassName('point')[0]


const ponitMove = () => {
  let index = state.index
  for (let i = 0; i < points.length; i++) {
    points[i].classList.remove('active')
  }
  points[index].classList.add('active')
}

const createPoint = (i) => {
  let point = document.createElement('li')
  if (i === 0) {
    point.classList.add('active')
  }
  point.classList.add('point-item')
  pointWrap.appendChild(point)
}

for (let i = 0; i < items.length; i++) {
  items[i].style.width = window.innerWidth + 'px'
  createPoint(i)
}
list.style.width = items.length * window.innerWidth + 'px'
const state = {
  beginX: 0,
  moveX: 0,
  endX: 0,
  index: 0
}

const follow = () => {
  let offsetX = state.moveX - state.beginX
  list.style.transition = 'all 0.3s'
  list.style.transform = `translate3d(${-state.index * window.innerWidth + offsetX}px, 0px, 0px)`
}

const _rest = () => {
  list.style.transition = 'all 0.3s'
  list.style.transform = `translate3d(${-state.index * window.innerWidth}px, 0px, 0px)`
}

const _goPrev = () => {
  if (state.index > 0) {
    state.index--
    list.style.transition = 'all 0.3s'
    list.style.transform = `translate3d(${-state.index * window.innerWidth}px, 0px, 0px)`
    ponitMove()
  } else {
    _rest()
  }
}

const _goNext = () => {
  if (state.index < items.length - 1) {
    state.index++
    list.style.transition = 'all 0.3s'
    list.style.transform = `translate3d(${-state.index * window.innerWidth}px, 0px, 0px)`
    ponitMove()
  } else {
    _rest()
  }

}
const _judgeMove = () => {
  let distance = state.endX - state.beginX
  if (distance > window.innerWidth * 2 / 5) {
    _goPrev()

  } else if (distance < -window.innerWidth * 2 / 5) {
    _goNext()
  } else {
    _rest()
  }

}





document.addEventListener('touchstart', function (e) {
  list.style.transition = 'none'
  state.beginX = e.targetTouches[0].clientX

})

document.addEventListener('touchmove', function (e) {
  state.moveX = e.targetTouches[0].clientX
  follow()
})

document.addEventListener('touchend', function (e) {
  state.endX = e.changedTouches[0].clientX
  _judgeMove()
})