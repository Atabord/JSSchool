import shared from '../../sharedStyles/styles';

export default {
  navListHeader: {
    color: `${shared.colors.white}`,
    fontWeight: 'bold',
    fontStretch: 'condensed',
    fontSize: '13px',
    textTransform: 'uppercase',
    marginTop: '0px',
  },

  menuSection: {
    '& ul': {
      padding: 0,
    },
  },

  '@media screen and (max-width: 900px)': {
    menuSection: {
      flex: 1,

      '&:last-of-type': {
        marginTop: 0,
      },

      '& ul': {
        display: 'flex',
      },
    },
  },
};
