import shared from '../../sharedStyles/styles';

const { colors } = shared;

export default {
  bookSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paginationContainer: {
    display: 'flex',
    width: '100%',
    margin: 'auto',
    justifyContent: 'center',

    '& a': {
      textDecoration: 'none',
      width: '30px',
      height: '30px',
      border: `1px solid ${colors.primaryBlue}`,
      background: colors.primaryBlack,
      color: colors.primaryBlue,
      textAlign: 'center',
      padding: '5px',

      '&.active': {
        color: colors.white,
      },
    },
  },
  book: {
    flexBasis: '18%',
    width: '176px',
    height: '366px',
    position: 'relative',
  },

  bookMainImage: {
    width: '176px',
    height: '250px',
  },
  inUse: {
    position: 'absolute',
    top: '9%',
    right: '-7px',
    display: 'none',

    '& img': {
      position: 'relative',
    },

    '& svg': {
      position: 'absolute',
      top: '5px',
      left: '40%',
      color: colors.white,
    },
  },
  bookDescription: {
    width: '176px',
    whiteSpace: 'nowrap',

    '& svg': {
      color: colors.primaryBlue,
      fontSize: '12.5px',
    },
  },
  bookTitle: {
    color: colors.bookTitle,
    fontStretch: 'condensed',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '20px',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    overflow: 'hidden',
    margin: 0,
  },
  bookAuthor: {
    color: colors.secondaryGrey,
    fontStretch: 'condensed',
    fontWeight: 300,
    display: 'block',
    overflow: 'hidden',
  },
  bookLocation: {
    color: colors.black,
    fontStretch: 'condensed',
    fontWeight: 500,
    fontSize: '14px',
    display: 'block',
  },
  popupContainer: {
    position: 'absolute',
    top: '0%',
  },
  bookHover: {
    width: '176px',
    height: '250px',
    background: colors.tooltipBackground,
    position: 'relative',
    margin: 0,
    padding: '15px',
  },
  mainIconContainer: {
    color: colors.primaryBlue,
    background: colors.white,
    width: '48px',
    height: '48px',
    zIndex: 1,
    position: 'relative',
    borderRadius: '25px',
    padding: '15px',
    clear: 'both',
    margin: 'auto',
    marginTop: '85px',
  },
  bookRate: {
    textTransform: 'uppercase',
    color: colors.lightGrey,
    fontStretch: 'condensed',
    fontWeight: 500,
    fontSize: '11px',
    marginTop: '57px',
    textAlign: 'center',
  },
  hoverRate: {
    color: colors.yellowStar,
    fontSize: '12.5px',
    textAlign: 'center',
  },
  popupBook: {
    width: '382px',
    height: '358px',
    background: colors.tooltipBackground,
    color: colors.primaryGrey,
    fontWeight: 'bold',
    fontStretch: 'condensed',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '30px',
    position: 'fixed',
    zIndex: 5,
    left: 'calc(50% - 382px/2)',
    top: 'calc(50% - 358px/2)',
    borderRadius: '5px',

    '&::before': {
      content: '',
      borderStyle: 'solid',
      borderWidth: '15px 15px 15px 0px',
      borderColor: `transparent
              ${colors.tooltipBackground}
              transparent
              transparent`,
      position: 'absolute',
      left: '-13px',
      top: '31%',
    },
  },

  pupupSectionContainer: {
    marginBottom: '20px',

    '& p': {
      color: colors.white,
      fontStretch: 'condensed',
      fontWeight: 'normal',
      fontSize: '13px',
      lineHeight: '17px',
      margin: '1px',
    },

    '& svg': {
      color: colors.secondaryBlue,
    },
  },
  popupAuthor: {
    color: colors.primaryGrey,
  },
  popupTitle: {
    color: colors.secondaryBlue,
    fontSize: '13px',
    margin: 0,
    lineHeight: '17px',
    textAlign: 'left',
    textTransform: 'uppercase',
    display: 'inline block !important',
  },
  popupBookYear: {
    color: colors.primaryGrey,
    fontStretch: 'condensed',
    fontWeight: 'normal',
    fontSize: '13px',
    float: 'right',
  },
  popupSectionTitle: {
    textTransform: 'uppercase',
    margin: '0px',
  },
  pupupSummaryText: {
    width: '98%',
    height: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  borrowBook: {
    border: `1px solid ${colors.secondaryBlue}`,
    borderRadius: '15px',
    padding: '10px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: colors.white,
    transitionDuration: '0.3s',

    '&:hover': {
      background: colors.primaryBlack,
      color: colors.secondaryBlue,
    },
  },
  // Phone
  '@media screen and (max-width: 480px)': {
    popupBook: {
      width: '80%',
      left: '10%',

      '&::before': {
        left: '40%',
        top: '-6%',
        transform: 'rotate(90deg)',
      },
    },
  },
};
