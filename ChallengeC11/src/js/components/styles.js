export default {
  controlsContainer: {
    background: 'rgba(18, 19, 22, 0.8)',
    position: 'absolute',
    bottom: '5px',
    padding: '0 5px',
    '& > *': {
      margin: '0px 5px 5px',
      color: 'white',
    },
    '& button': {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  w100: {
    width: '100%',
    margin: 'auto 0',
  },
  soundSlider: {
    width: '15%',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  expandButton: {
    float: 'right',
  },
};
