import shared from '../../sharedStyles/styles';

const { colors } = shared;

export default {
  formContainer: {
    backgroundColor: colors.tooltipBackground,
    display: 'flex',
    flexFlow: 'column wrap',
    margin: 'auto',
    position: 'absolute',
    left: 'calc(50vw - 150px)',
    top: '20%',
    minHeight: '350px',
    width: '300px',
    color: colors.white,
    padding: '10px',
    borderRadius: '20px',
  },
  loginLogo: {
    width: '240px',
    margin: '5px auto',
    display: 'block',
  },
  loginTitle: {
    textAlign: 'center',
  },
  alert: {
    borderRadius: '30px',
    background: colors.alert,
    width: '90%',
    display: 'block',
    margin: '5px auto',

    '& p': {
      textAlign: 'center',
      margin: '5px',
    },
  },

  loginForm: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'middle',
    width: '100%',

    '& input': {
      background: 'none',
      border: 'none',
      borderBottom: `1px solid ${colors.white}`,
      color: colors.white,
      height: '30px',
      width: '80%',
      fontSize: '18px',
      marginLeft: '5px',
      marginBottom: '10px',
      '&::placeholder': {
        color: colors.white,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    '& button': {
      border: `2px solid ${colors.primaryBlue}`,
      borderRadius: '5px',
      background: 'none',
      fontSize: '18px',
      width: '100px',
      margin: 'auto',
      height: '30px',
      transitionDuration: '0.3s',
      color: colors.primaryBlue,
      '&:hover': {
        background: colors.white,
        color: colors.black,
      },
    },
  },
  // Tablet
  '@media screen and (max-width: 900px)': {
    formContainer: {
      width: '80vw',
      left: 'calc(50vw - 40vw)',
    },
  },
  // Phone
  '@media screen and (max-width: 480px)': {
    formContainer: {
      width: '100%',
      left: 'unset',
    },
  },
};
