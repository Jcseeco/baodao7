module.exports = {
  theme: {
    extend: {
      fontSize: {
        '6.5xl': '4.5rem',
        '7xl': '5rem',
        '8xl': '6rem',
      },
      borderRadius: {
        '1rem': '1rem',
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
        '5rem': '5rem',
        '6rem': '6rem',
        '7rem': '7rem',
      },
      borderColor: {
        'main-blue': '#2943df',
        'text-blue': '#192045',
        'main-orange': '#ff9d33',
        'main-white': '#E9E9ED',
      },
      backgroundColor: {
        'main-blue': '#2943df',
        'main-blue-2': '#2943df33',
        'main-blue-4': '#2943df66',
        'main-blue-6': '#2943df99',
        'main-blue-8': '#2943dfcc',
        'main-blue-9': '#2943dfe6',
        'text-blue': '#192045',
        'text-blue-2': '#19204533',
        'text-blue-4': '#19204566',
        'text-blue-6': '#19204599',
        'text-blue-8': '#192045cc',
        'text-blue-9': '#192045e6',
        'main-orange': '#ff9d33',
        'main-orange-2': '#ff9d3333',
        'main-orange-4': '#ff9d3366',
        'main-orange-6': '#ff9d3399',
        'main-orange-8': '#ff9d33cc',
        'main-orange-9': '#ff9d33e6',
        'main-white': '#E9E9ED',
        'main-white-2': '#E9E9ED33',
        'main-white-4': '#E9E9ED66',
        'main-white-6': '#E9E9ED99',
        'main-white-8': '#E9E9EDcc',
        'main-white-9': '#E9E9EDe6',
      },
      textColor: {
        'main-blue': '#2943df',
        'text-blue': '#192045',
        'main-orange': '#ff9d33',
        'main-white': '#E9E9ED',
      },
      spacing: {
        'full': '100%',
        '3/4': '75%',
        '1/4': '25%',
        '1/8': '12.5%',
        'half': '50%',
        'vh-3/4': '75vh',
        'vh-1/4': '25vh',
        'vh-half': '50vh',
        'vw-3/4': '75vw',
        'vw-1/4': '25vw',
        'vw-half': '50vw',
        '16:9': '56.25%',
      },
      width: {
        'fit': 'fit-content',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      }
    },
  },

  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },

  plugins: [],

}