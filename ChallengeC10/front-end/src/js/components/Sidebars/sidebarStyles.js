import shared from '../../sharedStyles/styles';

const { colors, sidebarStyles } = shared;

export default {

  sidebar: {
    ...sidebarStyles.sidebar,
  },
  sidebarAside: {
    padding: '38px 31px 38px 34px',
    fontStretch: 'condensed',
    color: `${colors.lightGrey}`,

    '& h2': {
      fontWeight: 'bold',
      fontSize: '13px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      marginBottom: '26px',
      marginTop: 0,
    },
    '& ol': {
      padding: 0,
      fontSize: '12px',
      fontWeight: '300',

      '& li': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        listStylePosition: 'inside',
        marginBottom: '26px',

        '& a': {
          color: `${colors.lightGrey}`,
          textOverflow: 'ellipsis',
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
  '@media screen and (max-width: 900px)': {
    ...sidebarStyles.sidebarTablet,
  },
};
