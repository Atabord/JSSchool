import shared from '../../sharedStyles/styles';

const { colors } = shared;

export default {
  sectionHeader: {
    display: 'flex',
    marginBottom: '27px',
    justifyContent: 'space-between',

    '& h2': {
      color: colors.primaryBlack,
      fontWeight: 300,
      fontStretch: 'condensed',
      fontSize: '20px',
      margin: 0,
      flexBasis: '50%',
    },
  },
  listIcons: {
    flexBasis: '50%',

    '& a': {
      color: colors.primaryBlue,
      fontSize: '18.5px',
      marginLeft: '10px',
      float: 'right',
      clear: 'left',
    },
  },
  // Phone
  '@media screen and (max-width: 480px)': {
    sectionHeader: {
      flexFlow: 'column',
      '& h2': {
        textAlign: 'center',
        flexBasis: 'unset',
      },
    },
    listIcons: {
      flexBasis: 'unset',
      textAlign: 'center',

      '& a': {
        float: 'none',
      },
    },
  },
};
