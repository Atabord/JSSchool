export default {
  notFoundContainer: {
    display: 'flex',
    margin: 'auto',
    textAlign: 'center',
    height: '90vh',
    flexFlow: 'column',
    justifyContent: 'center',

    '& h1': {
      fontSize: '10em',
      margin: '10px',
    }
  },
  // Phone
  '@media screen and (max-width: 480px)': {
    notFoundContainer: {
      '& h1': {
        fontSize: '5em',
      },
    },
  },
};
