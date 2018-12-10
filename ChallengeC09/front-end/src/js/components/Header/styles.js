import shared from '../../sharedStyles/styles';

const { colors } = shared;

export default {
  header: {
    backgroundColor: colors.lightGrey,
    display: 'flex',
    height: '80px',
    borderBottom: `1px solid ${colors.primaryBlue}`,
  },

  logoHeader: {
    flexBasis: '14.8%',
    background: colors.white,

    '& #logo': {
      width: '100%',
    },
  },

  mainHeader: {
    flexBasis: '70%',
    display: 'flex',
    paddingLeft: '23px',
    paddingRight: '18px',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& h1': {
      fontSize: '24px',
      fontStretch: 'normal',
      lineHeight: '32px',
      fontWeight: 500,
    },
  },

  formSearch: {
    width: '299px',
    height: '36px',
    border: `0.5px solid ${colors.primaryBlue}`,
    background: colors.formSearchBackground,
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '24px',

    '& svg': {
      margin: '10px 5px 0 10px',
      fontSize: '18px',
    },

    '& input[type="search"]': {
      border: '0px',
      backgroundColor: 'transparent',
      width: '85%',
      height: '80%',

      '&::placeholder': {
        opacity: 1,
        color: colors.black,
        fontWeight: 'normal',
        lineHeight: '24px',
        letterSpacing: '0.1px',
      },

      '&:focus': {
        outline: 'none',
      },
    },
  },
  // Tablet
  '@media screen and (max-width: 900px)': {
    logoHeader: {
      flexBasis: 'unset',
      '& #logo': {
        flex: 1,
      },
    },
    mainHeader: {
      flexBasis: '50%',
    },
    smallDevicesNavbar: {
      display: 'flex',
      flex: 1,
      backgroundColor: colors.lightGrey,
      justifyContent: 'space-between',

      '& h1': {
        flex: 2,
      },

      '& .button-container': {
        flex: 1,
        margin: 'auto',
        textAlign: 'center',
      },

      '& .navbar-toggler': {
        padding: '10px',
        color: colors.primaryBlue,
        backgroundColor: colors.primaryBlack,
        fontSize: '20px',
        border: `1px solid ${colors.primaryBlue}`,
        borderRadius: '2px',
        width: '50px',
        height: '50px',
      },

      '& .navbar-collapse': {
        visibility: 'hidden',
        position: 'absolute',
        backgroundColor: colors.primaryBlack,
        color: colors.white,
        right: 0,
        top: '81px',
        padding: '10px',
        zIndex: 5,
        borderRadius: '0px 10px',
        boxShadow: `2px -3px 9px ${colors.black}`,

        '& ul': {
          padding: 0,
        },

        '& .form-search': {
          borderRadius: 0,
        },

        '& .collapse-button': {
          background: 'none',
          color: colors.white,
          width: '100%',
          border: '0px',
          padding: '5px',
          marginBottom: '1px',

          '& img': {
            width: '36px',
            height: '36px',
            border: `2px solid ${colors.primaryBlue}`,
            borderRadius: '20px',
            margin: '10px 16px 10px 10px',
            verticalAlign: 'middle',
          },
        },

        '& li': {
          textAlign: 'center',
          padding: '10px',

          '& a': {
            color: colors.white,
            textDecoration: 'none',

            '&:visited': {
              color: colors.white,
              textDecoration: 'none',
            },
          },
        },

        '& .dropdown-collapse-list': {
          display: 'none',
          backgroundColor: colors.dropdownCollapseBackground,
          paddingLeft: '8px',
        },
      },
    },
  },
  // Phone
  '@media screen and (max-width: 480px)': {
    mainHeader: {
      flexBasis: 0,
      '& h1': {
        fontSize: '18px',
        textAlign: 'center',
      },
    },
  },
  profileHeader: {
    flexBasis: '15%',
  },
  dropdownMenu: {
    width: '100%',
    margin: '10px 5px',
    display: 'flex',
    borderLeft: `1px solid ${colors.darkGrey}`,
  },
  jakob: {
    width: '36px',
    height: '36px',
    border: `2px solid ${colors.primaryBlue}`,
    borderRadius: '20px',
    margin: '10px 16px 10px 10px',
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    border: 0,
    fontStretch: 'condensed',
    fontSize: '14px',
    marginLeft: 'auto',
    fontWeight: 'normal',
    display: 'inline-block',
    lineHeight: '19px',

    '& svg': {
      marginLeft: '10px',
    },
  },

  dropdownList: {
    visibility: 'hidden',
    position: 'absolute',
    backgroundColor: colors.lightGrey,
    minWidth: '160px',
    boxShadow: `0px 8px 16px 0px ${colors.lowOpacityBlack}`,
    padding: '12px 16px',
    zIndex: 1,

    '& ul': {
      margin: 0,
      padding: 0,

      '& a': {
        color: colors.black,
        textDecoration: 'none',
      },
    },
  },
  smallDevicesNavbar: {
    display: 'none',
  },

  onlyOnSmall: {
    display: 'none',
  },

  'ul': {
    '& li': {
      listStyle: 'none',
    },
  },
  'ol': {
    '& li': {
      '& a': {
        textDecoration: 'none',
        
        '&:hover': {
          textDecoration: 'underline',
        },
        
        '&:visited': {
          textDecoration: 'none',
        },
      },
    },
  },
};
