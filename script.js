//Work in progress
//Use of web diseign features
//Thanks webdevsimplified
//fix text output
//fix option outputs


const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}
    
const textNodes = [
  {
  id : 1,
  text: "You wake up in a strange place and you see a jar of blue goo near you",
  options:[
  {
    text:"Take goo.",
  setState: {bluegoo: true},
      nextText: 2
},
{
    text: "Leave the goo.",
      nextText: 2
}
  ]
},
  {
    id: 2,
  text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the goo for a sword',
        requiredState: (currentState)=> currentState.blueGoo
        setState: {blueGoo: false, sword: true},
      nextText: 3
      },
        {
        text: 'Trade the goo for a shield',
        requiredState: (currentState)=> currentState.blueGoo
        setState: {blueGoo: false, shield: true},
      nextText: 3
        },
          {
        text: 'Ignore the Merchant.',
      nextText: 3
          }
    ]
  },
    {id 3,
    text: 'After leaving the Merchant you start to feel tired and stumble uopn a small town next to a dangerous looking castle.',
    options:[
      {
        text:'Explore the Castle.',
        nextText: 4
      },
      {
      text:'Find a Room to sleep at the town.',
      nextText: 5
      },
        {
          text: 'Find a wagon to sleep in.',
            nextText: 6
        }
    ]
    
    },
{
  id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
}      
]

startGame()