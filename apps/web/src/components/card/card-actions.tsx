import ButtonGroup from '@mui/material/ButtonGroup';
import MuiCardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { DropdownMenu } from '@/components/dropdown-menu/dropdown-menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useReactiveVar } from '@apollo/client';
import { LIKE_COURSE } from 'graphql/mutations/mutations';
import { isAuthenticated } from 'apollo/store';
import { GET_ALL_COURSES, GET_COURSE } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import ShareIcon from '@mui/icons-material/Share';
import { Row } from '@/components/row/row';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Typography from '@mui/material/Typography/Typography';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
type Props = {
  courseId: string;
  isLiked?: boolean;
  likes: number;
};

export function CardActions({ courseId, isLiked, likes }: Props) {
  const courseUrl = `${global.window?.location.host}/courses/#course-${courseId}`;
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const [likeCourse, { error, loading }] = useMutation(LIKE_COURSE, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: courseId },
      },
      {
        query: GET_ALL_COURSES,
      },
    ],
  });
  const [anchorElShareButton, setAnchorElShareButton] =
    useState<null | HTMLElement>(null);

  const handleOpenShareMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElShareButton(event.currentTarget);
  };

  const handleOnLikeClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    await likeCourse({
      variables: {
        courseId,
      },
    });
  };

  const handleCloseShareMenu = () => {
    setAnchorElShareButton(null);
  };

  const shareMenuItems = [
    {
      element: (
        <IconButton component={LinkedinShareButton} url={courseUrl}>
          <LinkedinIcon size={32} round />
        </IconButton>
      ),
    },
    {
      element: (
        <IconButton
          component={FacebookShareButton}
          hashtag="qaexpert.io"
          url={courseUrl}
          style={{ justifyContent: 'center' }}
        >
          <FacebookIcon size={32} round />
        </IconButton>
      ),
    },
    {
      element: (
        <Tooltip title="Copy to clipboard">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(courseUrl);
            }}
          >
            <ContentCopyRoundedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useError([error?.message]);

  return (
    <>
      <MuiCardActions
        sx={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: 'auto',
          alignSelf: 'start',
          width: '100%',
          paddingRight: 0,
        }}
      >
        <ButtonGroup
          aria-label="course card actions button group"
          sx={{
            flex: '1',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Row sx={{ width: 'auto', gap: '0.125rem' }}>
            <IconButton
              disabled={!isUserAuthenticated || loading || isLiked}
              aria-label="like the course"
              onClick={handleOnLikeClick}
            >
              {isLiked ? (
                <FavoriteIcon
                  aria-label="liked icon"
                  sx={{ fontSize: '1.5rem', color: 'success.main' }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  aria-label="not liked yet icon"
                  sx={{ fontSize: '1.5rem' }}
                />
              )}
            </IconButton>

            <Tooltip title="Number of likes">
              <Typography sx={{ color: 'secondary.main' }}>{likes}</Typography>
            </Tooltip>
          </Row>

          <IconButton
            aria-label="share the course"
            onClick={handleOpenShareMenuClick}
          >
            <ShareIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </ButtonGroup>
      </MuiCardActions>

      <DropdownMenu
        onClose={handleCloseShareMenu}
        ancherEl={anchorElShareButton}
        menuItems={shareMenuItems}
      />
    </>
  );
}
