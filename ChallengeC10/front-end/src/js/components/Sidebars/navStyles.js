import shared from '../../sharedStyles/styles';

const { colors, sidebarStyles } = shared;

export default {
  nav: {
    padding: '36px 39px',
  },

  navListHeader: {
    color: `${colors.white}`,
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

  navListItem: {
    marginBottom: '21px',
    fontWeight: 'normal',
    fontStretch: 'condensed',
    flex: 1,
    listStyleType: 'none',

    '& a': {
      color: `${colors.primaryBlue}`,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },

      '&.active': {
        color: `${colors.lightGrey} !important`,
      },

      '& svg': {
        marginRight: '10px',
      },
    },
  },
  sidebar: {
    ...sidebarStyles.sidebar,
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
    ...sidebarStyles.sidebarTablet,
  },
};
