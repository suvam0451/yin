const slashCommands = [{
  name: "help",
  description: "About me and my capabilities."
}, {
  name: "ask",
  description: "Ask me any question."
}, {
  name: "image",
  description: "Generate an image.",
  options: [{
    name: "prompt",
    description: "prompt to use for image generation.",
    type: 3,
    required: true
  }, {
    name: "model",
    description: "model to use",
    type: 3,
    choices: [{
      name: "dall-e-2 (use this)",
      value: "dall-e-2",
    }, {
      name: "dall-e-3",
      value: "dall-e-3"
    }]
  }, {
    name: "size",
    description: "size of image to generate",
    type: 3,
    choices: [{
      name: "256x256",
      value: "256x256"
    }, {
      name:
          "512x512", value: "512x512"
    }, {
      name: "1024x1024 (can't use with dall-e-2)", value: "1024x1024"
    }]
  }]
}]

export default slashCommands;